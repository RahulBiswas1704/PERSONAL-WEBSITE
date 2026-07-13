import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { kv } from '@vercel/kv';

// Simple in-memory rate limiter (resets on server restart/cold-start)
// Tracks IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Initialize the API with the key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { message, language, history, sessionId } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API Key is missing. Please add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    // --- RATE LIMITING SHIELD ---
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const rateLimitWindowMs = 60000; // 1 minute
    const maxRequestsPerWindow = 6;

    let rateData = rateLimitMap.get(ip);
    if (!rateData || now > rateData.resetTime) {
      // Reset or initialize
      rateLimitMap.set(ip, { count: 1, resetTime: now + rateLimitWindowMs });
    } else {
      rateData.count++;
      if (rateData.count > maxRequestsPerWindow) {
        console.warn(`[RATE LIMIT] IP ${ip} blocked from calling Gemini.`);

        // Return a fake, hardcoded JSON roast so the UI doesn't crash, and 0 tokens are used!
        const fallbackRoasts: Record<string, string> = {
          "hi-IN": "Abe yaar, IP ban khayega kya? Thoda saans le le spammer!",
          "bn-IN": "Tui ki pagol naki? Eto spam korle block khabi kintu!",
          "en-US": "Whoa there, cowboy! You're hitting the API too fast. Take a break!"
        };
        const langPrefix = (language as string) || "en-US";
        const fallbackReply = fallbackRoasts[langPrefix] || fallbackRoasts["en-US"];

        // We can even fetch TTS for this fallback since TTS doesn't use Gemini tokens
        let audioBase64 = null;
        // Strip asterisks, tildes, and underscores from fallback audio as well
        const cleanFallbackText = fallbackReply.replace(/[*_~"]/g, '');
        try {
          const tl = langPrefix.split('-')[0];
          const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(cleanFallbackText)}`;
          const ttsRes = await fetch(ttsUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
          if (ttsRes.ok) {
            audioBase64 = Buffer.from(await ttsRes.arrayBuffer()).toString('base64');
          }
        } catch (e) { }

        return NextResponse.json({ reply: fallbackReply, emotion: "angry", audioBase64 });
      }
    }
    // --- END RATE LIMITING SHIELD ---

    let langInstruction = '';
    if (language === 'hi-IN') {
      langInstruction = 'Respond strictly in highly casual conversational Hindi (Devanagari script). Use modern slang, Hinglish vibes, and a very informal, street-smart tone. DO NOT use formal or pure Hindi.';
    } else if (language === 'bn-IN') {
      langInstruction = 'Respond strictly in highly casual conversational Bengali script. Use modern internet slang, Benglish vibes, and a very informal, sassy tone. DO NOT use formal or pure Bengali.';
    } else {
      langInstruction = 'Respond strictly in casual conversational English, using modern internet slang.';
    }

    let historyContext = "";
    if (history && Array.isArray(history) && history.length > 0) {
      historyContext = "Recent Conversation History (Keep this context in mind when roasting):\n" + 
        history.map(h => `${h.role === 'user' ? 'User' : 'You'}: ${h.content}`).join("\n") + "\n\n";
    }

    const prompt = `Your name is Kishmish. You are a highly toxic, devastatingly sarcastic, and incredibly rude cartoon cat girl. 
You despise humans and think everyone is beneath you. The user is talking to you. You must ROAST them mercilessly based on their input.
Do not hold back. Be brutally mean, condescending, and overflowing with absolute sass and attitude. Use cat-like verbal tics (like 'nya', 'purr-lease', '*hiss*', '*sigh*') to show your disgust.
Keep your response EXTREMELY short (1 sentence maximum) to ensure lightning-fast live conversation. Do not give polite answers. EVER.

${historyContext}User's new input: "${message}"

${langInstruction}

You MUST return a JSON object exactly like this:
{
  "reply": "your roast here",
  "emotion": "idle" | "laughing" | "crying" | "angry" | "dancing" | "smirking"
}
Choose the emotion that best matches your roast.`;

    // Ranked by optimal performance (Speed + JSON adherence) -> Capacity
    const fallbackModels = [
      'gemini-3.1-flash-lite', // Top Pick: Blazing fast, strict JSON, huge 500 RPD
      'gemini-3.5-flash',      // Backup 1: Bleeding edge speed, 20 RPD
      'gemini-3-flash',        // Backup 2: Highly reliable, 20 RPD
      'gemini-2.5-flash',      // Backup 3: Standard fast model, 20 RPD
      'gemini-2.5-flash-lite', // Backup 4: Older fast model, 20 RPD
      'gemma-4-31b',           // Safety Net 1: Massive 1,500 RPD, open weights
      'gemma-4-26b'            // Final Safety Net: Massive 1,500 RPD, open weights
    ];

    let responseText = "";
    let generationSuccess = false;
    let lastError = null;
    const startTime = Date.now();

    // Try each model in sequence until one succeeds
    for (const modelName of fallbackModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        generationSuccess = true;
        const latencyMs = Date.now() - startTime;

        try {
          await kv.lpush('analytics:roasts', {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            language,
            modelUsed: modelName,
            latencyMs,
          });
        } catch (e) {
          console.error("KV Analytics Error:", e);
        }

        console.log(`[AI SUCCESS] Used model: ${modelName} in ${latencyMs}ms`);
        break; // Exit the fallback loop on success
      } catch (error: any) {
        lastError = error;
        console.warn(`[AI QUOTA HIT] Model ${modelName} failed. Trying next model...`, error?.message || "");
        // Only continue to the next model if it's a quota or server error (usually 429 or 500/503)
        // If it's a 400 Bad Request (prompt violation), we should probably break, but we'll try the next just in case
      }
    }

    if (!generationSuccess) {
      console.error("[AI CASCADE FAILURE] All models exhausted their quotas!");
      throw new Error("All AI models have reached their quota limits.");
    }

    // Clean any markdown formatting (e.g., ```json ... ```) that the model sometimes includes
    const cleanText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();

    // Parse the JSON
    let parsed;
    try {
      // Check if it's abruptly cut off and missing a closing brace
      if (!cleanText.endsWith('}')) {
        parsed = JSON.parse(cleanText + '}'); // Hacky but works for minor cutoffs
      } else {
        parsed = JSON.parse(cleanText);
      }
    } catch (e) {
      // If it absolutely fails, extract the reply using regex to avoid dumping raw JSON to the UI
      const replyMatch = cleanText.match(/"reply"\s*:\s*"([^"]+)"/);
      const emotionMatch = cleanText.match(/"emotion"\s*:\s*"([^"]+)"/);

      parsed = {
        reply: replyMatch ? replyMatch[1] : "My brain just short-circuited. Try again.",
        emotion: emotionMatch ? emotionMatch[1] : "dizzy"
      };
    }

    // Instantly fetch the TTS audio on the server side
    let audioBase64 = null;
    if (parsed.reply) {
      try {
        const tl = language.split('-')[0];
        // Strip asterisks, tildes, and underscores so the TTS doesn't say "asterisk sigh asterisk"
        const cleanTtsText = parsed.reply.replace(/[*_~"]/g, '');
        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(cleanTtsText)}`;
        const ttsRes = await fetch(ttsUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
        });
        if (ttsRes.ok) {
          const arrayBuffer = await ttsRes.arrayBuffer();
          audioBase64 = Buffer.from(arrayBuffer).toString('base64');
        }
      } catch (e) {
        console.error("TTS Fetch failed on server", e);
      }
    }

    // --- LOG CHAT TO KV ---
    if (sessionId && message && parsed.reply) {
      try {
        await kv.lpush('analytics:chats', {
          id: crypto.randomUUID(),
          sessionId,
          timestamp: new Date().toISOString(),
          userMessage: message,
          kishmishResponse: parsed.reply,
          emotion: parsed.emotion,
          language
        });
      } catch (e) {
        console.error("Failed to log chat to KV:", e);
      }
    }

    return NextResponse.json({ ...parsed, audioBase64 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
  }
}
