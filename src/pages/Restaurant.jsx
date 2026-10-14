import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Aurora, SplitText, BlurText, Reveal, SpotlightCard, Magnet } from '../components/fx'
import { DemoBadge } from '../components/Layout'
const WA = '919999999999'
const menu = [['Litti Chokha', 120, '🔥', 'Sattu-stuffed, ghee-dipped, with smoky chokha'], ['Champaran Mutton', 380, '🍖', 'Slow-cooked in a sealed handi'], ['Dal Pitha', 90, '🥟', 'Steamed rice dumplings, lentil filling'], ['Sattu Paratha', 80, '🫓', 'With pickle and curd'], ['Khaja', 60, '🥮', 'Flaky Silao-style sweet (250 g)'], ['Thekua', 70, '🍪', 'Jaggery & wheat, Chhath special'], ['Tilkut', 90, '⚪', 'Gaya-style sesame sweet'], ['Malpua', 100, '🥞', 'With rabri, 2 pcs']]
export default function Restaurant() {
  const [cart, setCart] = useState({})
  const add = (n, d) => setCart(c => { const q = Math.max(0, (c[n] || 0) + d); const x = { ...c, [n]: q }; if (!q) delete x[n]; return x })
  const lines = Object.entries(cart).map(([n, q]) => { const p = menu.find(m => m[0] === n)[1]; return [n, q, p * q] })
  const total = lines.reduce((a, l) => a + l[2], 0), count = lines.reduce((a, l) => a + l[1], 0)
  const text = count ? `Order:\n${lines.map(([n, q, s]) => `${q} x ${n} = ₹${s}`).join('\n')}\nTotal: ₹${total}` : 'Hi, I want to place an order'
  return <main>
    <DemoBadge />
    <section className="relative flex min-h-[85svh] items-center overflow-hidden px-6">
      <Aurora colors={['#7c2d12', '#FF7A00', '#0A2342']} />
      <div className="relative z-10 mx-auto w-full max-w-6xl pt-20">
        <p className="mb-6 text-sm uppercase tracking-[.3em] text-orange-300/80">Patliputra Rasoi & Mithai · Patna</p>
        <h1 className="font-display text-5xl font-semibold leading-[1] tracking-tight sm:text-7xl lg:text-8xl"><SplitText text="Asli Bihari swaad," /><br /><SplitText className="bg-gradient-to-r from-amber-200 to-[#FF7A00] bg-clip-text text-transparent" text="delivered hot." delay={.2} /></h1>
        <BlurText delay={.5} className="mt-8 max-w-lg text-lg text-white/60" text="Litti chokha, Champaran mutton and fresh mithai. Add to cart and order straight on WhatsApp, no app needed." />
        <div className="mt-10"><Magnet><a href="#menu" onClick={e=>{e.preventDefault();document.getElementById('menu').scrollIntoView({behavior:'smooth'})}} className="inline-block rounded-full bg-[#FF7A00] px-7 py-3.5 font-semibold shadow-[0_0_40px_-8px_#FF7A00]">See the menu ↓</a></Magnet></div>
      </div>
    </section>
    <section id="menu" className="mx-auto max-w-6xl px-6 py-16 pb-40"><Reveal><h2 className="font-display text-4xl font-semibold sm:text-5xl">Menu</h2></Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">{menu.map(([n, p, i, d], k) => <Reveal key={n} delay={(k % 2) * .08}><SpotlightCard className="flex items-center gap-5 p-5" color="rgba(255,122,0,.18)">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#FF7A00]/30 to-transparent text-3xl">{i}</div>
        <div className="min-w-0 flex-1"><h3 className="font-semibold">{n}</h3><p className="truncate text-sm text-white/50">{d}</p><p className="mt-1 font-semibold text-orange-300">₹{p}</p></div>
        {cart[n] ? <div className="flex items-center gap-3 rounded-full bg-white/10 px-2 py-1"><button onClick={() => add(n, -1)} className="h-7 w-7 rounded-full bg-white/10">−</button><span className="w-4 text-center">{cart[n]}</span><button onClick={() => add(n, 1)} className="h-7 w-7 rounded-full bg-[#FF7A00]">+</button></div>
          : <button onClick={() => add(n, 1)} className="rounded-full border border-[#FF7A00]/50 px-4 py-1.5 text-sm font-semibold text-orange-200 hover:bg-[#FF7A00]">Add</button>}
      </SpotlightCard></Reveal>)}</div></section>
    <AnimatePresence>{count > 0 && <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed inset-x-4 bottom-14 z-40 mx-auto flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b1730]/90 p-4 shadow-2xl backdrop-blur-xl">
      <div><p className="text-sm text-white/60">{count} item{count > 1 ? 's' : ''}</p><p className="text-xl font-semibold">₹{total}</p></div>
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent(text)}`} target="_blank" className="rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-[#04121f]">Order on WhatsApp →</a></motion.div>}</AnimatePresence>
    <footer className="px-6 py-12 text-center text-sm text-white/40">Patliputra Rasoi & Mithai is a fictional demo by Aryan Kumar</footer>
  </main>
}
