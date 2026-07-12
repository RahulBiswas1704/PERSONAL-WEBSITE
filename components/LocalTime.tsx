"use client";

import { useState, useEffect } from "react";

export function LocalTime({ timestamp, mobile = false }: { timestamp: string; mobile?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const date = new Date(timestamp);
  
  if (!mounted) {
    return (
      <span>
        -- <span className={`opacity-50 ${mobile ? 'mx-0.5' : 'mx-1'}`}>•</span> --
      </span>
    );
  }

  const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <span>
      {formattedDate} <span className={`opacity-50 ${mobile ? 'mx-0.5' : 'mx-1'}`}>•</span> {formattedTime}
    </span>
  );
}
