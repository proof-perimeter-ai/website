import { GET_STARTED_EVENT } from "@/lib/analytics";

const DEFAULT_APP_URL = "https://app.proofperimeter.com";

export const APP_CTA_HREF = process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_APP_URL;
export const APP_CTA_LABEL = "Get Started for Free";
export const APP_CTA_EVENT = GET_STARTED_EVENT;
