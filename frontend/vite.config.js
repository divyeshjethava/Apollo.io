import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }, // 👈 Close the resolve block here

  // 👇 Move 'server' out here (make it a sibling of 'resolve')
  server: {
    allowedHosts: [
      "nondistortedly-endoblastic-fred.ngrok-free.dev"
    ],
  },
});