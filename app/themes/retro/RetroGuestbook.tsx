import GuestbookClient from "@/app/guestbook/GuestbookClient";
import DoNotTapButton from "@/components/DoNotTapButton";
import { Terminal, MessageSquare } from "lucide-react";

export default function RetroGuestbook() {
  return (
    <div className="space-y-16 pb-10 font-mono text-pink-500 selection:bg-pink-500 selection:text-black">
      
      {/* Header */}
      <div className="border-4 border-pink-500 p-8 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] bg-black">
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-widest">
            GUESTBOOK.DAT
          </h1>
        </div>
        <p className="text-lg uppercase opacity-80 border-t-2 border-pink-500/50 pt-4 mt-4 leading-relaxed">
          &gt; Leave a message on the server...
          <br />
          &gt; Connection established. Write permission granted.
        </p>
      </div>
      
      <div className="border-4 border-pink-500 p-6 bg-black shadow-[8px_8px_0px_0px_rgba(236,72,153,1)]">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-pink-500 pb-4">
          <MessageSquare className="w-6 h-6" />
          <h2 className="text-xl uppercase font-bold tracking-widest">Input Stream</h2>
        </div>
        <div className="retro-guestbook-container">
          <GuestbookClient />
        </div>
      </div>

      <div className="pt-20 flex justify-center">
        {/* Global "DO NOT TAP" Button - the button component handles its own styling but we center it here */}
        <div className="border-4 border-red-500 p-4 bg-black inline-block shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
          <DoNotTapButton />
        </div>
      </div>
      
      {/* Global CSS for retro guestbook text overrides to fit the pink theme if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .retro-guestbook-container input,
        .retro-guestbook-container textarea,
        .retro-guestbook-container button {
          font-family: inherit;
        }
      `}} />
    </div>
  );
}
