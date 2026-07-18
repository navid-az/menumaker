// The public URL of the Next.js app — used for shareable URLs, QR codes, emails, etc.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";

// Browser-facing — client components, goes through Nginx
export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api`;

// Container-facing — Server Components, Server Actions, Route Handlers
export const SERVER_API_BASE_URL = `${
  process.env.API_URL ?? "http://backend:8000"
}/api`;

// Media files — Nginx serves /media/ directly, so same origin
export const MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL ?? "http://backend:8000";

// Decide websocket protocol
export function getWsUrl(path: string): string {
  if (typeof window === "undefined") return "";

  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_WS_URL}${path}`;
  }

  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  return `${protocol}://${window.location.host}${path}`;
}
