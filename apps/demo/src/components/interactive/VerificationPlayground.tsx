"use client"

import React from "react"
import { KeyManagementPanel } from "./KeyManagementPanel"
import { SignVerifyPanel } from "./SignVerifyPanel"

export function VerificationPlayground(): React.JSX.Element {
  return (
    <section id="verify" className="neo-section px-4 sm:px-6">
      <div className="neo-shell">
        <h2 className="neo-title text-[clamp(1.8rem,5vw,3.5rem)]">Verification Playground</h2>
        <p className="neo-subtitle">
          Generate a Falcon-512 keypair in-browser via WASM, sign a message,
          and verify the signature. All crypto runs locally — no server
          involvement.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="neo-card p-6">
            <KeyManagementPanel />
          </div>
          <div className="neo-card p-6">
            <SignVerifyPanel />
          </div>
        </div>
      </div>
    </section>
  )
}
