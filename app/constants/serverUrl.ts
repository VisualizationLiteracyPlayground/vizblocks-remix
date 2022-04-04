export const SERVER_URL = !process.env.VERCEL_URL
  ? process.env.LOCAL_SERVER_URL ?? 'http://localhost:3000'
  : `https://${process.env.VERCEL_URL}`
