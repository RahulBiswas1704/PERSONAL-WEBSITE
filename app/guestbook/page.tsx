import GuestbookClient from "./GuestbookClient";
import DoNotTapButton from "@/components/DoNotTapButton";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave a message.",
  alternates: {
    canonical: "/guestbook",
  },
};

import GuestbookThemeRouter from "@/components/GuestbookThemeRouter";

export default function GuestbookPage() {
  return <GuestbookThemeRouter />;
}
