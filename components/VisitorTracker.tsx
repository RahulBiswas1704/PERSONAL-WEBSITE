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
      .catch(() => ({}))
      .then(async (data) => {
        const payload: any = {
          country: data.country_name || 'Unknown Country',
          city: data.city || 'Unknown City',
          sessionId,
          referrer: document.referrer || 'Direct',
          screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
          language: typeof navigator !== 'undefined' ? navigator.language : 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          connectionType: (navigator as any).connection?.effectiveType || 'Unknown',
          path: typeof window !== 'undefined' ? window.location.pathname : 'Unknown',
          cpuCores: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined,
          ramGb: typeof navigator !== 'undefined' ? (navigator as any).deviceMemory : undefined,
          isTouch: typeof window !== 'undefined' ? ('ontouchstart' in window || navigator.maxTouchPoints > 0) : undefined,
          theme: typeof window !== 'undefined' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : undefined,
          loadTimeMs: typeof performance !== 'undefined' ? Math.round(performance.now()) : undefined,
          utmSource: typeof URLSearchParams !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') || undefined : undefined,
          utmCampaign: typeof URLSearchParams !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_campaign') || undefined : undefined
        };

        // Attempt to bypass Android User-Agent "K" masking using User-Agent Client Hints API
        if (typeof navigator !== 'undefined' && (navigator as any).userAgentData) {
          try {
            const uaData = await (navigator as any).userAgentData.getHighEntropyValues(['model']);
            if (uaData.model) {
              payload.deviceModel = uaData.model;
            }
          } catch (e) {
            // ignore
          }
        }
        
        if (typeof navigator !== 'undefined' && (navigator as any).getBattery) {
          try {
            const b = await (navigator as any).getBattery();
            payload.battery = `${Math.round(b.level * 100)}% ${b.charging ? '(Charging)' : ''}`;
          } catch (e) {
            // ignore
          }
        }
        
        sendPayload(payload);

        function sendPayload(finalPayload: any) {
          fetch('/api/analytics/visit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalPayload)
          }).catch(console.error);
        }
      })
      .catch(() => {
        // If location fetch fails (e.g. adblocker), still log the visit
        const payload = {
          sessionId,
          referrer: document.referrer || 'Direct',
          screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'Unknown',
          language: typeof navigator !== 'undefined' ? navigator.language : 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          connectionType: (navigator as any).connection?.effectiveType || 'Unknown',
          path: typeof window !== 'undefined' ? window.location.pathname : 'Unknown',
          cpuCores: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined,
          ramGb: typeof navigator !== 'undefined' ? (navigator as any).deviceMemory : undefined,
          isTouch: typeof window !== 'undefined' ? ('ontouchstart' in window || navigator.maxTouchPoints > 0) : undefined,
          theme: typeof window !== 'undefined' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : undefined,
          loadTimeMs: typeof performance !== 'undefined' ? Math.round(performance.now()) : undefined,
          utmSource: typeof URLSearchParams !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') || undefined : undefined,
          utmCampaign: typeof URLSearchParams !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_campaign') || undefined : undefined
        };

        fetch('/api/analytics/visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(console.error);
      });
  }, [isInsights]);

  // Time on site & Scroll depth tracking
  useEffect(() => {
    if (isInsights) return;

    sessionStartTime.current = Date.now();
    let maxScroll = 0;

    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        maxScroll = 100;
        return;
      }
      const scrollPercent = Math.min(100, Math.max(0, Math.round((window.scrollY / docHeight) * 100)));
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }
    };

    // Calculate initial scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const sendPing = () => {
      if (!sessionStartTime.current) return;
      const sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) return;

      const durationInSeconds = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      
      // Only ping if they've been here at least a few seconds
      if (durationInSeconds < 2) return;

      const payload = JSON.stringify({ sessionId, duration: durationInSeconds, maxScrollDepth: maxScroll });
      
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

    // Global Click Tracker
    const handleClick = (e: MouseEvent) => {
      if (isInsights) return; // Don't track clicks on the insights page
      const target = e.target as HTMLElement;
      
      // Calculate X/Y as percentage to be responsive across devices
      const xPercent = Math.round((e.clientX / window.innerWidth) * 100);
      const yPercent = Math.round((e.clientY / window.innerHeight) * 100);

      const payload = {
        sessionId: sessionStorage.getItem('sessionId') || 'anonymous',
        tagName: target.tagName,
        text: target.innerText ? target.innerText.substring(0, 50) : undefined,
        x: xPercent,
        y: yPercent,
        platform: typeof navigator !== 'undefined' && /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      };

      fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    };

    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', sendPing);
      window.removeEventListener('click', handleClick);
      // Send a final ping when unmounting (e.g. navigating to /insights)
      sendPing();
    };
  }, [isInsights]);

  return null; // This component renders nothing
}
