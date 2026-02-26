const HERO_STATS = [
  { value: "63K", label: "Steps" },
  { value: "62", label: "Calldata felts" },
  { value: "29", label: "Storage slots" },
] as const

export function Hero(): React.JSX.Element {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="neo-section px-4 sm:px-6">
      <div className="neo-shell">
        <div className="neo-card-accent neo-reveal px-6 py-8 sm:px-10 sm:py-11">
          <p className="neo-eyebrow">Falcon-512 Demo</p>
          <h1 id="hero-heading" className="neo-title max-w-4xl">
          Post-Quantum Signatures on Starknet
          </h1>
          <p className="neo-subtitle max-w-3xl">
            Verify Falcon signatures with production Cairo metrics and account abstraction deployment
            flows on Starknet Sepolia testnet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#verify"
              className="neo-button neo-button-neutral focus-visible:ring-2 focus-visible:ring-falcon-accent"
            >
              Try Verification
            </a>
            <a
              href="#deploy"
              className="neo-button neo-button-secondary focus-visible:ring-2 focus-visible:ring-falcon-accent"
            >
              Deploy Account
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="neo-kpi">
                <dt className="neo-kpi-label">{stat.label}</dt>
                <dd className="neo-kpi-value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
