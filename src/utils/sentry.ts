import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_ENVIRONMENT != "development") {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT,
    release: import.meta.env.VITE_VER,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false
      })
    ],
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0
  });
}
