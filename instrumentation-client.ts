import posthog from "posthog-js";

const isProductionVercel = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

if (isProductionVercel) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2026-05-30",
    loaded: (ph) => {
      ph.register({ environment: process.env.NEXT_PUBLIC_VERCEL_ENV });
    },
  });
}
