import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Aurora, SplitText, BlurText, Reveal, SpotlightCard, CountUp, Magnet } from '../components/fx'
import { DemoBadge } from '../components/Layout'
const WA = '919999999999'
const KB = [
  [['course', 'batch', 'neet', 'jee', 'board', 'class', 'subject'], 'We offer <b>NEET Foundation</b>, <b>JEE Main + Advanced</b> and <b>Board Excellence (9–12)</b>. Which one interests you?'],
  [['fee', 'price', 'cost', 'kitna', 'paisa', 'charge'], 'Fees: NEET ₹4,500/mo · JEE ₹5,000/mo · Boards ₹2,500/mo. 10% off for quarterly payment.'],
  [['time', 'timing', 'schedule', 'hour', 'open', 'kab'], "We're open Mon–Sat, 7 AM–8 PM. Batches run morning (7–10), afternoon (2–5) and evening (5–8)."],
  [['where', 'location', 'address', 'kaha', 'map', 'khemnichak'], "We're near Golki More, Khemnichak, Patna 800027 (demo address)."],
  [['demo', 'trial', 'free'], 'Yes! Your first 3 classes are a free trial. Type <b>admission</b> and share your name and phone to book it.'],
  [['hi', 'hello', 'namaste', 'hey'], 'Namaste! 👋 Ask me about courses, fees, timings or location.'],
]
function Chat({ open, setOpen }) {
  const [msgs, setMsgs] = useState([{ me: 0, t: "Namaste! 👋 I'm the Vidya Path assistant. Ask about courses, fees, timings or location." }])
  const [lead, setLead] = useState({ step: 0 }), [inp, setInp] = useState(''), [typing, setTyping] = useState(false)
  const box = useRef(null)
  useEffect(() => { box.current && (box.current.scrollTop = 1e6) }, [msgs, typing])
  const bot = t => { setTyping(true); setTimeout(() => { setTyping(false); setMsgs(m => [...m, { me: 0, t }]) }, 550) }
  const reply = q => {
    const s = q.toLowerCase()
    if (lead.step === 1) { setLead({ ...lead, name: q, step: 2 }); return bot(`Thanks ${q}! What's your 10-digit phone number?`) }
    if (lead.step === 2) {
      if (!/^\d{10}$/.test(q.replace(/\D/g, '').slice(-10))) return bot('Please enter a valid 10-digit number.')
      setLead({ ...lead, phone: q, step: 3 }); return bot(`✅ Got it, ${lead.name}. A counsellor will call ${q} soon. (Demo only: nothing is stored.) Or tap <b>Continue on WhatsApp</b> below.`)
    }
    if (/enrol|admission|join|callback|contact me|book/.test(s)) { setLead({ step: 1 }); return bot("Great! What's your name?") }
    for (const [k, a] of KB) if (k.some(w => s.includes(w))) return bot(a + "<br><span style='opacity:.6;font-size:12px'>Want a callback? Type <b>admission</b>.</span>")
    bot("Sorry, I didn't get that. Try: courses, fees, timings, location, or <b>admission</b>.")
  }
  const send = q => { if (!q.trim()) return; setMsgs(m => [...m, { me: 1, t: q }]); reply(q.trim()) }
  const waText = lead.name && lead.phone ? `Hi, I'm ${lead.name} (${lead.phone}). I'm interested in admission.` : 'Hi, I want to know about admission at Vidya Path Academy.'
  return <>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 30, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: .95 }} transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      className="fixed bottom-24 right-4 z-50 flex h-[560px] max-h-[75svh] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1730]/90 shadow-2xl backdrop-blur-xl" data-lenis-prevent>
      <div className="flex items-center gap-3 bg-gradient-to-r from-[#0A2342] to-teal-700/60 px-5 py-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-teal-400/20 text-xl">🎓</div>
        <div className="flex-1"><p className="font-semibold">Vidya Path Assistant</p><p className="flex items-center gap-1.5 text-xs text-teal-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Online · replies instantly</p></div>
        <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">✕</button>
      </div>
      <div ref={box} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {msgs.map((m, i) => <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={m.me ? 'ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-teal-500 px-3.5 py-2 text-[#04121f]' : 'w-fit max-w-[85%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-3.5 py-2 text-white/85'} dangerouslySetInnerHTML={{ __html: m.t }} />)}
        {typing && <div className="flex w-fit gap-1 rounded-2xl bg-white/5 px-4 py-3">{[0, 1, 2].map(i => <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-white/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: .8, delay: i * .15 }} />)}</div>}
      </div>
      <div className="flex flex-wrap gap-1.5 px-4 pb-2">{['Courses', 'Fees', 'Timings', 'Location', 'Admission'].map(c => <button key={c} onClick={() => send(c)} className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs text-teal-200 hover:bg-teal-400/20">{c}</button>)}</div>
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent(waText)}`} target="_blank" className="mx-4 mb-2 rounded-xl bg-[#25D366] py-2 text-center text-sm font-semibold text-[#04121f]">Continue on WhatsApp</a>
      <form onSubmit={e => { e.preventDefault(); send(inp); setInp('') }} className="flex gap-2 border-t border-white/10 p-3">
        <input value={inp} onChange={e => setInp(e.target.value)} placeholder="Type a message…" className="flex-1 rounded-xl bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:ring-1 focus:ring-teal-400" />
        <button className="rounded-xl bg-[#FF7A00] px-4 text-sm font-semibold">Send</button>
      </form>
    </motion.div>}</AnimatePresence>
    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: .95 }} onClick={() => setOpen(!open)} className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-teal-400 to-[#FF7A00] text-2xl shadow-[0_10px_40px_-5px_rgba(20,184,166,.6)]">
      {open ? '✕' : '💬'}{!open && <span className="absolute inset-0 animate-ping rounded-full bg-teal-400/30" />}
    </motion.button>
  </>
}
export default function Chatbot() {
  const [open, setOpen] = useState(() => location.hash.includes('open'))
  const courses = [['NEET Foundation', '₹4,500/mo', 'Biology, Chemistry & Physics with weekly mock tests.'], ['JEE Main + Advanced', '₹5,000/mo', 'Problem-solving batches with doubt sessions daily.'], ['Board Excellence 9–12', '₹2,500/mo', 'Concept clarity and board-pattern practice.']]
  return <main>
    <DemoBadge />
    <section className="relative flex min-h-[92svh] items-center overflow-hidden px-6">
      <Aurora colors={['#0A2342', '#14b8a6', '#3b82f6']} />
      <div className="relative z-10 mx-auto w-full max-w-6xl pt-20">
        <p className="mb-6 text-sm uppercase tracking-[.3em] text-teal-300/80">🎓 Vidya Path Academy · Khemnichak, Patna</p>
        <h1 className="font-display text-5xl font-semibold leading-[1] tracking-tight sm:text-7xl lg:text-8xl"><SplitText text="Crack NEET & JEE" /><br /><SplitText className="grad-text" text="with Patna's best mentors." delay={.2} /></h1>
        <BlurText delay={.5} className="mt-8 max-w-xl text-lg text-white/60" text="Small batches, daily doubt sessions and 3 free trial classes. Got a question? Our assistant answers instantly, day or night." />
        <div className="mt-10 flex flex-wrap gap-4"><Magnet><button onClick={() => setOpen(true)} className="rounded-full bg-[#FF7A00] px-7 py-3.5 font-semibold shadow-[0_0_40px_-8px_#FF7A00]">💬 Ask the assistant</button></Magnet>
          <Magnet><a href="#courses" onClick={e=>{e.preventDefault();document.getElementById('courses').scrollIntoView({behavior:'smooth'})}} className="inline-block rounded-full glass px-7 py-3.5 font-semibold">View courses</a></Magnet></div>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-12 md:grid-cols-4">
      {[[1200, '+', 'students taught'], [15, '', 'expert faculty'], [8, '', 'years in Patna'], [3, '', 'free trial classes']].map(([n, s, l]) => <SpotlightCard key={l} className="p-6"><div className="font-display text-4xl font-semibold grad-text"><CountUp to={n} suffix={s} /></div><p className="mt-2 text-sm text-white/55">{l}</p></SpotlightCard>)}
    </section>
    <section id="courses" className="mx-auto max-w-6xl px-6 py-16"><Reveal><h2 className="font-display text-4xl font-semibold sm:text-5xl">Courses</h2></Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{courses.map(([t, p, d], i) => <Reveal key={t} delay={i * .1}><SpotlightCard className="h-full p-8"><p className="text-sm text-[#FF9a40]">{p}</p><h3 className="mt-2 font-display text-2xl font-semibold">{t}</h3><p className="mt-3 text-white/60">{d}</p><button onClick={() => setOpen(true)} className="mt-6 text-sm font-semibold text-teal-300">Ask about this →</button></SpotlightCard></Reveal>)}</div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-16"><Reveal><SpotlightCard className="grid gap-8 p-10 md:grid-cols-2">
      <div><h2 className="font-display text-3xl font-semibold sm:text-4xl">An assistant that never sleeps</h2><p className="mt-4 text-white/60">Answers questions in English & Hinglish, captures name + phone for callbacks and hands serious leads to WhatsApp.</p></div>
      <ul className="space-y-3 text-white/75">{['Instant answers on fees, courses, timings', 'Lead capture with phone validation', 'One-tap WhatsApp handoff', 'Works on any website'].map(x => <li key={x} className="flex gap-3"><span className="text-teal-300">✓</span>{x}</li>)}</ul>
    </SpotlightCard></Reveal></section>
    <footer className="px-6 py-12 text-center text-sm text-white/40">Vidya Path Academy is a fictional demo by Aryan Kumar · Golki More, Khemnichak, Patna 800027 (demo address)</footer>
    <Chat open={open} setOpen={setOpen} />
  </main>
}
