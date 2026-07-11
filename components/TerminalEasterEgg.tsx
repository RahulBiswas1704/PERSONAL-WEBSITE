"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minus } from "lucide-react";

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Welcome to rahul-os v1.0.0.' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal with ` (backtick) or Ctrl+K
      if (e.key === '`' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }, [isOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input' as const, text: `guest@rahul-os:~$ ${input}` }];
    
    let response = "";
    switch (cmd) {
      case "help":
        response = "Available commands:\n- whoami: Find out who you are\n- about: Learn about Rahul\n- contact: Get in touch\n- sudo rm -rf /: Execute root commands\n- clear: Clear terminal";
        break;
      case "whoami":
        response = "You are an awesome visitor exploring my digital garden.";
        break;
      case "about":
        response = "Rahul is a self-taught full-stack developer and aspiring founder from West Bengal.";
        break;
      case "contact":
        response = "Email me at rahul.biswas1704@gmail.com";
        break;
      case "sudo rm -rf /":
        response = "Nice try. I am not running this on root :)";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
    }

    response.split('\n').forEach(line => {
      newHistory.push({ type: 'output', text: line });
    });

    setHistory(newHistory);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 w-[90vw] sm:w-[450px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-[100] overflow-hidden flex flex-col font-mono text-sm animate-fade-in-up">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-400">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-xs font-bold tracking-widest text-zinc-300">RAHUL-OS</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <button className="text-zinc-500 hover:text-white transition-colors hidden sm:block">
            <Maximize2 className="w-3 h-3" />
          </button>
          <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-[300px] overflow-y-auto text-zinc-300 flex flex-col gap-1.5" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-emerald-400 font-bold' : 'text-zinc-300'} whitespace-pre-wrap`}>
            {line.text}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center mt-2">
          <span className="text-emerald-400 font-bold mr-2">guest@rahul-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-zinc-300"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
