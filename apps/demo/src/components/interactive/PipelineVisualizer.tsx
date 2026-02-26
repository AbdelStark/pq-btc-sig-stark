"use client"

/**
 * PipelineVisualizer — step-through of the 6-stage Falcon-512 verification.
 *
 * Shows the on-chain verification pipeline with play/pause/step/reset
 * controls. Each step card shows name, description, step count, and
 * expands to show input/output when active.
 *
 * All state lives in atoms (pipelineStepsAtom, pipelineActiveStepAtom,
 * pipelinePlayingAtom) — no local useState.
 */

import React, { useCallback, useEffect, useRef } from "react"
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import {
  pipelineStepsAtom,
  pipelineActiveStepAtom,
  pipelinePlayingAtom,
  INITIAL_PIPELINE_STEPS,
} from "@/atoms/pipeline"
import type { PipelineStep } from "@/services/types"

const TOTAL_STEPS = INITIAL_PIPELINE_STEPS.reduce(
  (sum, s) => sum + s.stepCount,
  0,
)

export function PipelineVisualizer(): React.JSX.Element {
  const steps = useAtomValue(pipelineStepsAtom)
  const activeStep = useAtomValue(pipelineActiveStepAtom)
  const playing = useAtomValue(pipelinePlayingAtom)

  const setSteps = useAtomSet(pipelineStepsAtom)
  const setActiveStep = useAtomSet(pipelineActiveStepAtom)
  const setPlaying = useAtomSet(pipelinePlayingAtom)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Auto-advance logic ──────────────────────────────────────────────
  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => {
        const next = prev + 1
        if (next >= steps.length) {
          setPlaying(false)
          setSteps((s) =>
            s.map((step, i) =>
              i === prev ? { ...step, status: "complete" as const } : step,
            ),
          )
          return prev
        }
        setSteps((s) =>
          s.map((step, i) => {
            if (i === prev) return { ...step, status: "complete" as const }
            if (i === next) return { ...step, status: "active" as const }
            return step
          }),
        )
        return next
      })
    }, 2000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [playing, steps.length, setActiveStep, setSteps, setPlaying])

  // ── Handlers ────────────────────────────────────────────────────────
  const handlePlay = useCallback(() => {
    if (activeStep === -1) {
      setSteps((s) =>
        s.map((step, i) =>
          i === 0
            ? { ...step, status: "active" as const }
            : { ...step, status: "pending" as const },
        ),
      )
      setActiveStep(0)
    }
    setPlaying(true)
  }, [activeStep, setSteps, setActiveStep, setPlaying])

  const handlePause = useCallback(() => {
    setPlaying(false)
  }, [setPlaying])

  const handleStep = useCallback(() => {
    setPlaying(false)
    setActiveStep((prev) => {
      const next = prev + 1
      if (next >= steps.length) {
        setSteps((s) =>
          s.map((step, i) =>
            i === prev ? { ...step, status: "complete" as const } : step,
          ),
        )
        return prev
      }
      if (prev === -1) {
        setSteps((s) =>
          s.map((step, i) =>
            i === 0
              ? { ...step, status: "active" as const }
              : { ...step, status: "pending" as const },
          ),
        )
        return 0
      }
      setSteps((s) =>
        s.map((step, i) => {
          if (i === prev) return { ...step, status: "complete" as const }
          if (i === next) return { ...step, status: "active" as const }
          return step
        }),
      )
      return next
    })
  }, [steps.length, setActiveStep, setSteps, setPlaying])

  const handleReset = useCallback(() => {
    setPlaying(false)
    setActiveStep(-1)
    setSteps(INITIAL_PIPELINE_STEPS)
  }, [setPlaying, setActiveStep, setSteps])

  const allComplete = steps.every((s) => s.status === "complete")

  return (
    <section id="pipeline" className="neo-section px-4 sm:px-6">
      <div className="neo-shell">
        {/* Header */}
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 className="neo-title text-[clamp(1.8rem,5vw,3.4rem)]">Verification Pipeline</h2>
            <p className="neo-subtitle mt-0 max-w-2xl">
              Step through the 6-stage Falcon-512 on-chain verification
            </p>
          </div>
          <span className="neo-chip neo-chip-blue neo-mono text-xs">
            ~{TOTAL_STEPS.toLocaleString()} total steps
          </span>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap gap-3">
          {!playing ? (
            <button
              onClick={handlePlay}
              disabled={allComplete}
              aria-label="Play pipeline animation"
              className="neo-button neo-button-primary px-4 py-2"
            >
              Play
            </button>
          ) : (
            <button
              onClick={handlePause}
              aria-label="Pause pipeline animation"
              className="neo-button neo-button-primary px-4 py-2"
            >
              Pause
            </button>
          )}
          <button
            onClick={handleStep}
            disabled={playing || allComplete}
            aria-label="Advance one pipeline step"
            className="neo-button neo-button-neutral px-4 py-2"
          >
            Step
          </button>
          <button
            onClick={handleReset}
            aria-label="Reset pipeline to beginning"
            className="neo-button neo-button-neutral px-4 py-2"
          >
            Reset
          </button>
        </div>

        {/* Pipeline step cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <PipelineStepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Step Card ────────────────────────────────────────────────────────────────

function PipelineStepCard({ step }: { step: PipelineStep }): React.JSX.Element {
  const isActive = step.status === "active"
  const isComplete = step.status === "complete"
  const statusClass = isActive
    ? "neo-step-active"
    : isComplete
      ? "neo-step-complete"
      : "neo-step-pending"

  return (
    <div className={`neo-card p-5 ${statusClass}`}>
      <div className="flex items-center gap-2">
        <span className="text-base">
          {isComplete ? (
            <span className="font-black">&#10003;</span>
          ) : isActive ? (
            <span className="inline-block h-2.5 w-2.5 animate-pulse bg-black" />
          ) : (
            <span className="inline-block h-2.5 w-2.5 bg-black/40" />
          )}
        </span>
        <h3 className="neo-mono text-sm font-semibold uppercase">{step.name}</h3>
        <span className="neo-mono ml-auto text-xs">
          ~{step.stepCount.toLocaleString()}
        </span>
      </div>

      <p className="mt-2 text-xs leading-relaxed">{step.description}</p>

      {isActive && (
        <div className="mt-3 space-y-1 border-t-2 border-black pt-3">
          <div className="text-xs">
            <span className="font-semibold uppercase tracking-[0.05em]">In: </span>
            <span className="neo-mono">{step.input}</span>
          </div>
          <div className="text-xs">
            <span className="font-semibold uppercase tracking-[0.05em]">Out: </span>
            <span className="neo-mono">{step.output}</span>
          </div>
        </div>
      )}
    </div>
  )
}
