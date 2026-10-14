import { Link } from 'react-router-dom'
import { Aurora, SplitText, BlurText, Reveal, SpotlightCard, CountUp, Magnet, Marquee } from '../components/fx'
const WA = '919999999999'
const demos = [
  { to: '/chatbot-demo', tag: 'AI Chatbot', title: 'Vidya Path Academy', desc: 'Coaching-institute site with a live chat assistant: answers fees, courses & timings, captures leads, hands off to WhatsApp.', grad: 'from-teal-400/30 to-[#0A2342]', icon: '💬' },
  { to: '/clinic', tag: 'Landing page', title: 'BrightSmile Dental', desc: 'Conversion-focused clinic page with services, trust signals and one-tap WhatsApp appointment booking.', grad: 'from-sky-400/30 to-[#0A2342]', icon: '🦷' },
  { to: '/restaurant', tag: 'Ordering', title: 'Patliputra Rasoi & Mithai', desc: 'Bihari restaurant menu with a cart that sends the whole order to WhatsApp, no app or fees needed.', grad: 'from-[#FF7A00]/35 to-[#0A2342]', icon: '🍲' },
]
const services = [
  ['AI chatbots', 'Website & WhatsApp assistants that answer FAQs and collect leads 24/7.'],
  ['Landing pages', 'Fast, responsive pages built with React + Tailwind that turn visitors into enquiries.'],
  ['Automation bots', 'Python Telegram & Discord bots for communities and small businesses.'],
]
export default function Home() {
  return <main>
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6">
      <Aurora />
      <nav className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-semibold">aryan<span className="text-[#FF7A00]">.</span></span>
        <div className="hidden gap-8 text-sm text-white/60 sm:flex"><a href="#work" onClick={e=>{e.preventDefault();document.getElementById('work').scrollIntoView({behavior:'smooth'})}}>Work</a><a href={`https://github.com/Aryan170911`} target="_blank">GitHub</a><a href={`https://wa.me/${WA}`} target="_blank">Contact</a></div>
      </nav>
      <div className="relative z-10 mx-auto w-full max-w-6xl pt-24">
        <BlurText className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/70" text="● Available for projects · Patna, India" />
        <h1 className="font-display text-[13vw] font-semibold leading-[.95] tracking-tight sm:text-7xl lg:text-8xl">
          <SplitText text="AI chatbots &" /><br /><SplitText className="grad-text" text="websites that convert." delay={.25} />
        </h1>
        <BlurText delay={.6} className="mt-8 max-w-xl text-lg text-white/60" text="I'm Aryan Kumar. I build AI chatbots for websites and WhatsApp, fast landing pages and Python bots for businesses in Patna and beyond." />
        <div className="mt-10 flex flex-wrap gap-4">
          <Magnet><Link to="/chatbot-demo" className="inline-block rounded-full bg-[#FF7A00] px-7 py-3.5 font-semibold text-white shadow-[0_0_40px_-8px_#FF7A00]">Try the chatbot demo →</Link></Magnet>
          <Magnet><a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi Aryan, I saw your portfolio.')}`} target="_blank" className="inline-block rounded-full glass px-7 py-3.5 font-semibold">Message on WhatsApp</a></Magnet>
        </div>
      </div>
    </section>
    <Marquee items={['AI Chatbots', 'WhatsApp Automation', 'React', 'Tailwind CSS', 'Python Bots', 'Landing Pages']} />
    <section className="mx-auto grid max-w-6xl gap-4 px-6 py-20 sm:grid-cols-3">
      {[[12, '+', 'public GitHub projects'], [3, '', 'live demo builds'], [1, '', 'client site shipped: Mathrubhumi Enterprises']].map(([n, s, l], i) =>
        <Reveal key={i} delay={i * .1}><SpotlightCard className="p-8"><div className="font-display text-6xl font-semibold grad-text"><CountUp to={n} suffix={s} /></div><p className="mt-3 text-white/60">{l}</p></SpotlightCard></Reveal>)}
    </section>
    <section id="work" className="mx-auto max-w-6xl px-6 py-16">
      <Reveal><p className="text-sm uppercase tracking-[.3em] text-teal-300/80">Demo projects</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">Click in. They work.</h2></Reveal>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {demos.map((d, i) => <Reveal key={d.to} delay={i * .1}><Link to={d.to} className="group block h-full">
          <SpotlightCard className="h-full p-2 transition duration-500 group-hover:-translate-y-1.5">
            <div className={`relative grid h-48 place-items-center overflow-hidden rounded-[20px] bg-gradient-to-br ${d.grad}`}><span className="text-6xl transition duration-500 group-hover:scale-125">{d.icon}</span><span className="absolute left-3 top-3 rounded-full bg-black/30 px-3 py-1 text-[11px] backdrop-blur">Demo project</span></div>
            <div className="p-6"><p className="text-xs uppercase tracking-widest text-[#FF9a40]">{d.tag}</p><h3 className="mt-2 font-display text-2xl font-semibold">{d.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/60">{d.desc}</p><p className="mt-6 text-sm font-semibold text-teal-300">Open demo <span className="inline-block transition group-hover:translate-x-1">→</span></p></div>
          </SpotlightCard></Link></Reveal>)}
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal><h2 className="font-display text-4xl font-semibold sm:text-5xl">Real work so far</h2></Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[['Mathrubhumi Enterprises', 'Built and shipped the business website.'], ['THE DIP agency', 'Designed and developed landing pages for agency clients.'], ['Telegram & Discord bots', 'Python bots for automation and communities.'], ['Open source', '12+ projects on GitHub at Aryan170911.']].map(([t, d], i) =>
          <Reveal key={t} delay={i * .05}><div className="flex gap-5 border-t border-white/10 py-6"><span className="font-display text-white/30">0{i + 1}</span><div><h3 className="text-xl font-semibold">{t}</h3><p className="mt-1 text-white/55">{d}</p></div></div></Reveal>)}
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-16"><div className="grid gap-6 md:grid-cols-3">{services.map(([t, d], i) => <Reveal key={t} delay={i * .1}><SpotlightCard className="h-full p-8" color="rgba(255,122,0,.15)"><h3 className="font-display text-2xl font-semibold">{t}</h3><p className="mt-3 text-white/60">{d}</p></SpotlightCard></Reveal>)}</div></section>
    <section className="relative mx-auto my-20 max-w-6xl overflow-hidden rounded-[32px] px-6 py-24 text-center">
      <Aurora /><Reveal className="relative"><h2 className="font-display text-4xl font-semibold sm:text-6xl">Want one for your business?</h2><p className="mx-auto mt-4 max-w-md text-white/60">Tell me what you need. I'll reply on WhatsApp.</p>
        <div className="mt-8"><Magnet><a href={`https://wa.me/${WA}?text=${encodeURIComponent('Hi Aryan, I want a chatbot/website for my business.')}`} target="_blank" className="inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#0A2342]">Start a project →</a></Magnet></div></Reveal>
    </section>
    <footer className="mx-auto flex max-w-6xl justify-between px-6 py-10 text-sm text-white/40"><span>© 2026 Aryan Kumar · Patna</span><a href="https://github.com/Aryan170911" target="_blank">github.com/Aryan170911</a></footer>
  </main>
}
