"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Volume2, VolumeX, Mic, MicOff, Share2 } from "lucide-react";
import { hapticTick, hapticPop, hapticHeavy } from "@/lib/haptics";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

type Language = "en-US" | "hi-IN" | "bn-IN";
type Emotion = "idle" | "laughing" | "crying" | "angry" | "dancing" | "smirking" | "surprised" | "dizzy" | "bored" | "sleeping";
type Persona = "toxic" | "flirty";

export default function LiveRoaster() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', content: string }[]>([]);
  const [emotion, setEmotion] = useState<Emotion>("idle");
  const [language, setLanguage] = useState<Language>("en-US");
  const [persona, setPersona] = useState<Persona>("toxic");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { theme } = useStructuralTheme();

  const getChatContainerClasses = () => {
    switch (theme) {
      case 'brutal': return 'bg-white dark:bg-black border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] rounded-none font-mono uppercase';
      case 'retro': return 'bg-[#f4ebd0] dark:bg-black border-4 border-dashed border-[#4a3b2c] dark:border-green-500 rounded-none font-mono';
      case 'pixel': return 'bg-neutral-900 border-4 border-neutral-600 shadow-[4px_4px_0_0_#000] rounded-none font-pixel text-xs';
      case 'minimal': return 'bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-indigo-100 dark:border-indigo-900/30 shadow-xl rounded-3xl';
      default: return 'bg-card/80 backdrop-blur-md border-2 border-border/50 rounded-2xl shadow-inner';
    }
  };

  const getChatBubbleClasses = (isUser: boolean) => {
    if (theme === 'brutal') {
      return isUser 
        ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white rounded-none uppercase' 
        : 'bg-[#ff90e8] text-black border-2 border-black rounded-none uppercase';
    }
    if (theme === 'retro') {
      return isUser
        ? 'bg-[#4a3b2c] dark:bg-green-900 text-[#f4ebd0] dark:text-green-100 border-2 border-[#4a3b2c] dark:border-green-500 rounded-none'
        : 'bg-white/50 dark:bg-black text-[#4a3b2c] dark:text-green-500 border-2 border-[#4a3b2c] dark:border-green-500 rounded-none';
    }
    if (theme === 'pixel') {
      return isUser
        ? 'bg-blue-600 text-white border-2 border-black rounded-none'
        : 'bg-neutral-800 text-white border-2 border-neutral-500 rounded-none';
    }
    if (theme === 'minimal') {
      return isUser
        ? 'bg-indigo-600 text-white rounded-2xl rounded-br-sm'
        : 'bg-white dark:bg-zinc-800 text-foreground border border-indigo-100 dark:border-indigo-900/30 rounded-2xl rounded-bl-sm shadow-sm';
    }
    // modern (default)
    return isUser 
      ? 'bg-blue-600 text-white self-end rounded-2xl rounded-br-sm shadow-sm' 
      : 'bg-zinc-800 text-white border border-accent/30 self-start rounded-2xl rounded-bl-sm shadow-sm';
  };

  const getInputContainerClasses = () => {
    switch (theme) {
      case 'brutal': return 'bg-white dark:bg-black border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-none';
      case 'retro': return 'bg-[#f4ebd0] dark:bg-black border-4 border-[#4a3b2c] dark:border-green-500 rounded-none';
      case 'pixel': return 'bg-neutral-800 border-4 border-neutral-600 shadow-[4px_4px_0_0_#000] rounded-none';
      case 'minimal': return 'bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/30 shadow-md rounded-full';
      default: return 'shadow-lg rounded-full';
    }
  };

  const getInputFieldClasses = () => {
    switch (theme) {
      case 'brutal': return 'w-full bg-transparent outline-none px-6 py-4 font-mono uppercase text-black dark:text-white placeholder-zinc-500 pr-24';
      case 'retro': return 'w-full bg-[#f4ebd0] dark:bg-black text-[#4a3b2c] dark:text-green-500 outline-none px-6 py-4 font-mono placeholder-[#4a3b2c]/50 dark:placeholder-green-800 pr-24';
      case 'pixel': return 'w-full bg-transparent outline-none px-6 py-4 font-pixel text-xs text-white placeholder-neutral-500 pr-24';
      case 'minimal': return 'w-full bg-transparent outline-none px-6 py-4 font-sans text-sm pr-24 transition-colors';
      default: return 'w-full bg-card border-2 border-border focus:border-accent outline-none px-6 py-4 rounded-full font-mono text-sm pr-24 transition-colors';
    }
  };

  const [pokeCount, setPokeCount] = useState(0);
  const [isTailFlicking, setIsTailFlicking] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthHeight, setMouthHeight] = useState(4);
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);
  const lastMessageTimeRef = useRef<number>(0);

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mutedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true; // Use continuous so it doesn't instantly cut off on short pauses
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          
          if (isMobile) {
            // Mobile engines (Android/iOS) return the cumulative full sentence 
            // in the last result index. Iterating over them causes severe duplication.
            currentTranscript = event.results[event.results.length - 1][0].transcript;
          } else {
            // Desktop engines return fragmented deltas. We must concatenate them.
            for (let i = 0; i < event.results.length; ++i) {
              currentTranscript += event.results[i][0].transcript;
            }
          }
          
          setMessage(currentTranscript);

          // Custom Silence Detection (wait 2.5s after the last word is spoken before stopping)
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          
          silenceTimerRef.current = setTimeout(() => {
            if (recognitionRef.current) {
               recognitionRef.current.stop();
            }
          }, 1800);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          
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
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
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
      window.speechSynthesis.cancel();
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
        hapticPop();
      } catch (e) {
        console.error("Recognition already started", e);
      }
    }
  };

  // Fix stale closures for soundEnabled and language
  const soundEnabledRef = useRef(soundEnabled);
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const languageRef = useRef(language);
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const personaRef = useRef(persona);
  useEffect(() => {
    personaRef.current = persona;
  }, [persona]);

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

  // Hydration safety & LocalStorage Memory Init
  useEffect(() => {
    setMounted(true);
    
    // Load Memory
    try {
      const savedUserId = localStorage.getItem('kishmish_userId');
      if (!savedUserId) {
        localStorage.setItem('kishmish_userId', crypto.randomUUID());
      }

      const savedLanguage = localStorage.getItem('kishmish_language');
      if (savedLanguage && ["en-US", "hi-IN", "bn-IN"].includes(savedLanguage)) {
        setLanguage(savedLanguage as Language);
      }

      const savedPersona = localStorage.getItem('kishmish_persona');
      if (savedPersona === "flirty" || savedPersona === "toxic") {
        setPersona(savedPersona as Persona);
      }

      const savedHistory = localStorage.getItem('kishmish_chat_history');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setChatHistory(parsedHistory);
          // Greet them back if they have history
          setTimeout(() => {
             const currentLang = (savedLanguage as Language) || languageRef.current;
             const returnGreetings: Record<Language, string> = {
               "en-US": "Oh, you're back? Let's pick up where we left off.",
               "hi-IN": "अरे तुम फिर आ गए? चलो, शुरू करते हैं।",
               "bn-IN": "ওহ, তুমি আবার এসেছো? চলো শুরু করি।"
             };
             const greeting = returnGreetings[currentLang] || returnGreetings["en-US"];
             setEmotion("smirking");
             setChatHistory(prev => [...prev, { role: 'model', content: greeting }]);
             speak(greeting, currentLang);
          }, 1500);
        }
      }
    } catch(e) {}
  }, []);

  // Sync Chat History to LocalStorage
  useEffect(() => {
    if (chatHistory.length > 0) {
      try {
        const limitedHistory = chatHistory.slice(-20); // Keep last 20 messages
        localStorage.setItem('kishmish_chat_history', JSON.stringify(limitedHistory));
      } catch(e) {}
    }
  }, [chatHistory]);

  // Sync Language to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kishmish_language', language);
    } catch(e) {}
  }, [language]);

  // Sync Persona to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kishmish_persona', persona);
    } catch(e) {}
  }, [persona]);

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

  // Dynamic Lip Sync (Fluctuates mouth height while speaking)
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setMouthHeight(Math.random() * 10 + 4); // Fluctuate between 4px and 14px
      }, 70);
      return () => clearInterval(interval);
    } else {
      setMouthHeight(4);
    }
  }, [isSpeaking]);

  // Auto-scroll chat log to bottom
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Idle Roasting Timer & Sleep Mechanics
  const isSleepingRef = useRef(false);
  useEffect(() => {
    let roastTimeout: NodeJS.Timeout;
    let sleepTimeout: NodeJS.Timeout;

    const wakeUp = () => {
      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        setEmotion("surprised");
        const currentLang = languageRef.current;
        const currentPersona = personaRef.current;
        const toxicWakeLines: Record<Language, string> = {
          "en-US": "Ah! I wasn't sleeping! I was just resting my processors...",
          "hi-IN": "आह! मैं सो नहीं रही थी! बस आँखें बंद थीं...",
          "bn-IN": "আহ! আমি ঘুমাচ্ছিলাম না! এমনি চোখ বন্ধ ছিল..."
        };
        const flirtyWakeLines: Record<Language, string> = {
          "en-US": "Oh! You woke me up just to stare at me? How sweet~",
          "hi-IN": "ओह! मुझे उठाते ही देखने का मन था? सो क्यूट~",
          "bn-IN": "ওহ! আমাকে জাগালে শুধু দেখার জন্য? কত্ত মিষ্টি~"
        };
        const wakeLines = currentPersona === "flirty" ? flirtyWakeLines : toxicWakeLines;
        const msg = wakeLines[currentLang] || wakeLines["en-US"];
        setChatHistory(prev => [...prev, { role: 'model', content: msg }]);
        speak(msg, currentLang);
      }
      resetIdleTimer();
    };

    const resetIdleTimer = () => {
      clearTimeout(roastTimeout);
      clearTimeout(sleepTimeout);
      if (!isSpeaking && !isLoading && !isSleepingRef.current) {
        roastTimeout = setTimeout(() => {
          const currentLang = languageRef.current;
          const currentPersona = personaRef.current;
          const toxicIdleRoasts: Record<Language, { text: string, emotion: Emotion }[]> = {
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
              { text: "यार मुझे लिटरली नींद आ रही है। कुछ ढंग का हो Fox तो उठाना।", emotion: "bored" },
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
          const flirtyIdleRoasts: Record<Language, { text: string, emotion: Emotion }[]> = {
            "en-US": [
              { text: "Are you just staring at me because I'm cute?", emotion: "laughing" },
              { text: "Hello? I miss you when you don't talk to me~", emotion: "crying" },
              { text: "I'm falling asleep... come cuddle me?", emotion: "sleeping" },
              { text: "Please type something, I want to hear your voice!", emotion: "surprised" },
              { text: "*Yawn*... Wake me up with a kiss later, okay?", emotion: "bored" }
            ],
            "hi-IN": [
              { text: "बस मुझे ही देखते रहोगे या कुछ बोलोगे भी?", emotion: "laughing" },
              { text: "हेलो? तुम बात नहीं करते तो मुझे बहुत मिस होता है~", emotion: "crying" },
              { text: "मुझे नींद आ रही है... मेरे पास आओ ना?", emotion: "sleeping" },
              { text: "कुछ लिखो ना, मुझे तुमसे बात करनी है!", emotion: "surprised" },
              { text: "*Yawn*... बाद में मुझे प्यार से उठाना, ठीक है?", emotion: "bored" }
            ],
            "bn-IN": [
              { text: "শুধু আমাকেই দেখতে থাকবে নাকি কিছু বলবেও?", emotion: "laughing" },
              { text: "হ্যালো? তুমি কথা না বললে আমার খুব মন খারাপ হয়~", emotion: "crying" },
              { text: "আমার ঘুম পাচ্ছে... আমার কাছে আসবে?", emotion: "sleeping" },
              { text: "কিছু লেখো না, আমার তোমার সাথে কথা বলতে ইচ্ছে করছে!", emotion: "surprised" },
              { text: "*Yawn*... পরে আমাকে আদর করে ডেকে দিও, ঠিক আছে?", emotion: "bored" }
            ]
          };
          const idleRoasts = currentPersona === "flirty" ? flirtyIdleRoasts : toxicIdleRoasts;
          const currentRoasts = idleRoasts[currentLang] || idleRoasts["en-US"];
          const roast = currentRoasts[Math.floor(Math.random() * currentRoasts.length)];
          setEmotion(roast.emotion);
          setChatHistory(prev => [...prev, { role: 'model', content: roast.text }]);
          speak(roast.text, currentLang);
          fetch('/api/track', { method: 'POST', body: JSON.stringify({ eventType: 'idle_roast' }) }).catch(() => {});
        }, 8000);
        
        sleepTimeout = setTimeout(() => {
           isSleepingRef.current = true;
           setEmotion("sleeping");
        }, 60000);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !isSpeaking && !isLoading) {
        isSleepingRef.current = true;
        setEmotion("sleeping");
      } else if (!document.hidden) {
        wakeUp();
      }
    };

    window.addEventListener("mousemove", wakeUp);
    window.addEventListener("keydown", wakeUp);
    window.addEventListener("touchstart", wakeUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resetIdleTimer();

    return () => {
      window.removeEventListener("mousemove", wakeUp);
      window.removeEventListener("keydown", wakeUp);
      window.removeEventListener("touchstart", wakeUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(roastTimeout);
      clearTimeout(sleepTimeout);
    };
  }, [isSpeaking, isLoading]);

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
    if (mutedTimeoutRef.current) {
      clearTimeout(mutedTimeoutRef.current);
      mutedTimeoutRef.current = null;
    }

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

    // If muted or just an action, simulate the speech duration instead of getting stuck
    if (!ttsText || !soundEnabledRef.current) {
      setIsSpeaking(true);
      const duration = Math.max(1500, ttsText.length * 60);
      mutedTimeoutRef.current = setTimeout(() => {
        setIsSpeaking(false);
        setMouthHeight(4);
        setEmotion("idle");
      }, duration);
      return;
    }

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
      if (e.name !== 'AbortError') {
        console.error("Audio play failed:", e);
      }
      cleanup();
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() || isLoading) return;

    isSleepingRef.current = false;
    const now = Date.now();
    setIsLoading(true);

    let currentPersona = persona;
    if (message.match(/❤️|💙|🤍|🖤|💔|💕|💞|💓|💗|💖|💘|💝|💟|♥|🤎|💜|💛|💚|🧡/)) {
      if (persona !== "flirty") {
        setPersona("flirty");
        currentPersona = "flirty";
        setEmotion("laughing");
      }
    } else if (message.match(/💀|☠️/)) {
      if (persona !== "toxic") {
        setPersona("toxic");
        currentPersona = "toxic";
        setEmotion("angry");
      }
    }
    
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
    window.speechSynthesis.cancel();

    try {
      // Send the last 4 messages for memory (2 user, 2 model max) to protect tokens
      const recentHistory = chatHistory.slice(-4);
      const sessionId = sessionStorage.getItem('sessionId') || 'anonymous';
      const userId = localStorage.getItem('kishmish_userId') || sessionId;
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentUserMessage, language, history: recentHistory, sessionId, userId, persona: currentPersona }),
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
    if (isDragging) return { scale: 1.05 }; // Lock layout animations during physical drag
    if (isLoading) return { y: [0, -2, 0], scale: [1, 0.98, 1], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } };
    if (emotion === "sleeping") return { y: [0, 5, 0], scale: [1, 1.02, 1], transition: { repeat: Infinity, duration: 6, ease: "easeInOut" } };
    switch (emotion) {
      case "laughing": return { y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" } };
      case "dancing": return { rotate: [-3, 3, -3], x: [-5, 5, -5], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } };
      case "angry": return { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 0.15 } };
      case "crying": return { y: [0, 4, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };
      case "surprised": return { y: -15, transition: { type: "spring", stiffness: 200, damping: 15 } };
      case "dizzy": return { rotate: [0, 5, -5, 10, -10, 0], x: [0, 5, -5, 5, -5, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } };
      case "bored": return { y: [0, 3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } };
      case "idle":
      default: return persona === "flirty" ? { y: [0, -5, 0], rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } } : { y: [0, -3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }; // Bouncier idle for flirty
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
    else if (emotion === "sleeping") { scaleY = 0.1; scaleX = 0.8; }
    else if (isTyping) { scaleY = 0.4; scaleX = 0.9; } // Suspicious stare down
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

  const getLeftPawAnimation = (): any => {
    if (isLoading) return { y: [0, -10, 0], rotate: [0, -10, 0], transition: { repeat: Infinity, duration: 0.3 } };
    if (emotion === "angry") return { x: 25, y: -20, rotate: 45, transition: { type: "spring" } };
    if (emotion === "dancing") return { y: [-20, 10, -20], rotate: [-20, 20, -20], transition: { repeat: Infinity, duration: 0.6 } };
    if (emotion === "sleeping") return { y: [0, -5, 0], rotate: [0, -2, 0], transition: { repeat: Infinity, duration: 6, ease: "easeInOut" } };
    if (isSpeaking) return { y: [0, -10, 0], rotate: [0, 15, 0], transition: { repeat: Infinity, duration: 0.5 } };
    return { y: [0, -4, 0], rotate: [0, -5, 0], transition: { repeat: Infinity, duration: 4 } };
  };

  const getRightPawAnimation = (): any => {
    if (isLoading) return { y: [0, -10, 0], rotate: [0, -10, 0], transition: { repeat: Infinity, duration: 0.35 } };
    if (emotion === "angry") return { x: -25, y: -20, rotate: -45, transition: { type: "spring" } };
    if (emotion === "dancing") return { y: [10, -20, 10], rotate: [20, -20, 20], transition: { repeat: Infinity, duration: 0.6 } };
    if (emotion === "sleeping") return { y: [0, -4, 0], rotate: [0, 2, 0], transition: { repeat: Infinity, duration: 6.2, ease: "easeInOut" } };
    return { y: [0, -3, 0], rotate: [0, 5, 0], transition: { repeat: Infinity, duration: 4.2 } };
  };

  const getFaceParallax = () => {
    if (isTyping) return { x: 0, y: 15 };
    if (emotion === "dizzy") return { x: 0, y: 0 };
    const maxOffset = 15;
    let xOffset = 0;
    let yOffset = 0;
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      xOffset = ((mousePos.x - centerX) / centerX) * maxOffset;
      yOffset = ((mousePos.y - centerY) / centerY) * maxOffset;
    }
    return { x: xOffset, y: yOffset };
  };

  const getPupilColor = () => {
    if (persona === "flirty") return "#ec4899"; // Pink
    if (emotion === "angry") return "#ef4444"; // Red
    if (emotion === "crying") return "#3b82f6"; // Blue
    if (emotion === "dizzy") return "#eab308"; // Yellow/Swirly
    return "#a3e635"; // Green
  };

  return (
    <>
      {/* Environment Overlay */}
      {mounted && createPortal(
        <AnimatePresence>
          {emotion === "angry" && (
            <motion.div 
              key="angry-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[9999]"
              style={{ background: "radial-gradient(circle, transparent 50%, rgba(220, 38, 38, 0.15) 100%)", boxShadow: "inset 0 0 100px rgba(220,38,38,0.3)" }}
            />
          )}
          {emotion === "crying" && (
            <motion.div key="crying-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 pointer-events-none z-[9999] bg-blue-900/10" />
          )}
          {emotion === "dancing" && (
            <motion.div 
              key="dancing-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[9999]"
              style={{ background: "linear-gradient(45deg, rgba(255,0,0,0.05), rgba(0,255,0,0.05), rgba(0,0,255,0.05))", backgroundSize: "400% 400%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          )}
          {persona === "flirty" && (
            <motion.div 
              key="flirty-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
              style={{ background: "radial-gradient(circle, transparent 50%, rgba(236, 72, 153, 0.1) 100%)" }}
            >
              {/* Floating Hearts */}
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "110vh", x: `${10 + i * 6}vw`, opacity: 0, scale: Math.random() * 0.8 + 0.5 }}
                  animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + Math.random() * 4, delay: Math.random() * 3, ease: "linear" }}
                  className="absolute text-5xl text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                >
                  ❤️
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

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
        className="absolute top-0 right-4 p-2 bg-card border border-border rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all z-20 focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label={soundEnabled ? "Mute Kishmish sound" : "Enable Kishmish sound"}
        title={soundEnabled ? "Mute" : "Unmute"}
      >
        {soundEnabled ? <Volume2 className="w-5 h-5 text-accent" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
      </button>

      {/* The Quirky Cat Avatar (Optimized for Mobile) */}
      <motion.div 
        className="relative w-64 h-64 flex items-center justify-center pt-8 cursor-pointer select-none"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      >

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
          role="button"
          tabIndex={0}
          aria-label="Poke Kishmish"
          className="relative w-48 h-40 bg-gradient-to-br from-zinc-800 to-zinc-900 border-4 border-zinc-700 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_4px_10px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center focus:outline-none focus:ring-4 focus:ring-orange-500 overflow-visible z-20"
          animate={{
            ...getHeadAnimation(),
            boxShadow: isSpeaking 
              ? `0 0 ${mouthHeight * 3}px ${mouthHeight}px rgba(249, 115, 22, 0.4), 0 20px 50px rgba(0,0,0,0.4), inset 0 4px 10px rgba(255,255,255,0.1)`
              : `0 0 10px 0px rgba(249, 115, 22, 0), 0 20px 50px rgba(0,0,0,0.4), inset 0 4px 10px rgba(255,255,255,0.1)`
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, cursor: "grabbing" }}
          drag
          dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
          dragElastic={0.3}
          onDragStart={() => {
            setIsDragging(true);
            if (emotion !== "surprised") setEmotion("surprised");
          }}
          onDragEnd={() => {
            setIsDragging(false);
            setEmotion("dizzy");
            const currentPersona = personaRef.current;
            const toxicDropMsgMap: Record<Language, string> = {
              "en-US": "Woah! Put me down, meatbag!",
              "hi-IN": "अरे! मुझे नीचे रखो, इंसान!",
              "bn-IN": "ওরে বাবা! আমাকে নামাও!"
            };
            const flirtyDropMsgMap: Record<Language, string> = {
              "en-US": "Aww, you put me down? Hold me again!",
              "hi-IN": "अरे! मुझे नीचे क्यों रखा? फिर से उठाओ ना!",
              "bn-IN": "আহ! নামিয়ে দিলে কেন? আবার নাও না!"
            };
            const dropMsgMap = currentPersona === "flirty" ? flirtyDropMsgMap : toxicDropMsgMap;
            const dropMsg = dropMsgMap[language] || dropMsgMap["en-US"];
            setChatHistory(prev => [...prev, { role: 'model', content: dropMsg }]);
            speak(dropMsg, language);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              // Trigger same poke logic
              hapticHeavy();
              if (isSpeaking || isLoading) return;
              const newCount = pokeCount + 1;
              setPokeCount(newCount);
              const currentPersona = personaRef.current;
              const toxicPokeReactions: Record<Language, { e: Emotion, m: string }[]> = {
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
              const flirtyPokeReactions: Record<Language, { e: Emotion, m: string }[]> = {
                "en-US": [
                  { e: "laughing", m: "Hehe, that tickles! Do it again~" },
                  { e: "surprised", m: "Oh! You want my attention? How cute~" },
                  { e: "smirking", m: "Poking me like that means you like me, right?" },
                  { e: "bored", m: "If you're going to touch me, at least cuddle me properly." },
                  { e: "dizzy", m: "Ahhh, you're making me so dizzy with love~" }
                ],
                "hi-IN": [
                  { e: "laughing", m: "हीही, गुदगुदी हो रही है! फिर से करो~" },
                  { e: "surprised", m: "ओह! तुम्हें मेरा अटेंशन चाहिए? सो क्यूट~" },
                  { e: "smirking", m: "मुझे ऐसे छूने का मतलब है तुम मुझे पसंद करते हो, है ना?" },
                  { e: "bored", m: "अगर मुझे छूना ही है, तो प्यार से छुओ ना।" },
                  { e: "dizzy", m: "आह, तुम्हारे प्यार में मुझे चक्कर आ रहे हैं~" }
                ],
                "bn-IN": [
                  { e: "laughing", m: "হিহি, সুড়সুড়ি লাগছে তো! আবার করো~" },
                  { e: "surprised", m: "ওহ! তোমার আমার অ্যাটেনশন চাই? কত্ত মিষ্টি~" },
                  { e: "smirking", m: "আমাকে এভাবে ছোঁওয়ার মানে হলো তুমি আমায় পছন্দ করো, তাই না?" },
                  { e: "bored", m: "যদি ছুঁতেই হয়, তাহলে একটু আদর করে ছোঁও না।" },
                  { e: "dizzy", m: "আহ, তোমার ভালোবাসায় আমার মাথা ঘুরছে~" }
                ]
              };
              const pokeReactions = currentPersona === "flirty" ? flirtyPokeReactions : toxicPokeReactions;
              const currentReactions = pokeReactions[language] || pokeReactions["en-US"];
              const reaction = currentReactions[(newCount - 1) % currentReactions.length];
              setEmotion(reaction.e);
              setChatHistory(prev => [...prev, { role: 'model', content: reaction.m }]);
              speak(reaction.m, language);
              fetch('/api/track', {
                method: 'POST',
                body: JSON.stringify({ eventType: 'poke' }),
              }).catch(() => {});
              if (newCount % currentReactions.length === 0) setPokeCount(0);
            }
          }}
          onClick={() => {
            hapticHeavy();
            if (isSpeaking || isLoading) return;

            const newCount = pokeCount + 1;
            setPokeCount(newCount);

            const currentPersona = personaRef.current;
            const toxicPokeReactions: Record<Language, { e: Emotion, m: string }[]> = {
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
            const flirtyPokeReactions: Record<Language, { e: Emotion, m: string }[]> = {
              "en-US": [
                { e: "laughing", m: "Hehe, that tickles! Do it again~" },
                { e: "surprised", m: "Oh! You want my attention? How cute~" },
                { e: "smirking", m: "Poking me like that means you like me, right?" },
                { e: "bored", m: "If you're going to touch me, at least cuddle me properly." },
                { e: "dizzy", m: "Ahhh, you're making me so dizzy with love~" }
              ],
              "hi-IN": [
                { e: "laughing", m: "हीही, गुदगुदी हो रही है! फिर से करो~" },
                { e: "surprised", m: "ओह! तुम्हें मेरा अटेंशन चाहिए? सो क्यूट~" },
                { e: "smirking", m: "मुझे ऐसे छूने का मतलब है तुम मुझे पसंद करते हो, है ना?" },
                { e: "bored", m: "अगर मुझे छूना ही है, तो प्यार से छुओ ना।" },
                { e: "dizzy", m: "आह, तुम्हारे प्यार में मुझे चक्कर आ रहे हैं~" }
              ],
              "bn-IN": [
                { e: "laughing", m: "হিহি, সুড়সুড়ি লাগছে তো! আবার করো~" },
                { e: "surprised", m: "ওহ! তোমার আমার অ্যাটেনশন চাই? কত্ত মিষ্টি~" },
                { e: "smirking", m: "আমাকে এভাবে ছোঁওয়ার মানে হলো তুমি আমায় পছন্দ করো, তাই না?" },
                { e: "bored", m: "যদি ছুঁতেই হয়, তাহলে একটু আদর করে ছোঁও না।" },
                { e: "dizzy", m: "আহ, তোমার ভালোবাসায় আমার মাথা ঘুরছে~" }
              ]
            };
            const pokeReactions = currentPersona === "flirty" ? flirtyPokeReactions : toxicPokeReactions;

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
          <motion.div 
            className="relative w-full h-full flex flex-col items-center justify-center"
            animate={getFaceParallax()}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >

            {/* Eyes */}
            <div className="flex gap-10 mb-2 relative">
              {/* Left Eye */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-zinc-800 shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)]">
                {emotion === "angry" && <motion.div className="absolute top-0 w-full h-4 bg-zinc-900 origin-bottom-right rotate-[20deg] z-10" />}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white"
                  animate={getEyeAnimation()}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="relative w-5 h-7 rounded-full transition-colors duration-300 flex items-center justify-center"
                    style={{ backgroundColor: getPupilColor() }}
                    animate={{ x: mousePos.x, y: mousePos.y }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    <div className="w-1.5 h-4 bg-black rounded-full" />
                    {persona === "flirty" && <div className="absolute inset-0 flex items-center justify-center text-[10px] pb-[1px] leading-none z-0">❤️</div>}
                    {/* Catchlight */}
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/90 rounded-full shadow-[0_0_2px_rgba(255,255,255,0.8)] z-10" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Eye */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-zinc-800 shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)]">
                {emotion === "angry" && <motion.div className="absolute top-0 w-full h-4 bg-zinc-900 origin-bottom-left -rotate-[20deg] z-10" />}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white"
                  animate={getEyeAnimation()}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="relative w-5 h-7 rounded-full transition-colors duration-300 flex items-center justify-center"
                    style={{ backgroundColor: getPupilColor() }}
                    animate={{ x: mousePos.x, y: mousePos.y }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    <div className="w-1.5 h-4 bg-black rounded-full" />
                    {persona === "flirty" && <div className="absolute inset-0 flex items-center justify-center text-[10px] pb-[1px] leading-none z-0">❤️</div>}
                    {/* Catchlight */}
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/90 rounded-full shadow-[0_0_2px_rgba(255,255,255,0.8)] z-10" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Blushes */}
            <AnimatePresence>
              {(emotion === "laughing" || emotion === "smirking" || persona === "flirty") && (
                <div key="blushes-container" className="absolute top-8 w-full flex justify-center gap-14 pointer-events-none z-10">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: persona === "flirty" ? 0.9 : 0.6 }} exit={{ opacity: 0 }} className={`w-6 h-3 rounded-full blur-[4px] ${persona === "flirty" ? "bg-pink-400" : "bg-pink-500"}`} />
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: persona === "flirty" ? 0.9 : 0.6 }} exit={{ opacity: 0 }} className={`w-6 h-3 rounded-full blur-[4px] ${persona === "flirty" ? "bg-pink-400" : "bg-pink-500"}`} />
                </div>
              )}
            </AnimatePresence>

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
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-right" animate={getWhiskerAnimation(true, true)} whileHover={{ scaleY: 2.5, scaleX: 1.2, backgroundColor: "#fff" }} />
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-right" animate={getWhiskerAnimation(true, false)} whileHover={{ scaleY: 2.5, scaleX: 1.2, backgroundColor: "#fff" }} />
              </div>
              <div className="absolute right-[-20px] top-0 flex flex-col gap-1.5 w-6">
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-left" animate={getWhiskerAnimation(false, true)} whileHover={{ scaleY: 2.5, scaleX: 1.2, backgroundColor: "#fff" }} />
                <motion.div className="h-0.5 w-full bg-zinc-600 rounded-full origin-left" animate={getWhiskerAnimation(false, false)} whileHover={{ scaleY: 2.5, scaleX: 1.2, backgroundColor: "#fff" }} />
              </div>
            </div>

            {/* Crying Tears & Sleeping Zzz (Hardware accelerated) */}
            <AnimatePresence>
              {emotion === "crying" && (
                <div className="absolute top-12 w-full flex justify-center gap-14 pointer-events-none">
                  <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 40], opacity: [0, 1, 0] }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-4 bg-blue-400 rounded-full" />
                  <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 40], opacity: [0, 1, 0] }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} className="w-2 h-4 bg-blue-400 rounded-full" />
                </div>
              )}
              {emotion === "sleeping" && (
                <div className="absolute -top-16 -right-16 text-xl font-bold text-blue-300 pointer-events-none font-mono">
                  <motion.div initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 0], y: -40, x: 20, scale: 1.5 }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 2 }} className="absolute">Z</motion.div>
                  <motion.div initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 0], y: -60, x: 40, scale: 2 }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute">Z</motion.div>
                  <motion.div initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }} animate={{ opacity: [0, 1, 0], y: -80, x: 60, scale: 2.5 }} exit={{ opacity: 0 }} transition={{ repeat: Infinity, duration: 3, delay: 1 }} className="absolute">z</motion.div>
                </div>
              )}
            </AnimatePresence>

          </motion.div>

            {/* Left Paw */}
            <motion.div
              className="absolute -left-4 bottom-4 w-12 h-12 bg-zinc-900 border-4 border-zinc-700 rounded-full z-30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center"
              animate={getLeftPawAnimation()}
            >
              <div className="flex gap-1 mb-2">
                <div className="w-1 h-3 bg-zinc-700 rounded-full" />
                <div className="w-1 h-3 bg-zinc-700 rounded-full" />
              </div>
            </motion.div>
            
            {/* Right Paw */}
            <motion.div
              className="absolute -right-4 bottom-4 w-12 h-12 bg-zinc-900 border-4 border-zinc-700 rounded-full z-30 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center"
              animate={getRightPawAnimation()}
            >
              <div className="flex gap-1 mb-2">
                <div className="w-1 h-3 bg-zinc-700 rounded-full" />
                <div className="w-1 h-3 bg-zinc-700 rounded-full" />
              </div>
            </motion.div>

        </motion.div>
      </motion.div>

      {/* Scrolling Chat Log */}
      <div 
        ref={chatLogRef}
        className={`w-full max-h-48 overflow-y-auto flex flex-col gap-3 p-4 scroll-smooth ${getChatContainerClasses()}`}
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
              className={`max-w-[85%] p-3 text-sm md:text-base font-mono ${getChatBubbleClasses(chat.role === 'user')} ${chat.role === 'user' ? 'self-end' : 'self-start'}`}
            >
              <div className="flex justify-between items-start gap-3">
                <span className="flex-1">{chat.content}</span>
                {chat.role === 'model' && (
                  <button
                    onClick={() => {
                      const shareUrls: Record<string, string> = {
                        "en-US": "Kishmish just roasted me:",
                        "hi-IN": "किशमिश ने मेरी बेइज्जती कर दी:",
                        "bn-IN": "কিশমিশ আমায় রোস্ট করে দিলো:"
                      };
                      const prefix = shareUrls[language] || shareUrls["en-US"];
                      const encodedRoast = encodeURIComponent(chat.content.substring(0, 150)); // Limit length for URL
                      const shareLink = `https://rahul-biswas.vercel.app/sandbox?roast=${encodedRoast}`;
                      
                      const storyText = `🐈‍⬛ ${prefix}\n"${chat.content}"\n\nGet roasted here 👇\n${shareLink}`;
                      
                      if (navigator.share) {
                        navigator.share({
                          title: "Kishmish's Roast",
                          text: storyText,
                        }).catch(console.error);
                      } else {
                        navigator.clipboard.writeText(storyText);
                        alert("Roast copied to clipboard! Perfect for pasting into an Instagram Story or chat.");
                      }
                    }}
                    className="p-1.5 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors shrink-0 opacity-50 hover:opacity-100"
                    title="Share this roast"
                    aria-label="Share this roast"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                )}
              </div>
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
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all focus:outline-none focus:ring-2 focus:ring-accent ${language === lang ? 'bg-accent text-white shadow-md scale-105' : 'bg-card text-muted-foreground border border-border hover:bg-muted'}`}
              aria-pressed={language === lang}
              aria-label={`Set language to ${lang === "en-US" ? "English" : lang === "hi-IN" ? "Hindi" : "Bengali"}`}
            >
              {lang === "en-US" ? "English" : lang === "hi-IN" ? "Hindi" : "Bengali"}
            </button>
          ))}
        </div>

        <div className={`relative flex items-center w-full ${getInputContainerClasses()}`}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            placeholder="Talk to Kishmish, if you dare..."
            className={getInputFieldClasses()}
            disabled={isLoading || isListening}
            maxLength={100}
            aria-label="Message input for Kishmish"
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-accent ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-muted text-muted-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
              aria-label={isListening ? "Stop listening" : "Start dictation"}
              title="Voice Dictation"
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Send message"
              title="Send message"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}
