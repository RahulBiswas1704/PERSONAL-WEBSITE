import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and gear I use daily.",
};

import UsesThemeRouter from "@/components/UsesThemeRouter";

export default function UsesPage() {
  return <UsesThemeRouter />;
}
