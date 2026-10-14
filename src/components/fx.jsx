import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
// React Bits–style components (adapted from reactbits.dev patterns)
export function Aurora({ colors = ['#0A2342', '#14b8a6', '#FF7A00'] }) {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {colors.map((c, i) => <div key={i} className="absolute rounded-full blur-[110px] opacity-40"
      style={{ background: c, width: '55vw', height: '55vw', left: `${[-10, 45, 20][i]}%`, top: `${[-20, -10, 30][i]}%`, animation: `aur ${14 + i * 4}s ease-in-out infinite`, animationDelay: `${-i * 3}s` }} />)}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050d1c_75%)]" />
    <div className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
  </div>
}
export function SplitText({ text, className = '', delay = 0 }) {
  return <span aria-label={text}>{text.split(' ').map((w, i) =>
    <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom mr-[0.25em]">
      <motion.span className={`inline-block ${className}`} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, ease: [.2, .8, .2, 1], delay: delay + i * .06 }}>{w}</motion.span></span>)}</span>
}
export function BlurText({ text, className = '', delay = 0 }) {
  return <motion.p className={className} initial={{ opacity: 0, filter: 'blur(12px)', y: 12 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 1, delay }}>{text}</motion.p>
}
export function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .8, ease: [.2, .8, .2, 1], delay }}>{children}</motion.div>
}
export function SpotlightCard({ children, className = '', color = 'rgba(94,234,212,.18)' }) {
  const r = useRef(null)
  const mv = e => { const b = r.current.getBoundingClientRect(); r.current.style.setProperty('--x', `${e.clientX - b.left}px`); r.current.style.setProperty('--y', `${e.clientY - b.top}px`) }
  return <div ref={r} onMouseMove={mv} className={`glass relative overflow-hidden rounded-3xl ${className}`}
    style={{ backgroundImage: `radial-gradient(400px circle at var(--x,50%) var(--y,0%), ${color}, transparent 60%)` }}>{children}</div>
}
export function CountUp({ to, suffix = '' }) {
  const r = useRef(null), inView = useInView(r, { once: true }), [v, setV] = useState(0)
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: x => setV(Math.round(x)) }); return c.stop } }, [inView, to])
  return <span ref={r}>{v}{suffix}</span>
}
export function Magnet({ children, strength = 0.3 }) {
  const r = useRef(null), [p, setP] = useState({ x: 0, y: 0 })
  return <motion.div ref={r} className="inline-block" animate={p} transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    onMouseMove={e => { const b = r.current.getBoundingClientRect(); setP({ x: (e.clientX - b.left - b.width / 2) * strength, y: (e.clientY - b.top - b.height / 2) * strength }) }}
    onMouseLeave={() => setP({ x: 0, y: 0 })}>{children}</motion.div>
}
export function ClickSpark() {
  const c = useRef(null)
  useEffect(() => {
    const cv = c.current, ctx = cv.getContext('2d'); let sp = [], raf
    const rs = () => { cv.width = innerWidth; cv.height = innerHeight }; rs(); addEventListener('resize', rs)
    const click = e => { const t = performance.now(); for (let i = 0; i < 8; i++) sp.push({ x: e.clientX, y: e.clientY, a: i * Math.PI / 4, t }) }
    addEventListener('click', click)
    const draw = n => { ctx.clearRect(0, 0, cv.width, cv.height); sp = sp.filter(s => { const k = (n - s.t) / 400; if (k >= 1) return false; const d = k * 28, l = 10 * (1 - k); ctx.strokeStyle = '#5eead4'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(s.x + d * Math.cos(s.a), s.y + d * Math.sin(s.a)); ctx.lineTo(s.x + (d + l) * Math.cos(s.a), s.y + (d + l) * Math.sin(s.a)); ctx.stroke(); return true }); raf = requestAnimationFrame(draw) }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); removeEventListener('click', click); removeEventListener('resize', rs) }
  }, [])
  return <canvas ref={c} className="pointer-events-none fixed inset-0 z-[70]" />
}
export function Marquee({ items }) {
  return <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
    <div className="flex w-max gap-10 py-6 text-white/40 font-display text-2xl" style={{ animation: 'marq 30s linear infinite' }}>
      {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-10">{t}<span className="text-[#FF7A00]">✦</span></span>)}</div></div>
}
