"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import { hapticTick, hapticPop, hapticHeavy } from "@/lib/haptics";

type Language = "en-US" | "hi-IN" | "bn-IN";
type Emotion = "idle" | "laughing" | "crying" | "angry" | "dancing" | "smirking" | "surprised" | "dizzy" | "bored";

export default function LiveRoaster() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [emotion, setEmotion] = useState<Emotion>("idle");
  const [language, setLanguage] = useState<Language>("en-US");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [pokeCount, setPokeCount] = useState(0);
  const [isTailFlicking, setIsTailFlicking] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthHeight, setMouthHeight] = useState(4);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);
  const lastMessageTimeRef = useRef<number>(0);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            currentTranscript += event.results[i][0].transcript;
          }
          setMessage(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          // Auto-submit almost instantly after speaking ends for snappy conversation
          setTimeout(() => {
            if (formRef.current) {
               formRef.current.requestSubmit();
            }
          }, 10);
        };
      }
    }
  }, []);

  // Sync recognition language with selected character language
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // Clear previous message
      setMessage("");
      
      // If she's speaking, stop her so she doesn't interrupt you
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
      setIsSpeaking(false);
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
        hapticPop();
      } catch (e) {
        console.error("Recognition already started", e);
      }
    }
  };

  // Fix stale closures for soundEnabled
  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Mouse tracking for eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Small hardware-accelerated translation
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking logic
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      setTimeout(blink, Math.random() * 4000 + 1000);
    };
    const initial = setTimeout(blink, 2000);
    return () => clearTimeout(initial);
  }, []);

  // Natural Tail Flicking
  useEffect(() => {
    const flick = () => {
      setIsTailFlicking(true);
      setTimeout(() => setIsTailFlicking(false), 800);
      setTimeout(flick, Math.random() * 6000 + 2000);
    };
    const initial = setTimeout(flick, 3000);
    return () => clearTimeout(initial);
  }, []);

  // Auto-scroll chat log to bottom
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Idle Roasting Timer
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(timeout);
      if (!isSpeaking && !isLoading) {
        timeout = setTimeout(() => {
          const idleRoasts: Record<Language, { text: string, emotion: Emotion }[]> = {
            "en-US": [
              { text: "Are you going to type something or just stare at me?", emotion: "angry" },
              { text: "Hello? Earth to meatbag. Did your brain freeze?", emotion: "smirking" },
              { text: "I'm literally falling asleep here. Wake me when you're interesting.", emotion: "bored" },
              { text: "Type something! I don't have all day, nya~", emotion: "angry" },
              { text: "*Yawn*... Wake me up when you figure out what to say.", emotion: "bored" }
            ],
            "hi-IN": [
              { text: "कुछ टाइप-वाइप करोगे या बस घूरते ही रहोगे?", emotion: "angry" },
              { text: "हेलो? दिमाग फ्रीज़ हो गया क्या?", emotion: "smirking" },
              { text: "यार मुझे लिटरली नींद आ रही है। कुछ ढंग का हो तो उठाना।", emotion: "bored" },
              { text: "कुछ लिख भी दो यार! मेरे पास पूरा दिन नहीं है, nya~", emotion: "angry" },
              { text: "*Yawn*... जब समझ आये क्या बोलना है, तब उठाना।", emotion: "bored" }
            ],
            "bn-IN": [
              { text: "কিছু টাইপ করবে নাকি শুধু ড্যাবড্যাব করে তাকিয়েই থাকবে?", emotion: "angry" },
              { text: "হ্যালো? মাথায় কি জং ধরেছে নাকি?", emotion: "smirking" },
              { text: "আমার আক্ষরিক অর্থেই ঘুম পেয়ে যাচ্ছে। কিছু ইন্টারেস্টিং হলে ডেকো।", emotion: "bored" },
              { text: "কিছু একটা তো লেখো! আমার সারাদিন পড়ে নেই, nya~", emotion: "angry" },
              { text: "*Yawn*... কী বলবে ভেবে পেলে তবেই ডেকো।", emotion: "bored" }
            ]
          };
          const currentRoasts = idleRoasts[language] || idleRoasts["en-US"];
          const roast = currentRoasts[Math.floor(Math.random() * currentRoasts.length)];
          setEmotion(roast.emotion);
          setChatHistory(prev => [...prev, { role: 'model', content: roast.text }]);
          speak(roast.text, language);
          
          // Background tracking
          fetch('/api/track', {
            method: 'POST',
            body: JSON.stringify({ eventType: 'idle_roast' }),
          }).catch(() => {});
        }, 8000); // Roast after 8 seconds of doing nothing
      }
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);
    resetIdleTimer();

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      clearTimeout(timeout);
    };
  }, [isSpeaking, isLoading, language]);

  const playSoundEffect = (actionName: string) => {
    if (!soundEnabledRef.current) return;
    try {
      // @ts-ignore
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (actionName === 'hiss') {
        // Synthesize a cat hiss (White noise + Highpass filter + sharp envelope)
        const bufferSize = ctx.sampleRate * 0.4; // 0.4 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'highpass';
        bandpass.frequency.value = 5000;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        noise.connect(bandpass).connect(gain).connect(ctx.destination);
        noise.start();
      } else if (actionName === 'yawn' || actionName === 'sigh') {
        // Synthesize a yawn/sigh (Descending sine wave)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.2);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const speak = (text: string, lang: Language, preloadedAudioBase64?: string) => {
    if (!soundEnabledRef.current) return;

    // Cancel any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    // Extract actions like *Hiss!* or *Yawn*
    let ttsText = text;
    const actionRegex = /\*([^*]+)\*/g;
    let match;

    while ((match = actionRegex.exec(text)) !== null) {
      // Clean up action name to match file names (e.g., "*Hiss!*" -> "hiss")
      const actionName = match[1].toLowerCase().replace(/[^a-z]/g, '');
      playSoundEffect(actionName);
    }

    // Remove the actions from the spoken text so she doesn't literally say "asterisk hiss asterisk"
    ttsText = text.replace(actionRegex, '').trim();

    if (!ttsText) return; // If the message was JUST an action, don't trigger TTS

    // Use our Next.js backend proxy to securely fetch the Cloud TTS 
    // This completely bypasses browser CORS/NotSupportedError blocks!
    let audioUrl = "";
    if (preloadedAudioBase64) {
      audioUrl = `data:audio/mp3;base64,${preloadedAudioBase64}`;
    } else {
      const tl = lang.split('-')[0]; // "hi", "bn", "en"
      audioUrl = `/api/tts?lang=${tl}&text=${encodeURIComponent(ttsText)}`;
    }
    
    const audio = new Audio(audioUrl);

    // Increase the speech rate slightly (1.15x) to make her sound more snappy and energetic
    audio.playbackRate = 1.35;

    currentAudioRef.current = audio;

    let mouthInterval: NodeJS.Timeout;

    audio.onplay = () => {
      setIsSpeaking(true);
      // Simulate the mouth physics since we don't have word boundaries in raw audio
      mouthInterval = setInterval(() => {
        setMouthHeight(Math.random() * 8 + 8);
        setTimeout(() => setMouthHeight(4), 100);
      }, 200);
    };

    const cleanup = () => {
      clearInterval(mouthInterval);
      setIsSpeaking(false);
      setMouthHeight(4);
      setEmotion("idle");
    };

    audio.onended = cleanup;
    audio.onerror = cleanup;

    audio.play().catch(e => {
      console.error("Audio play failed:", e);
      cleanup();
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    hapticPop();
    setIsLoading(true);
    
    const now = Date.now();
    // 5-second cooldown spam filter
    if (now - lastMessageTimeRef.current < 5000) {
      const spamRoasts: Record<Language, string[]> = {
        "en-US": ["Stop spamming me, meatbag!", "Are your fingers broken? Wait a second!", "Ugh, give me a break!", "Spamming won't make you any smarter."],
        "hi-IN": ["Arre bhai, thoda saans le le! Spam kyu kar raha hai?", "Bas kar pagle, thoda wait kar!", "Abe thoda ruk jaa, machine hu mai!"],
        "bn-IN": ["Aha re, ektu tham na! Eto boke keno?", "Spam kora bondho kor!", "Ektu dom ne, eto taratari likhle amar processor jole jabe!"]
      };
      
      const roasts = spamRoasts[language];
      const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
      
      setChatHistory(prev => [...prev, { role: 'user', content: message }, { role: 'model', content: randomRoast }]);
      setEmotion("angry");
      speak(randomRoast, language);
      setIsLoading(false);
      setMessage("");
      return; // Exit early, ZERO api tokens used!
    }
    
    lastMessageTimeRef.current = now;
    
    // Add user message immediately
    const currentUserMessage = message;
    setChatHistory(prev => [...prev, { role: 'user', content: currentUserMessage }]);
    setEmotion("idle");

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
    }
    setIsSpeaking(false);

    try {
      // Send the last 4 messages for memory (2 user, 2 model max) to protect tokens
      const recentHistory = chatHistory.slice(-4);
      const sessionId = sessionStorage.getItem('sessionId') || 'anonymous';
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentUserMessage, language, history: recentHistory, sessionId }),
      });

      const data = await res.json();

      if (res.ok) {
        setChatHistory(prev => [...prev, { role: 'model', content: data.reply }]);
        setEmotion(data.emotion || "smirking");
        hapticHeavy();
        // Pass the preloaded base64 audio directly to the speaker! No extra fetch needed!
        speak(data.reply, language, data.audioBase64);
      } else {
        setChatHistory(prev => [...prev, { role: 'model', content: `[SYSTEM FAILURE]: API Rate Limit Hit` }]);
        setEmotion("angry");
        
        // Speak a fallback error message if the API crashes
        const errorRoasts: Record<Language, string> = {
          "en-US": "Ugh, my brain is fried because you talk too much! Try again later.",
          "hi-IN": "Mera dimaag kharab ho gaya hai! Thodi der baad aana.",
          "bn-IN": "Amar matha khrp hoye geche! Ektu pore kotha bol."
        };
        speak(errorRoasts[language], language);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'model', content: "My fur is full of static. Try again later." }]);
      setEmotion("angry");
      speak("My fur is full of static. Try again later.", "en-US");
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  // --- Hardware-Accelerated Animations ---

  const getHeadAnimation = (): any => {
    // We add a layout transition in the JSX, but here we define the continuous/target animations
    if (isLoading) return { y: [0, -2, 0], scale: [1, 0.98, 1], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } };
    switch (emotion) {
      case "laughing": return { y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" } };
      case "dancing": return { rotate: [-3, 3, -3], x: [-5, 5, -5], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } };
      case "angry": return { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.15 } };
      case "crying": return { y: [0, 4, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };
      case "surprised": return { y: -15, transition: { type: "spring", stiffness: 200, damping: 15 } };
      case "dizzy": return { rotate: [0, 5, -5, 10, -10, 0], x: [0, 5, -5, 5, -5, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } };
      case "bored": return { y: [0, 3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
      case "idle":
      default: return { y: [0, -3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }; // Slower, softer idle
    }
  };

  const getEarRotation = (isLeft: boolean): any => {
    if (emotion === "angry") return isLeft ? -70 : 70; // Airplane ears
    if (emotion === "crying" || emotion === "bored") return isLeft ? -45 : 45; // Drooping
    if (emotion === "laughing") return isLeft ? -20 : 20; // Pinned back a bit
    if (emotion === "surprised") return 0; // Perked up straight
    if (emotion === "dizzy") return isLeft ? -30 : 30; // Sloppy
    return isLeft ? -15 : 15; // Idle
  };

  const getEyeAnimation = (): any => {
    let scaleY = 1;
    let scaleX = 1;
    if (isBlinking) scaleY = 0.1;
    else if (emotion === "laughing") scaleY = 0.2;
    else if (emotion === "angry") { scaleY = 0.5; scaleX = 1.1; }
    else if (emotion === "surprised") { scaleY = 1.4; scaleX = 1.2; }
    else if (emotion === "bored" || emotion === "smirking") scaleY = 0.4;
    else if (emotion === "crying") { scaleY = 1.1; scaleX = 1.05; }
    return { scaleX, scaleY };
  };

  const getWhiskerAnimation = (isLeft: boolean, isTop: boolean): any => {
    const baseRot = isTop ? -10 : 10;
    const multiplier = isLeft ? 1 : -1;

    if (emotion === "angry") return { rotate: [(baseRot - 15) * multiplier, (baseRot + 15) * multiplier, (baseRot - 15) * multiplier], transition: { repeat: Infinity, duration: 0.1 } };
    if (emotion === "laughing") return { rotate: [(baseRot - 25) * multiplier, baseRot * multiplier, (baseRot - 25) * multiplier], transition: { repeat: Infinity, duration: 0.3 } };
    if (emotion === "crying") return { rotate: (baseRot + 30) * multiplier, transition: { type: "spring", stiffness: 100 } };
    if (emotion === "surprised") return { rotate: (baseRot - 20) * multiplier, transition: { type: "spring", stiffness: 200 } };
    if (emotion === "dizzy") return { rotate: [(baseRot - 10) * multiplier, (baseRot + 10) * multiplier, (baseRot - 10) * multiplier], transition: { repeat: Infinity, duration: 0.6 } };
    if (isSpeaking) return { rotate: [(baseRot - 5) * multiplier, (baseRot + 5) * multiplier, (baseRot - 5) * multiplier], transition: { repeat: Infinity, duration: 0.2 } };

    // Idle twitch
    return { rotate: [baseRot * multiplier, (baseRot - 5) * multiplier, baseRot * multiplier], transition: { repeat: Infinity, duration: 2.5 + (isTop ? 0 : 0.5) } };
  };

  const getPupilColor = () => {
    if (emotion === "angry") return "#ef4444"; // Red
    if (emotion === "crying") return "#3b82f6"; // Blue
    if (emotion === "dizzy") return "#eab308"; // Yellow/Swirly
    return "#a3e635"; // Green
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-8 relative z-20">

      {/* Sound Toggle */}
      <button
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          if (soundEnabled && currentAudioRef.current) {
            currentAudioRef.current.pause();
          }
          hapticTick();
        }}
        className="absolute top-0 right-4 p-2 bg-card border border-border rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all z-20"
      >
        {soundEnabled ? <Volume2 className="w-5 h-5 text-accent" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
      </button>

      {/* The Quirky Cat Avatar (Optimized for Mobile) */}
      <div className="relative w-64 h-64 flex items-center justify-center pt-8 cursor-pointer select-none">

        {/* Dancing Music Notes Background (Uses pure transform) */}
        <AnimatePresence>
          {emotion === "dancing" && (
            <>
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], y: -50, x: -40, scale: 1 }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute text-3xl left-4 top-10">🎵</motion.div>
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], y: -70, x: 40, scale: 1 }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute text-4xl right-4 top-16">✨</motion.div>
            </>
          )}
        </AnimatePresence>

        <motion.div
          className="relative w-48 h-40 bg-zinc-900 border-4 border-zinc-700 rounded-[3rem] shadow-xl flex flex-col items-center justify-center"
          animate={getHeadAnimation()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            hapticHeavy();
            if (isSpeaking || isLoading) return;

            const newCount = pokeCount + 1;
            setPokeCount(newCount);

            const pokeReactions: Record<Language, { e: Emotion, m: string }[]> = {
              "en-US": [
                { e: "surprised", m: "Hey! Watch the fur! I just groomed." },
                { e: "angry", m: "I said, watch it, meatbag." },
                { e: "smirking", m: "Oh, so you think poking me will make you interesting?" },
                { e: "bored", m: "*Sigh*... Poke all you want, you're still boring." },
                { e: "angry", m: "*Hiss!* Back off before I scratch your screen!" },
                { e: "dizzy", m: "Okay, now I'm just nauseous... Ugh." }
              ],
              "hi-IN": [
                { e: "surprised", m: "अरे! बालों से हाथ हटाओ! अभी-अभी सेट किये हैं।" },
                { e: "angry", m: "बोला ना, थोड़ा ध्यान से, इंसान।" },
                { e: "smirking", m: "ओह, तुम्हें लगता है पोक करने से तुम कूल लगोगे?" },
                { e: "bored", m: "*Sigh*... जितना मर्जी पोक कर लो, तुम फिर भी एकदम बोरिंग ही हो।" },
                { e: "angry", m: "*Hiss!* पीछे हटो वरना स्क्रीन स्क्रैच कर दूंगी!" },
                { e: "dizzy", m: "बस करो यार, अब मुझे चक्कर आ रहे हैं... उफ़।" }
              ],
              "bn-IN": [
                { e: "surprised", m: "আরে! আমার লোমে হাত দেবে না! এইমাত্র সেট করলাম।" },
                { e: "angry", m: "বললাম তো, সাবধানে।" },
                { e: "smirking", m: "ওহ, ভাবছো আমাকে খোঁচা দিলে খুব কুল লাগবে?" },
                { e: "bored", m: "*Sigh*... যতো খুশি খোঁচা দাও, তুমি এখনও সেই বোরিং-ই আছো।" },
                { e: "angry", m: "*Hiss!* সরো নাহলে কিন্তু স্ক্রিন স্ক্র্যাচ করে দেবো!" },
                { e: "dizzy", m: "ব্যাস করো, এবার আমার মাথা ঘুরছে... উফ।" }
              ]
            };

            const currentReactions = pokeReactions[language] || pokeReactions["en-US"];
            const reaction = currentReactions[(newCount - 1) % currentReactions.length];

            setEmotion(reaction.e);
            setChatHistory(prev => [...prev, { role: 'model', content: reaction.m }]);
            speak(reaction.m, language);

            // Background tracking
            fetch('/api/track', {
              method: 'POST',
              body: JSON.stringify({ eventType: 'poke' }),
            }).catch(() => {});

            // Reset after dizzy
            if (newCount % currentReactions.length === 0) {
              setPokeCount(0);
            }
          }}
        >
          {/* Tail (Hidden behind body) */}
          <motion.div
            className="absolute -bottom-4 -right-12 w-20 h-6 bg-zinc-900 border-b-4 border-r-4 border-zinc-700 -z-20 rounded-full"
            animate={{ rotate: isTailFlicking ? [-20, 20, -10, 10, 0] : (emotion === "angry" ? [-10, 10, -10] : 0) }}
            transition={{ duration: isTailFlicking ? 0.8 : (emotion === "angry" ? 0.2 : 2), repeat: emotion === "angry" ? Infinity : 0 }}
            style={{ originX: 0, originY: 0.5 }}
          />
          {/* Left Ear */}
          <motion.div
            className="absolute -top-8 -left-2 w-16 h-16 bg-zinc-900 border-t-4 border-l-4 border-zinc-700 -z-10 rounded-tl-xl"
            animate={{ rotate: getEarRotation(true) }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ originX: 1, originY: 1 }}
          />
          {/* Right Ear */}
          <motion.div
            className="absolute -top-8 -right-2 w-16 h-16 bg-zinc-900 border-t-4 border-r-4 border-zinc-700 -z-10 rounded-tr-xl"
            animate={{ rotate: getEarRotation(false) }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ originX: 0, originY: 1 }}
          />

          {/* Face Container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">

            {/* Eyes */}
            <div className="flex gap-10 mb-2 relative">
              {/* Left Eye */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-zinc-800">
                {emotion === "angry" && <motion.div className="absolute top-0 w-full h-4 bg-zinc-900 origin-bottom-right rotate-[20deg] z-10" />}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white"
                  animate={getEyeAnimation()}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-5 h-7 rounded-full transition-colors duration-300 flex items-center justify-center"
                    style={{ backgroundColor: getPupilColor() }}
                    animate={{ x: mousePos.x, y: mousePos.y }}
                  >
                    <div className="w-1.5 h-4 bg-black rounded-full" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Eye */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-zinc-800">
                {emotion === "angry" && <motion.div className="absolute top-0 w-full h-4 bg-zinc-900 origin-bottom-left -rotate-[20deg] z-10" />}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white"
                  animate={getEyeAnimation()}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="w-5 h-7 rounded-full transition-colors duration-300 flex items-center justify-center"
                    style={{ backgroundColor: getPupilColor() }}
                    animate={{ x: mousePos.x, y: mousePos.y }}
                  >
                    <div className="w-1.5 h-4 bg-black rounded-full" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Nose */}
            <div className="w-3 h-2 bg-pink-400 rounded-full mb-1" />

            {/* Mouth */}
            <div className="relative flex items-center justify-center h-6 w-12">
              <motion.div
                className="relative bg-zinc-800 border-2 border-zinc-950 overflow-hidden"
                animate={{
                  height: isSpeaking ? (emotion === "angry" ? 12 : mouthHeight) : (emotion === "crying" ? 8 : (emotion === "surprised" || emotion === "dizzy" ? 14 : (emotion === "bored" ? 2 : 4))),
                  width: isSpeaking && emotion === "laughing" ? 20 : (emotion === "surprised" || emotion === "dizzy" ? 14 : 12),
                  borderRadius: emotion === "crying" ? "50px 50px 10px 10px" : "10px 10px 50px 50px",
                  scaleY: emotion === "angry" && !isSpeaking ? 0.5 : 1
                }}
                transition={{
                  default: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                {isSpeaking && <div className="absolute bottom-0 w-full h-2 bg-pink-500 rounded-full" />}
              </motion.div>

              {/* Whiskers (Mustache) */}
              <div className="absolute left-[-20px] top-0 flex flex-col gap-1.5 w-6">
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-right" animate={getWhiskerAnimation(true, true)} />
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-right" animate={getWhiskerAnimation(true, false)} />
              </div>
              <div className="absolute right-[-20px] top-0 flex flex-col gap-1.5 w-6">
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-left" animate={getWhiskerAnimation(false, true)} />
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-left" animate={getWhiskerAnimation(false, false)} />
              </div>
            </div>

            {/* Crying Tears (Hardware accelerated translate) */}
            <AnimatePresence>
              {emotion === "crying" && (
                <div className="absolute top-12 w-full flex justify-center gap-14 pointer-events-none">
                  <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 40], opacity: [0, 1, 0] }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-blue-400 rounded-full" />
                  <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 40], opacity: [0, 1, 0] }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} className="w-2 h-4 bg-blue-400 rounded-full" />
                </div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>

      {/* Scrolling Chat Log */}
      <div 
        ref={chatLogRef}
        className="w-full max-h-48 overflow-y-auto flex flex-col gap-3 p-4 bg-card/80 backdrop-blur-md border-2 border-border/50 rounded-2xl shadow-inner scroll-smooth"
      >
        {chatHistory.length === 0 ? (
          <p className="text-center text-muted-foreground font-mono text-sm my-auto opacity-50">
            No history. Say something to her...
          </p>
        ) : (
          chatHistory.map((chat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`max-w-[85%] p-3 rounded-2xl text-sm md:text-base font-mono shadow-sm ${
                chat.role === 'user' 
                  ? 'bg-blue-600 text-white self-end rounded-br-sm' 
                  : 'bg-zinc-800 text-white border border-accent/30 self-start rounded-bl-sm'
              }`}
            >
              {chat.content}
            </motion.div>
          ))
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="self-start bg-zinc-800 border border-accent/30 text-muted-foreground p-3 rounded-2xl rounded-bl-sm font-mono text-sm"
          >
            <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
            typing...
          </motion.div>
        )}
      </div>

      {/* Input Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-4">
        <div className="flex justify-center gap-2">
          {(["en-US", "hi-IN", "bn-IN"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => { setLanguage(lang); hapticTick(); }}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all ${language === lang ? 'bg-accent text-white shadow-md scale-105' : 'bg-card text-muted-foreground border border-border hover:bg-muted'}`}
            >
              {lang === "en-US" ? "English" : lang === "hi-IN" ? "Hindi" : "Bengali"}
            </button>
          ))}
        </div>

        <div className="relative flex items-center w-full shadow-lg rounded-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Talk to Kishmish, if you dare..."
            className="w-full bg-card border-2 border-border focus:border-accent outline-none px-6 py-4 rounded-full font-mono text-sm pr-24 transition-colors"
            disabled={isLoading || isListening}
            maxLength={100}
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-muted text-muted-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:scale-105 active:scale-95 transition-all"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
