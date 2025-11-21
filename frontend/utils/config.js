// Base URL for the FastAPI Backend.
// This now prioritizes the Environment Variable (set on Vercel) 
// and falls back to the local address for local development.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';