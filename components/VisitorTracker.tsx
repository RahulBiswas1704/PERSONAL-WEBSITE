"use client";

import { useEffect, useRef } from "react";

export default function VisitorTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per browser session to avoid duplicate hits on navigation
    if (tracked.current || sessionStorage.getItem('visited')) return;
    
    tracked.current = true;
    sessionStorage.setItem('visited', 'true');

    // Fetch location client-side as a fallback for local development
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const payload = {
          country: data.country_name || 'Unknown Country',
          city: data.city || 'Unknown City'
        };
        
        // Fire-and-forget request to log the visit
        fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(console.error);
      })
      .catch(() => {
        // If location fetch fails (e.g. adblocker), still log the visit
        fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        }).catch(console.error);
      });
  }, []);

  return null; // This component renders nothing
}
