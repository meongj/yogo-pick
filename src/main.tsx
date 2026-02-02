import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";

// Sentry 초기화
Sentry.init({
  dsn: "https://54395abfc7b0463a4b3e3b716aa60892@o4510582782099456.ingest.us.sentry.io/4510582786621440",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // 성능 모니터링 샘플 레이트
  tracesSampleRate: 1.0,
  // 세션 리플레이 샘플 레이트
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const convexUrl = import.meta.env.VITE_CONVEX_URL;
if (!convexUrl) {
  throw new Error("VITE_CONVEX_URL 환경 변수가 설정되지 않았습니다.");
}
const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConvexAuthProvider>
  </StrictMode>
);
