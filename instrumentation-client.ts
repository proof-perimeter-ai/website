import posthog from "posthog-js";

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

if (!isLocalhost) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-05-30",
    loaded: (ph) => {
      ph.register({ environment: process.env.NEXT_PUBLIC_VERCEL_ENV });
    },
  });
}
