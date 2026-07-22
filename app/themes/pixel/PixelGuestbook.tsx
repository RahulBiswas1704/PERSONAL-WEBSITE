"use client";

import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import type { GuestbookEntry } from "@/app/api/guestbook/route";

export default function PixelGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
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
        body: JSON.stringify({ name, message, contactInfo: "" }),
      });
      const newEntry = await res.json();
      if (!newEntry.error) {
        setEntries([newEntry, ...entries]);
        setMessage("");
        setName("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="guestbook">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        
        <header className="mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-black/20 dark:border-white/20 pb-8 gap-8">
          <div>
            <h1 className="text-6xl sm:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.9] mb-8 break-all sm:break-normal text-stroke-2 cursor-default">
              GUEST<br/>BOOK
            </h1>
            <p className="text-xl md:text-2xl font-bold max-w-sm uppercase opacity-80">
              Leave a mark.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5 space-y-12 relative">
            <div className="sticky top-32 border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 p-8">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-[-0.04em] mb-8 border-b border-black/20 dark:border-white/20 pb-4">
                Sign Here
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-black tracking-widest uppercase mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="JOHN DOE (OPTIONAL)" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-black/20 dark:border-white/20 p-4 text-base font-bold uppercase placeholder:opacity-30 focus:outline-none focus:border-[#CCFF00] dark:focus:border-[#CCFF00] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black tracking-widest uppercase mb-2">Message</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="YOUR MESSAGE..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border border-black/20 dark:border-white/20 p-4 text-base font-bold uppercase placeholder:opacity-30 focus:outline-none focus:border-[#CCFF00] dark:focus:border-[#CCFF00] transition-colors resize-none"
                  />
                </div>
                <button type="submit" disabled={isSubmitting || !message.trim()} className="w-full bg-transparent text-black dark:text-white border border-black dark:border-white p-4 text-xl font-black tracking-widest uppercase hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-colors flex items-center justify-between group disabled:opacity-50">
                  Submit <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12 mt-16 lg:mt-0">
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em] border-b border-black/20 dark:border-white/20 pb-4">
              Entries
            </h2>
            
            <div className="space-y-12">
              {loading ? (
                <p className="text-xl font-bold uppercase opacity-80">LOADING...</p>
              ) : entries.length === 0 ? (
                <p className="text-xl font-bold uppercase opacity-80">NO ENTRIES YET.</p>
              ) : (
                entries.map((entry, i) => (
                  <div key={entry.id} className="group border-t border-black/20 dark:border-white/20 pt-8 relative">
                    {i === 0 && <div className="absolute -top-4 right-0 bg-[#CCFF00] text-black font-black uppercase px-3 py-1 text-sm tracking-widest rotate-3">New</div>}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-[-0.04em] group-hover:text-[#CCFF00] transition-colors">{entry.name || "Anonymous"}</h3>
                        <p className="text-sm font-bold uppercase opacity-50 tracking-widest">{new Date(entry.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-lg sm:text-xl font-bold uppercase leading-snug break-words opacity-80">
                      {entry.message}
                    </p>
                    {entry.adminReply && (
                      <div className="mt-8 border-l-2 border-[#CCFF00] pl-4 ml-4">
                        <span className="text-sm font-black uppercase tracking-widest block mb-2 opacity-60">Rahul Replied:</span>
                        <p className="text-base sm:text-lg font-bold uppercase italic leading-snug text-[#CCFF00]">"{entry.adminReply}"</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
