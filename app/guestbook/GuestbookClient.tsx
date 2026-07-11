"use client";

import { useState, useEffect } from "react";
import { Send, User } from "lucide-react";
import type { GuestbookEntry } from "../api/guestbook/route";

export default function GuestbookClient() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/guestbook')
      .then(res => res.json())
      .then(data => {
        setEntries(data);
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
        body: JSON.stringify({ name, message }),
      });
      const newEntry = await res.json();
      if (!newEntry.error) {
        setEntries([newEntry, ...entries]);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md space-y-4">
        <div className="flex gap-4 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900/50 border border-border/50 rounded-lg text-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
          <input
            type="text"
            placeholder="Leave a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900/50 border border-border/50 rounded-lg text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="px-6 py-3 bg-foreground text-background font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Entries */}
      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse flex space-x-4 p-4">
            <div className="rounded-full bg-border/50 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-border/50 rounded w-1/4"></div>
              <div className="h-4 bg-border/50 rounded w-3/4"></div>
            </div>
          </div>
        ) : entries.length === 0 ? (
          <p className="text-center text-muted italic">No entries yet. Be the first!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="p-4 rounded-xl border border-border/30 bg-background/30 hover:bg-background transition-colors flex gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 text-muted-light">
                <User className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-foreground">{entry.name}</span>
                  <span className="text-[10px] text-muted-light font-mono">
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted break-words leading-relaxed">{entry.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
