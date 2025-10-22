import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/Button'

type NavbarProps = { isScrolled: boolean }

export const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const headerClass = isScrolled
    ? 'bg-white/60 supports-backdrop-filter:bg-white/40 backdrop-blur-xl border-b border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
    : 'bg-white/30 supports-backdrop-filter:bg-white/20 backdrop-blur-lg border-b border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${headerClass}`} role="banner" aria-label="Primary navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-3">
          <Link to="/" className="flex items-center gap-2" aria-label="Originn home" tabIndex={0}>
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white grid place-items-center font-black">Og</div>
            <span className="text-xl font-semibold tracking-tight">Originn</span>
          </Link>

          {/* <div className="hidden md:flex ml-4 flex-1">
            <label htmlFor="global-search" className="sr-only">Search startups</label>
            <div className="relative w-full max-w-xl">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z"/></svg>
              <input
                id="global-search"
                type="search"
                placeholder="Search startups"
                className="w-full rounded-full border border-slate-200/70 bg-white/70 pl-10 pr-4 py-2 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div> */}

          <div className="ml-auto flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {/* <Link className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer" to="/">Discover</Link>
              <Link className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer" to="/">Pre Order</Link> */}
              <Link className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer" to="/">About Us</Link>
              {/* <Link className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer" to="/dashboard">Dashboard</Link> */}
            </nav>
            
            <Button asChild variant="primary" size="md" showArrow>
              <a href="https://originn.co.in" target="_blank" rel="noopener noreferrer" aria-label="Go to originn.co.in">Go to originn.co.in</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
