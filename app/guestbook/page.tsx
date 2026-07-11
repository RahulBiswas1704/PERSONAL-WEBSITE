import GuestbookClient from "./GuestbookClient";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave a message.",
};

export default function GuestbookPage() {
  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <div className="flex flex-col gap-2 border-b border-border/60 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Guestbook
        </h1>
        <p className="text-sm sm:text-base text-muted">
          Leave a message, tell a joke, or just say hi.
        </p>
      </div>
      
      <GuestbookClient />
    </div>
  );
}
