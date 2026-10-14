import { useState } from 'react'
import { Aurora, SplitText, BlurText, Reveal, SpotlightCard, CountUp, Magnet } from '../components/fx'
import { DemoBadge } from '../components/Layout'
const WA = '919999999999'
const services = [['🦷', 'Checkup & Cleaning', '₹499'], ['✨', 'Teeth Whitening', '₹3,999'], ['🔧', 'Root Canal', '₹4,500'], ['😁', 'Braces & Aligners', 'from ₹25,000'], ['🧒', 'Kids Dentistry', '₹399'], ['🦴', 'Implants', 'from ₹18,000']]
export default function Clinic() {
  const [f, setF] = useState({ name: '', svc: 'Checkup & Cleaning', day: '' })
  const msg = `Hi BrightSmile, I'm ${f.name || '…'}. I'd like to book: ${f.svc}${f.day ? ' on ' + f.day : ''}.`
  return <main>
    <DemoBadge />
    <section className="relative flex min-h-[92svh] items-center overflow-hidden px-6">
      <Aurora colors={['#0A2342', '#38bdf8', '#14b8a6']} />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 pt-20 lg:grid-cols-[1.3fr_1fr]">
        <div><p className="mb-6 text-sm uppercase tracking-[.3em] text-sky-300/80">BrightSmile Dental · Boring Road, Patna</p>
          <h1 className="font-display text-5xl font-semibold leading-[1] tracking-tight sm:text-7xl"><SplitText text="Painless dentistry," /><br /><SplitText className="grad-text" text="brilliant smiles." delay={.2} /></h1>
          <BlurText delay={.5} className="mt-8 max-w-lg text-lg text-white/60" text="Modern equipment, gentle doctors and same-day appointments. Book in 10 seconds on WhatsApp." />
          <div className="mt-10"><Magnet><a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi, I want to book a dental checkup')}`} target="_blank" className="inline-block rounded-full bg-[#FF7A00] px-7 py-3.5 font-semibold shadow-[0_0_40px_-8px_#FF7A00]">Book on WhatsApp →</a></Magnet></div></div>
        <SpotlightCard className="p-8" color="rgba(56,189,248,.2)"><p className="text-sm text-white/50">Today's availability</p>
          {['10:00 AM', '12:30 PM', '4:00 PM', '6:30 PM'].map((t, i) => <div key={t} className="mt-3 flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"><span>{t}</span><span className={`text-xs ${i === 1 ? 'text-white/30' : 'text-emerald-300'}`}>{i === 1 ? 'Booked' : 'Open'}</span></div>)}
          <div className="mt-6 flex items-center gap-3 text-sm text-white/60"><span className="text-yellow-300">★★★★★</span>4.9 · 320 reviews</div></SpotlightCard>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-12 md:grid-cols-4">{[[10, '+', 'years experience'], [5000, '+', 'happy patients'], [4, '', 'specialist doctors'], [7, '', 'days a week']].map(([n, s, l]) => <SpotlightCard key={l} className="p-6"><div className="font-display text-4xl font-semibold grad-text"><CountUp to={n} suffix={s} /></div><p className="mt-2 text-sm text-white/55">{l}</p></SpotlightCard>)}</section>
    <section className="mx-auto max-w-6xl px-6 py-16"><Reveal><h2 className="font-display text-4xl font-semibold sm:text-5xl">Treatments</h2></Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map(([i, t, p], k) => <Reveal key={t} delay={k * .06}><SpotlightCard className="p-7" color="rgba(56,189,248,.18)"><div className="text-3xl">{i}</div><h3 className="mt-4 text-xl font-semibold">{t}</h3><p className="mt-1 text-sky-300">{p}</p></SpotlightCard></Reveal>)}</div></section>
    <section className="mx-auto max-w-3xl px-6 py-16"><Reveal><SpotlightCard className="p-8 sm:p-10"><h2 className="font-display text-3xl font-semibold">Book an appointment</h2><p className="mt-2 text-white/55">Fill this in and we'll open WhatsApp with your message ready.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <input placeholder="Your name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} className="rounded-xl bg-white/5 px-4 py-3 outline-none focus:ring-1 focus:ring-sky-400" />
        <select value={f.svc} onChange={e => setF({ ...f, svc: e.target.value })} className="rounded-xl bg-white/5 px-4 py-3 outline-none [&>option]:bg-[#0b1730]">{services.map(s => <option key={s[1]}>{s[1]}</option>)}</select>
        <input type="date" value={f.day} onChange={e => setF({ ...f, day: e.target.value })} className="rounded-xl bg-white/5 px-4 py-3 outline-none [color-scheme:dark]" /></div>
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`} target="_blank" className="mt-6 block rounded-xl bg-[#25D366] py-3.5 text-center font-semibold text-[#04121f]">Send on WhatsApp</a></SpotlightCard></Reveal></section>
    <footer className="px-6 py-12 text-center text-sm text-white/40">BrightSmile Dental is a fictional demo by Aryan Kumar</footer>
  </main>
}
