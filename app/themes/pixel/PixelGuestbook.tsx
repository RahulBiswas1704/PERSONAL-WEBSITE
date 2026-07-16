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
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        
        <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-black dark:border-white pb-8 gap-8">
          <div>
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-8 break-all sm:break-normal">
              GUEST<br/>BOOK
            </h1>
            <p className="text-xl md:text-3xl font-bold max-w-2xl uppercase">
              Leave a mark.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          <div className="md:col-span-5 space-y-12">
            <div className="sticky top-24 border-4 border-black dark:border-white bg-white dark:bg-black p-8">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 border-b-2 border-black dark:border-white pb-4">
                Sign Here
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xl font-bold uppercase mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="JOHN DOE (OPTIONAL)" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-2 border-black dark:border-white p-4 text-xl font-bold uppercase placeholder:opacity-30 focus:outline-none focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xl font-bold uppercase mb-2">Message</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="YOUR MESSAGE..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-2 border-black dark:border-white p-4 text-xl font-bold uppercase placeholder:opacity-30 focus:outline-none focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black transition-colors resize-none"
                  />
                </div>
                <button type="submit" disabled={isSubmitting || !message.trim()} className="w-full bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white p-4 text-2xl font-black uppercase hover:bg-transparent hover:text-black dark:hover:text-white transition-colors flex items-center justify-between group disabled:opacity-50">
                  Submit <Send className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-7 space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter border-b-4 border-black dark:border-white pb-4">
              Entries
            </h2>
            
            <div className="space-y-12">
              {loading ? (
                <p className="text-2xl font-bold uppercase">LOADING...</p>
              ) : entries.length === 0 ? (
                <p className="text-2xl font-bold uppercase">NO ENTRIES YET.</p>
              ) : (
                entries.map((entry, i) => (
                  <div key={entry.id} className="group border-t-2 border-black dark:border-white pt-8 relative">
                    {i === 0 && <div className="absolute -top-4 right-0 bg-black text-white dark:bg-white dark:text-black font-black uppercase px-4 py-1 text-xl rotate-3">New</div>}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter">{entry.name || "Anonymous"}</h3>
                        <p className="text-lg font-bold uppercase opacity-50">{new Date(entry.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-2xl font-bold uppercase leading-snug break-words">
                      {entry.message}
                    </p>
                    {entry.adminReply && (
                      <div className="mt-8 border-l-4 border-black dark:border-white pl-4 ml-4">
                        <span className="text-xl font-black uppercase tracking-tighter block mb-2">Rahul Replied:</span>
                        <p className="text-xl font-bold uppercase italic leading-snug">"{entry.adminReply}"</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
          </div>

        </div>

      </div>
    </div>
  );
}
