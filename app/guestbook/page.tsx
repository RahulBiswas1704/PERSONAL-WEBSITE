import GuestbookClient from "./GuestbookClient";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave a message.",
};

export default function GuestbookPage() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-10">
      {/* Title block */}
      <div className="relative pt-8">
        <div className="absolute top-0 -right-10 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        
        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-fuchsia-950 dark:text-fuchsia-50 relative z-10 transform -rotate-2 hover:rotate-1 transition-transform duration-500 w-fit">
          GUESTBOOK
        </h1>
        
        <div className="absolute top-16 sm:top-20 left-48 sm:left-64 transform rotate-6 bg-accent text-white px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:-rotate-3 transition-transform duration-300">
          Sign It!
        </div>
        
        <p className="text-lg sm:text-xl text-fuchsia-900 dark:text-fuchsia-100 mt-8 max-w-xl relative z-10 font-serif italic leading-relaxed">
          &quot;Leave a message, tell a joke, or just say hi to whoever wanders here next.&quot;
        </p>
      </div>
      
      <GuestbookClient />
    </div>
  );
}
