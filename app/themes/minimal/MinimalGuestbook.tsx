import GuestbookClient from "@/app/guestbook/GuestbookClient";
import DoNotTapButton from "@/components/DoNotTapButton";

export default function MinimalGuestbook() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-10 font-sans">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white">
          Guestbook
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
          Leave a message, tell a joke, or just say hi to whoever wanders here next.
        </p>
      </div>
      
      <div className="border-t border-indigo-100 dark:border-indigo-900/30 pt-12">
        <GuestbookClient />
      </div>

      <div className="pt-20">
        {/* Global "DO NOT TAP" Button */}
        <DoNotTapButton />
      </div>
    </div>
  );
}
