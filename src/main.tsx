// react-dom 패치를 가장 먼저 로드 (react-quill이 로드되기 전에)
import "./react-dom-patch";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// 개발 환경에서 Sentry 오류 필터링
if (import.meta.env.DEV) {
  // 콘솔 오류 필터링
  const originalError = console.error;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || "";
    // Sentry 관련 오류는 무시
    if (
      message.toLowerCase().includes("sentry") ||
      (message.includes("429") && message.includes("Too Many Requests"))
    ) {
      return;
    }
    originalError.apply(console, args);
  };

  // 네트워크 오류 필터링 (fetch 오류)
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      // Sentry 관련 429 오류는 조용히 처리
      if (response.status === 429 && args[0]?.toString().includes("sentry")) {
        return new Response(null, { status: 200, statusText: "OK" });
      }
      return response;
    } catch (error) {
      // Sentry 관련 네트워크 오류는 무시
      if (args[0]?.toString().includes("sentry")) {
        return new Response(null, { status: 200, statusText: "OK" });
      }
      throw error;
    }
  };
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
