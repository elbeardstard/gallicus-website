"use client";

// Thin client wrapper for the scroll-to-top button in the footer
export default function ScrollToTopButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="font-heading text-sm uppercase tracking-wider text-background/40 hover:text-turquoise transition-colors flex items-center gap-2"
    >
      {label}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
