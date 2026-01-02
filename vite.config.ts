import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "react-quill",
      "quill",
      "@xeger/quill-image-actions",
      "@xeger/quill-image-formats",
      "quill-image-resize-module-ts",
    ],
  },
});
