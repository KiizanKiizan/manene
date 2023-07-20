import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.3,
    environment: process.env.NODE_ENV,
  });
}
