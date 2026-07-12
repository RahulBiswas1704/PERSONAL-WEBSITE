"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minus } from "lucide-react";

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'system', text: string }[]>([
    { type: 'system', text: 'INITIALIZING RAHUL-OS v9.9.9 [BETA]' },
    { type: 'system', text: 'WARNING: Unstable neural pathways detected.' },
    { type: 'output', text: 'Type "help" to see available commands, or just smash your keyboard.' }
  ]);
  const [isDancing, setIsDancing] = useState(false);
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
        response = "Available commands:\n- whoami: Find out who you are\n- about: Learn about Rahul\n- contact: Get in touch\n- hack: Initiate global mainframe takeover\n- pizza: Order food\n- dance: Party mode\n- sudo: Execute root commands\n- clear: Clear terminal";
        break;
      case "whoami":
        response = "You are an anonymous entity browsing this site. Are you human? Prove it by buying me a coffee.";
        break;
      case "about":
        response = "Rahul: Full-stack developer, bug creator, and aspiring AI overlord.";
        break;
      case "contact":
        response = "Send digital pigeons to: rahul.biswas1704@gmail.com";
        break;
      case "sudo":
      case "sudo rm -rf /":
        response = "FATAL: User is not in the sudoers file. This incident has been reported to Santa Claus.";
        break;
      case "hack":
        response = "Initiating hack...\nBypassing firewall...\nAccessing mainframe...\nWAIT, THIS IS MY OWN WEBSITE. ABORTING!";
        break;
      case "pizza":
        response = "Error: Domino's API key missing. You'll have to cook tonight.";
        break;
      case "dance":
        response = "UNCE UNCE UNCE! Turning on party mode...";
        setIsDancing(true);
        setTimeout(() => setIsDancing(false), 5000); // stops after 5s
        break;
      case "matrix":
        response = "Wake up, Neo...\nThe matrix has you...\nFollow the white rabbit.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `Command not found: '${cmd}'. Don't make up words. Type "help".`;
    }

    response.split('\n').forEach(line => {
      newHistory.push({ type: 'output', text: line });
    });

    setHistory(newHistory);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-20 right-4 sm:bottom-8 sm:right-8 w-[90vw] sm:w-[500px] bg-black border-2 border-emerald-900 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] z-[100] overflow-hidden flex flex-col font-mono text-sm animate-fade-in-up ${isDancing ? 'animate-bounce' : ''}`}>
      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-emerald-900/50">
        <div className="flex items-center gap-2 text-emerald-500">
          <TerminalIcon className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-emerald-400 drop-shadow-[0_0_2px_rgba(52,211,153,0.8)]">RAHUL-OS TERMINAL</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsOpen(false)} className="text-emerald-900 hover:text-emerald-400 transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <button onClick={() => setIsOpen(false)} className="text-emerald-900 hover:text-red-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-[350px] overflow-y-auto text-emerald-400 flex flex-col gap-1.5 relative z-10" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            line.type === 'input' ? 'text-white font-bold' : 
            line.type === 'system' ? 'text-red-400 font-bold tracking-wider' : 'text-emerald-400'
          } drop-shadow-[0_0_2px_rgba(52,211,153,0.4)]`}>
            {line.text}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center mt-2 group">
          <span className="text-emerald-400 font-bold mr-2 drop-shadow-[0_0_2px_rgba(52,211,153,0.8)]">guest@rahul-os:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-white font-bold tracking-wide"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
