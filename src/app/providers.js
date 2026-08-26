"use client";

import { HeroUIProvider } from "@heroui/system";
import axios from 'axios';

// Ensure all cross-origin requests send cookies
if (typeof window !== 'undefined') {
  axios.defaults.withCredentials = true;
}

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
