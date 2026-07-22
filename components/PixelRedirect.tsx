"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PixelRedirect({ hash }: { hash: string }) {
  const router = useRouter();
  
  useEffect(() => {
    router.replace(`/${hash}`);
  }, [hash, router]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white flex items-center justify-center font-black uppercase text-4xl">
      Redirecting...
    </div>
  );
}
