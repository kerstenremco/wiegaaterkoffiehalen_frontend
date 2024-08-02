import * as Sentry from "@sentry/react";

if (import.meta.env.VITE_SENTRY == "enable") {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_ENVIRONMENT,
    release: import.meta.env.PACKAGE_VERSION,
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
