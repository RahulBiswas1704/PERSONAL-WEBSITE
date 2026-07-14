"use client";

import { useState, useEffect } from "react";
import type { GuestbookEntry } from "../../api/guestbook/route";

export default function GuestbookAdminPage() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries();
    }
  }, [isAuthenticated]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (Array.isArray(data)) {
        setEntries(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Rahul.1704#') {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleReply = async (id: string) => {
    const text = replyText[id];
    if (!text) return;

    try {
      const res = await fetch('/api/guestbook', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, adminReply: text, password })
      });

      if (res.ok) {
        // Update local state
        setEntries(entries.map(e => e.id === id ? { ...e, adminReply: text } : e));
        setReplyText(prev => ({ ...prev, [id]: "" }));
        alert("Reply posted successfully!");
      } else {
        alert("Failed to post reply.");
      }
    } catch (e) {
      console.error(e);
      alert("Error posting reply.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-2xl shadow-xl max-w-sm w-full space-y-4">
          <h1 className="text-2xl font-black text-center mb-6">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black font-mono focus:border-accent outline-none"
          />
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <button type="submit" className="w-full py-3 bg-accent text-white font-bold rounded-lg hover:opacity-90">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Guestbook Admin</h1>
          <p className="text-neutral-500 mt-2 font-mono">Manage entries and reply to visitors.</p>
        </div>
        <button onClick={() => { setIsAuthenticated(false); setPassword(""); }} className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg text-sm font-bold">Logout</button>
      </div>

      {loading ? (
        <p className="text-center font-mono">Loading entries...</p>
      ) : (
        <div className="space-y-6">
          {entries.map(entry => (
            <div key={entry.id} className="p-6 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{entry.name || 'Anonymous'}</h3>
                  <p className="text-sm font-mono text-neutral-500">{new Date(entry.timestamp).toLocaleString()}</p>
                </div>
                {entry.contactInfo && (
                  <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 rounded-lg text-sm font-mono font-bold border border-amber-200 dark:border-amber-800">
                    Contact: {entry.contactInfo}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-neutral-50 dark:bg-black rounded-xl mb-6">
                <p className="font-medium whitespace-pre-wrap">{entry.message}</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">Admin Reply</p>
                {entry.adminReply && (
                  <div className="p-3 bg-accent/10 border-l-4 border-accent rounded-r-lg mb-3">
                    <p className="italic font-serif text-sm">"{entry.adminReply}"</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Write a public reply..."
                    value={replyText[entry.id] || ""}
                    onChange={(e) => setReplyText({ ...replyText, [entry.id]: e.target.value })}
                    className="flex-1 px-4 py-2 bg-white dark:bg-black border-2 border-neutral-300 dark:border-neutral-700 rounded-lg font-mono text-sm focus:border-accent outline-none"
                  />
                  <button
                    onClick={() => handleReply(entry.id)}
                    disabled={!replyText[entry.id]}
                    className="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm rounded-lg hover:opacity-90 disabled:opacity-50"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
