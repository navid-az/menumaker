// frontend/src/lib/config.tsx

// Browser-facing — used in any genuine fetch() inside 'use client' code
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Container-facing — used in Server Components, Server Actions, Route Handlers
export const SERVER_API_BASE_URL = process.env.API_URL || "http://backend:8000";

// Container-facing (consumed by next/image's optimizer)
export const MEDIA_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_URL || "http://backend:8000";
