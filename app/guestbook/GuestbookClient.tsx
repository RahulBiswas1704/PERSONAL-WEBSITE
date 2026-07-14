"use client";

import { useState, useEffect } from "react";
import { Send, User } from "lucide-react";
import type { GuestbookEntry } from "../api/guestbook/route";

export default function GuestbookClient() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/guestbook')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          // Vercel KV not configured locally, fallback silently to empty array
          setEntries([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setEntries([]);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contactInfo, message }),
      });
      const newEntry = await res.json();
      if (!newEntry.error) {
        setEntries([newEntry, ...entries]);
        setMessage("");
        setContactInfo("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Form */}
      <form onSubmit={handleSubmit} className="relative transform sm:-rotate-1 sm:hover:rotate-0 transition-transform duration-500 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-border/80 bg-neutral-50 dark:bg-neutral-900 shadow-sm max-w-2xl mx-auto z-20">
        <div className="absolute -top-4 -right-4 bg-accent text-white text-xs font-bold font-mono px-3 py-1 rounded-full shadow-md transform rotate-12">
          New Entry
        </div>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Who are you? (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-black border-2 border-neutral-300 dark:border-border/50 rounded-xl font-mono text-base sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-inner"
          />
          <input
            type="text"
            placeholder="Email or Insta Handle (Private)"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-black border-2 border-neutral-300 dark:border-border/50 rounded-xl font-mono text-base sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-inner"
          />
          <textarea
            placeholder="Write something cool..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={3}
            className="px-4 py-3 bg-white dark:bg-black border-2 border-neutral-300 dark:border-border/50 rounded-xl font-mono text-base sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all shadow-inner resize-none"
          />
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="w-full sm:w-auto self-end px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-xl flex items-center justify-center gap-3 hover:scale-105 hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Submit <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
        
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse p-6 rounded-3xl border-2 border-border/30 bg-background/30 h-32"></div>
          ))
        ) : entries.length === 0 ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400 italic col-span-full font-serif text-lg">No entries yet. Be the first to vandalize this wall!</p>
        ) : (
          entries.map((entry, i) => {
            // Deterministic pseudo-randomness for quirky rotations
            const rotations = ["sm:-rotate-2", "sm:rotate-1", "sm:-rotate-1", "sm:rotate-2"];
            const themes = [
              { bg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50", text: "text-amber-950 dark:text-amber-50", muted: "text-amber-800 dark:text-amber-200" },
              { bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50", text: "text-blue-950 dark:text-blue-50", muted: "text-blue-800 dark:text-blue-200" },
              { bg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50", text: "text-rose-950 dark:text-rose-50", muted: "text-rose-800 dark:text-rose-200" },
              { bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50", text: "text-emerald-950 dark:text-emerald-50", muted: "text-emerald-800 dark:text-emerald-200" }
            ];
            
            // Generate a simple hash from the string ID to pick consistent styles
            let hash = 0;
            for (let j = 0; j < entry.id.length; j++) {
              hash = entry.id.charCodeAt(j) + ((hash << 5) - hash);
            }
            hash = Math.abs(hash);
            
            const rotationClass = rotations[hash % rotations.length];
            const theme = themes[hash % themes.length];

            return (
              <div 
                key={entry.id} 
                className={`p-6 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all duration-300 transform ${rotationClass} sm:hover:rotate-0 hover:-translate-y-1 ${theme.bg} relative ${theme.text}`}
              >
                {/* Quirky Tape / Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm -rotate-2 shadow-sm" />
                
                <div className="flex items-start gap-4 mt-2">
                  <div className={`w-10 h-10 rounded-full bg-white dark:bg-black/50 flex items-center justify-center flex-shrink-0 shadow-inner border border-black/5 dark:border-white/5 ${theme.muted}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-bold text-base font-serif">{entry.name || "Anonymous"}</span>
                      <span className={`text-[10px] sm:text-xs font-mono px-2 py-0.5 bg-white/50 dark:bg-black/30 rounded-full ${theme.muted}`}>
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base opacity-80 break-words leading-relaxed font-medium">{entry.message}</p>
                    
                    {entry.adminReply && (
                      <div className="mt-4 p-3 bg-white/40 dark:bg-black/30 rounded-lg border-l-4 border-accent shadow-inner relative">
                        <div className="absolute -left-1.5 top-3 w-3 h-3 bg-accent rounded-full"></div>
                        <span className="text-xs font-bold font-mono text-accent uppercase tracking-widest block mb-1">Rahul Replied:</span>
                        <p className="text-sm opacity-90 break-words leading-relaxed font-serif italic">"{entry.adminReply}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
