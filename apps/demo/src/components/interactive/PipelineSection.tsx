"use client"

/**
 * Client-side wrapper for PipelineVisualizer with next/dynamic.
 *
 * Mirrors PlaygroundSection pattern: `ssr: false` prevents atom
 * hydration mismatch while keeping page.tsx as a RSC.
 */

import dynamic from "next/dynamic"

const PipelineVisualizerDynamic = dynamic(
  () =>
    import("./PipelineVisualizer").then((m) => m.PipelineVisualizer),
  {
    ssr: false,
    loading: () => (
      <section id="pipeline" className="neo-section px-4 sm:px-6">
        <div className="neo-shell">
          <h2 className="neo-title text-[clamp(1.8rem,5vw,3.4rem)]">Verification Pipeline</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="neo-card h-32 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    ),
  },
)

export function PipelineSection() {
  return <PipelineVisualizerDynamic />
}
