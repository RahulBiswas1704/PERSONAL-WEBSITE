'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application crashed:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative p-8 bg-card border-2 border-red-500/20 rounded-2xl ring-1 ring-white/10 flex flex-col items-center max-w-lg w-full shadow-2xl shadow-red-500/5">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong!
        </h2>
        <div className="bg-muted/50 p-4 rounded-lg w-full mb-8 overflow-x-auto text-left border border-border">
          <p className="text-sm font-mono text-red-400 break-words">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-muted-foreground mt-2 border-t border-border/50 pt-2">
              Digest: {error.digest}
            </p>
          )}
        </div>
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/20"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
