type PerformanceRow = { operation: string; steps: string; gas: string }

const PERFORMANCE_ROWS: readonly PerformanceRow[] = [
  { operation: "verify", steps: "63,177", gas: "~13.2M L2" },
  { operation: "verify_with_msg_point", steps: "26,301", gas: "~5.5M L2" },
  { operation: "hash_to_point", steps: "5,988", gas: "~1.3M L2" },
  { operation: "NTT-512", steps: "~15,000", gas: "~3.1M L2" },
]

export function PerformanceStats(): React.JSX.Element {
  return (
    <section id="performance-stats" className="neo-section px-4 sm:px-6">
      <div className="neo-shell">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="neo-title text-[clamp(1.75rem,5vw,3.3rem)]">Performance Stats</h2>
          <span className="neo-chip neo-chip-blue">Cairo Benchmarks</span>
        </div>
        <div className="neo-table-wrap mt-8">
          <table className="neo-table text-left">
            <thead>
              <tr>
                <th scope="col">Operation</th>
                <th scope="col" className="text-right">
                  Steps
                </th>
                <th scope="col" className="text-right">
                  L2 Gas
                </th>
              </tr>
            </thead>
            <tbody>
              {PERFORMANCE_ROWS.map((row) => (
                <tr key={row.operation}>
                  <td className="neo-mono text-sm">{row.operation}</td>
                  <td className="text-right tabular-nums">{row.steps}</td>
                  <td className="text-right tabular-nums">{row.gas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="neo-card-soft mt-6 p-6">
          <h3 className="text-xl font-bold uppercase tracking-[0.03em]">Calldata Efficiency</h3>
          <p className="mt-3 text-sm leading-relaxed">
            Packing reduces calldata by <span className="font-black">17x</span>, from about{" "}
            <span className="neo-mono font-semibold">1,030 felts</span> to{" "}
            <span className="neo-mono font-semibold">62 felts</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
