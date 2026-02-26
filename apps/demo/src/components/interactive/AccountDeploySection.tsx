"use client"

import dynamic from "next/dynamic"

const AccountDeployFlowDynamic = dynamic(
  () => import("./AccountDeployFlow").then((module) => module.AccountDeployFlow),
  {
    ssr: false,
    loading: () => (
      <section id="deploy" className="neo-section px-4 sm:px-6">
        <div className="neo-shell">
          <h2 className="neo-title text-[clamp(1.8rem,5vw,3.4rem)]">Account Deploy Flow</h2>
          <div className="neo-card mt-8 h-64 animate-pulse" />
        </div>
      </section>
    ),
  },
)

export function AccountDeploySection(): React.JSX.Element {
  return <AccountDeployFlowDynamic />
}
