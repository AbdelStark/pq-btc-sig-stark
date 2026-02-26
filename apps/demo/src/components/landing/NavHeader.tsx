"use client"

import React, { useCallback, useEffect } from "react"
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import { networkAtom, NETWORK_STORAGE_KEY } from "@/atoms/starknet"
import { NETWORKS } from "@/config/networks"
import type { NetworkId } from "@/config/networks"

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#verify", label: "Verify" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#deploy", label: "Deploy" },
] as const

export function NavHeader(): React.JSX.Element {
  const networkId = useAtomValue(networkAtom)
  const setNetwork = useAtomSet(networkAtom)

  // Sync from localStorage after hydration (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(NETWORK_STORAGE_KEY)
      if (stored === "mainnet" || stored === "sepolia" || stored === "devnet") {
        setNetwork(stored)
      }
    } catch {
      // localStorage unavailable (e.g., private browsing restriction)
    }
  }, [setNetwork])

  const handleNetworkChange = useCallback(
    (id: NetworkId) => {
      setNetwork(id)
      try {
        localStorage.setItem(NETWORK_STORAGE_KEY, id)
      } catch {
        // localStorage unavailable
      }
    },
    [setNetwork],
  )

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <nav
        aria-label="Main navigation"
        className="neo-shell neo-card flex flex-wrap items-center gap-4 px-4 py-4 sm:px-6"
      >
        <a href="#hero" className="neo-chip neo-chip-pink">
          Falcon-512
        </a>
        <ul className="order-3 flex w-full flex-wrap items-center gap-3 sm:order-2 sm:w-auto sm:gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="neo-link text-xs">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="order-2 ml-auto flex items-center gap-2 sm:order-3"
          role="group"
          aria-label="Network selection"
        >
          {(["devnet", "sepolia", "mainnet"] as const).map((id) => {
            const isActive = networkId === id
            return (
              <button
                key={id}
                onClick={() => handleNetworkChange(id)}
                aria-pressed={isActive}
                className={
                  isActive
                    ? "neo-button neo-button-secondary px-3 py-1.5 text-xs"
                    : "neo-button neo-button-neutral px-3 py-1.5 text-xs"
                }
              >
                {NETWORKS[id].name}
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
