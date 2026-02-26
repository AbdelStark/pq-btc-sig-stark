export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-black px-4 pb-12 pt-4 sm:px-6">
      <div className="neo-shell neo-card flex flex-col items-center justify-between gap-4 px-5 py-5 text-sm sm:flex-row">
        <p className="font-semibold uppercase tracking-[0.04em]">Built for the Falcon-512 Starknet demo.</p>
        <nav aria-label="Footer links" className="flex items-center gap-4">
          <a
            href="https://github.com/feltroidprime/s2morrow"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="neo-link text-xs"
          >
            GitHub
          </a>
          <a
            href="https://docs.starknet.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read Starknet documentation"
            className="neo-link text-xs"
          >
            Starknet Docs
          </a>
        </nav>
      </div>
    </footer>
  )
}
