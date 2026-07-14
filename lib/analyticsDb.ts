import { kv } from '@vercel/kv';

export interface SessionDuration {
  [sessionId: string]: number;
}

export interface VisitRecord {
  id: string;
  timestamp: string;
  country: string;
  city: string;
  userAgent: string;
  device: 'mobile' | 'desktop' | 'unknown';
  os?: string;
  browser?: string;
  referrer?: string;
  screenResolution?: string;
  language?: string;
  timezone?: string;
  connectionType?: string;
  path?: string;
  deviceModel?: string;
  cpuCores?: number;
  ramGb?: number;
  battery?: string;
  isTouch?: boolean;
  theme?: 'dark' | 'light';
  loadTimeMs?: number;
  utmSource?: string;
  utmCampaign?: string;
}

export interface ClickRecord {
  id: string;
  timestamp: string;
  platform: string;
  url: string;
  tagName?: string;
  x?: number;
  y?: number;
}

export interface RoastRecord {
  id: string;
  timestamp: string;
  language: string;
  modelUsed: string;
  latencyMs: number;
}

export interface KishmishEventRecord {
  id: string;
  timestamp: string;
  eventType: 'poke' | 'idle_roast';
}

export interface ChatLogRecord {
  id: string;
  sessionId: string;
  timestamp: string;
  userMessage: string;
  kishmishResponse: string;
  emotion: string;
  language: string;
}

interface AnalyticsData {
  visits: VisitRecord[];
  clicks: ClickRecord[];
  roasts: RoastRecord[];
  events: KishmishEventRecord[];
  chats: ChatLogRecord[];
}

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return { visits: [], clicks: [], roasts: [], events: [], chats: [] };
  }
  try {
    // Vercel KV lists. We use lrange to get all elements (0 to -1)
    // The data comes back sorted from newest (index 0) to oldest because we use lpush
    const visits = await kv.lrange<VisitRecord>('analytics:visits', 0, -1);
    const clicks = await kv.lrange<ClickRecord>('analytics:clicks', 0, -1);
    const roasts = await kv.lrange<RoastRecord>('analytics:roasts', 0, -1);
    const events = await kv.lrange<KishmishEventRecord>('analytics:kishmish_events', 0, -1);
    const chats = await kv.lrange<ChatLogRecord>('analytics:chats', 0, -1);
    
    return {
      visits: visits || [],
      clicks: clicks || [],
      roasts: roasts || [],
      events: events || [],
      chats: chats || []
    };
  } catch (error) {
    console.error("KV fetch error (Check if KV_REST_API_URL and KV_REST_API_TOKEN are set):", error);
    return { visits: [], clicks: [], roasts: [], events: [], chats: [] };
  }
};

export const saveVisit = async (visit: VisitRecord) => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    // Push new visits to the head of the list
    await kv.lpush('analytics:visits', visit);
  } catch (error) {
    console.error("KV saveVisit error:", error);
  }
};

export const saveClick = async (click: ClickRecord) => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    await kv.lpush('analytics:clicks', click);
  } catch (error) {
    console.error("KV saveClick error:", error);
  }
};

export const updateSessionDuration = async (sessionId: string, duration: number) => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    const existing = await kv.hget<number>('analytics:durations', sessionId);
    if (!existing || duration > existing) {
      await kv.hset('analytics:durations', { [sessionId]: duration });
    }
  } catch (error) {
    console.error("KV updateSessionDuration error:", error);
  }
};

export const getSessionDurations = async (): Promise<SessionDuration> => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return {};
  try {
    const durations = await kv.hgetall<SessionDuration>('analytics:durations');
    return durations || {};
  } catch (error) {
    console.error("KV getSessionDurations error:", error);
    return {};
  }
};

export const updateSessionScrollDepth = async (sessionId: string, scrollDepth: number) => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    // Only update if the new depth is greater than the existing one, or if it doesn't exist
    const existing = await kv.hget<number>('analytics:scrolldepths', sessionId);
    if (!existing || scrollDepth > existing) {
      await kv.hset('analytics:scrolldepths', { [sessionId]: scrollDepth });
    }
  } catch (error) {
    console.error("KV updateSessionScrollDepth error:", error);
  }
};

export const getSessionScrollDepths = async (): Promise<Record<string, number>> => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return {};
  try {
    const depths = await kv.hgetall<Record<string, number>>('analytics:scrolldepths');
    return depths || {};
  } catch (error) {
    console.error("KV getSessionScrollDepths error:", error);
    return {};
  }
};
