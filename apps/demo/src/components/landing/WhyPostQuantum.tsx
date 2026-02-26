export function WhyPostQuantum() {
  return (
    <section id="why-post-quantum" className="neo-section px-4 sm:px-6">
      <div className="neo-shell">
        <h2 className="neo-title max-w-3xl text-[clamp(1.85rem,5.2vw,3.5rem)]">Why Post-Quantum?</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <Card
            title="Quantum Threat"
            description="Shor's algorithm on a cryptographically-relevant quantum computer breaks ECDSA. Every Ethereum and Starknet wallet using ECDSA becomes vulnerable."
          />
          <Card
            title="Account Abstraction"
            description="Starknet's native account abstraction lets wallets upgrade their signature verification logic without changing addresses. No hard fork needed."
          />
          <Card
            title="Falcon-512"
            description="NIST-standardized lattice-based signature scheme. 666-byte signatures, 896-byte public keys. Based on NTRU lattices with tight security proofs."
          />
          <Card
            title="Hint-Based Verification"
            description="Off-chain signer provides a precomputed hint, reducing on-chain work from 4 NTTs to 2 NTTs. Cuts verification cost by ~50%."
          />
        </div>
      </div>
    </section>
  )
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="neo-card rounded-xl bg-falcon-surface p-6">
      <h3 className="text-xl font-bold uppercase tracking-[0.03em]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
