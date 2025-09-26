"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Unhandled application error", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary-50 px-6 py-12 text-center text-secondary-700">
      <div className="max-w-md space-y-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error-50 text-error-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-secondary-900">Something went wrong</h1>
          <p className="text-sm text-secondary-600">
            We hit an unexpected issue loading the page. Try refreshing or come back in a moment.
          </p>
          {error.digest && (
            <code className="block rounded-md bg-secondary-100 px-3 py-2 text-xs text-secondary-500">
              Reference ID: {error.digest}
            </code>
          )}
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-primary-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
