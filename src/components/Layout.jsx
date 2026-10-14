import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { ClickSpark } from './fx'
export function DemoBadge() { return <div className="fixed bottom-4 left-4 z-50 rounded-full border border-[#FF7A00]/40 bg-[#FF7A00]/15 px-3 py-1 text-xs font-semibold text-[#ffb366] backdrop-blur">Demo project · fictional business</div> }
export default function Layout({ children }) {
  const { pathname } = useLocation()
  useEffect(() => { const l = new Lenis({ lerp: .09 }); let r; const f = t => { l.raf(t); r = requestAnimationFrame(f) }; r = requestAnimationFrame(f); return () => { cancelAnimationFrame(r); l.destroy() } }, [])
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return <div className="noise min-h-screen">
    <ClickSpark />
    {pathname !== '/' && <Link to="/" className="fixed right-4 top-4 z-50 rounded-full glass px-4 py-2 text-xs font-medium text-white/80 hover:text-white">← Aryan's portfolio</Link>}
    {children}
  </div>
}
