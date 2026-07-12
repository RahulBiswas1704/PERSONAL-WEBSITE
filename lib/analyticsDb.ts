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
}

export interface ClickRecord {
  id: string;
  timestamp: string;
  platform: string;
  url: string;
}

interface AnalyticsData {
  visits: VisitRecord[];
  clicks: ClickRecord[];
}

export const getAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    // Vercel KV lists. We use lrange to get all elements (0 to -1)
    // The data comes back sorted from newest (index 0) to oldest because we use lpush
    const visits = await kv.lrange<VisitRecord>('analytics:visits', 0, -1);
    const clicks = await kv.lrange<ClickRecord>('analytics:clicks', 0, -1);
    
    return {
      visits: visits || [],
      clicks: clicks || []
    };
  } catch (error) {
    console.error("KV fetch error (Check if KV_REST_API_URL and KV_REST_API_TOKEN are set):", error);
    return { visits: [], clicks: [] };
  }
};

export const saveVisit = async (visit: VisitRecord) => {
  try {
    // Push new visits to the head of the list
    await kv.lpush('analytics:visits', visit);
  } catch (error) {
    console.error("KV saveVisit error:", error);
  }
};

export const saveClick = async (click: ClickRecord) => {
  try {
    await kv.lpush('analytics:clicks', click);
  } catch (error) {
    console.error("KV saveClick error:", error);
  }
};

export const updateSessionDuration = async (sessionId: string, duration: number) => {
  try {
    await kv.hset('analytics:durations', { [sessionId]: duration });
  } catch (error) {
    console.error("KV updateSessionDuration error:", error);
  }
};

export const getSessionDurations = async (): Promise<SessionDuration> => {
  try {
    const durations = await kv.hgetall<SessionDuration>('analytics:durations');
    return durations || {};
  } catch (error) {
    console.error("KV getSessionDurations error:", error);
    return {};
  }
};
