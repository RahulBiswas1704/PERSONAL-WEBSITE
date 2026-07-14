const { createClient } = require('@vercel/kv');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8');
const url = env.match(/KV_REST_API_URL="(.*?)"/)?.[1] || env.match(/KV_REST_API_URL=(.*?)\n/)?.[1];
const token = env.match(/KV_REST_API_TOKEN="(.*?)"/)?.[1] || env.match(/KV_REST_API_TOKEN=(.*?)\n/)?.[1];

const kv = createClient({
  url: url,
  token: token,
});

async function run() {
  const durations = await kv.hgetall('analytics:durations');
  console.log("Durations in KV:", durations);
}
run();
