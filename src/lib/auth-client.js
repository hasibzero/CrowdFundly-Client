import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // The app's own origin. Override per-environment via NEXT_PUBLIC_BETTER_AUTH_URL
  // (e.g. your deployed client URL in production).
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});
