'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-white/70 text-sm mb-4">{error?.message || 'Unexpected error loading this project.'}</p>
        <button onClick={reset} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/20">Try again</button>
      </div>
    </div>
  );
}

