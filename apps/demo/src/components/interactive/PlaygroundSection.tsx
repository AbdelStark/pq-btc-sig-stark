"use client"

/**
 * Client-side wrapper for VerificationPlayground with next/dynamic.
 *
 * `ssr: false` is required to prevent WASM from running during SSR, and must
 * be used inside a Client Component — Next.js 15 enforces this. This thin
 * wrapper satisfies that requirement while keeping page.tsx as a RSC.
 */

import dynamic from "next/dynamic"

const VerificationPlaygroundDynamic = dynamic(
  () =>
    import("./VerificationPlayground").then((m) => m.VerificationPlayground),
  {
    ssr: false,
    loading: () => (
      <section id="verify" className="neo-section px-4 sm:px-6">
        <div className="neo-shell">
          <h2 className="neo-title text-[clamp(1.8rem,5vw,3.4rem)]">Verification Playground</h2>
          <div className="neo-card mt-8 h-48 animate-pulse" />
        </div>
      </section>
    ),
  },
)

export function PlaygroundSection() {
  return <VerificationPlaygroundDynamic />
}
