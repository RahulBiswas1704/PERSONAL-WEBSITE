"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();
  const isInsights = pathname.startsWith('/insights');
  
  const tracked = useRef(false);
  const sessionStartTime = useRef<number | null>(null);

  useEffect(() => {
    if (isInsights) return;

    // Only track once per browser session to avoid duplicate hits on navigation
    // Note: Using 'visited_v2' to force a fresh visit log for the new analytics fields
    if (tracked.current || sessionStorage.getItem('visited_v2')) {
      // If already visited, just make sure we have a session ID and tracking setup
      if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', crypto.randomUUID());
      }
      return;
    }
    
    tracked.current = true;
    const sessionId = crypto.randomUUID();
    sessionStorage.setItem('visited_v2', 'true');
    sessionStorage.setItem('sessionId', sessionId);

    // Fetch location client-side as a fallback for local development
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const payload = {
          country: data.country_name || 'Unknown Country',
          city: data.city || 'Unknown City',
          sessionId,
          referrer: document.referrer || 'Direct',
          screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
          language: typeof navigator !== 'undefined' ? navigator.language : 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          connectionType: (navigator as any).connection?.effectiveType || 'Unknown'
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
        const payload = {
          sessionId,
          referrer: document.referrer || 'Direct',
          screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
          language: typeof navigator !== 'undefined' ? navigator.language : 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          connectionType: (navigator as any).connection?.effectiveType || 'Unknown'
        };

        fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(console.error);
      });
  }, [isInsights]);

  // Time on site tracking
  useEffect(() => {
    if (isInsights) return;

    sessionStartTime.current = Date.now();

    const sendPing = () => {
      if (!sessionStartTime.current) return;
      const sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) return;

      const durationInSeconds = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      
      // Only ping if they've been here at least a few seconds
      if (durationInSeconds < 2) return;

      const payload = JSON.stringify({ sessionId, duration: durationInSeconds });
      
      // Use sendBeacon for reliable delivery when page is unloading
      if (navigator.sendBeacon) {
        // Blob with text/plain is used because sendBeacon with application/json can be restricted by CORS
        const blob = new Blob([payload], { type: 'text/plain' });
        navigator.sendBeacon('/api/analytics/ping', blob);
      } else {
        // Fallback for older browsers
        fetch('/api/analytics/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    };

    // Send a heartbeat every 15 seconds (useful if visibilitychange doesn't fire on mobile kill)
    const interval = setInterval(sendPing, 15000);

    // Send on tab switch or close
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sendPing();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Fallback for page refresh/close
    window.addEventListener('beforeunload', sendPing);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', sendPing);
      // Send a final ping when unmounting (e.g. navigating to /insights)
      sendPing();
    };
  }, [isInsights]);

  return null; // This component renders nothing
}
