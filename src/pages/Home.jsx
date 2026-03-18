import { useEffect, useState, useRef, memo, useCallback, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Youtube, Twitter, ArrowDown, ExternalLink } from 'lucide-react'
const ShaderBackground = lazy(() => import('../components/ShaderBackground'))
const socialLinks = [
  { icon: Github, url: 'https://example.com', label: 'GitHub' },
  { icon: Linkedin, url: 'https://example.com', label: 'LinkedIn' },
  { icon: Youtube, url: 'https://example.com', label: 'YouTube' },
  { icon: Twitter, url: 'https://example.com', label: 'X' },
]
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: ((i * 37 + 13) * 7) % 100,
  y: ((i * 53 + 29) * 11) % 100,
  size: (i % 3) + 1,
  duration: 15 + i * 1.7,
  delay: i * 0.4,
}))
const FloatingParticles = memo(function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-accent-gold/20 particle-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
})
const ConcentricCirclesBackground = memo(function ConcentricCirclesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${(i + 1) * 18}%`,
            height: `${(i + 1) * 18}%`,
            border: `1px solid rgba(201, 169, 110, ${0.03 + i * 0.008})`,
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </div>
  )
})
const SpotlightEffect = memo(function SpotlightEffect() {
  const spotlightRef = useRef(null)
  const rafRef = useRef(null)
  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    const handler = (e) => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty('--spot-x', `${e.clientX}px`)
        el.style.setProperty('--spot-y', `${e.clientY}px`)
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handler)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])
  return (
    <div
      ref={spotlightRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        background: 'radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(201, 169, 110, 0.08), transparent 50%)',
      }}
    />
  )
})
const HeroMonogram = memo(function HeroMonogram() {
  const containerRef = useRef(null)
  const rafRef = useRef(null)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e) => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        const ox = (e.clientX - window.innerWidth / 2) * 0.02
        const oy = (e.clientY - window.innerHeight / 2) * 0.02
        el.style.setProperty('--parallax-x', `${ox}px`)
        el.style.setProperty('--parallax-y', `${oy}px`)
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handler)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])
  return (
    <div
      ref={containerRef}
      className="relative w-80 h-80 lg:w-96 lg:h-96"
      style={{
        '--parallax-x': '0px',
        '--parallax-y': '0px',
        transform: 'translate3d(var(--parallax-x), var(--parallax-y), 0)',
        willChange: 'transform',
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.06) 0%, transparent 65%)',
          transform: 'scale(1.4) translateZ(0)',
          filter: 'blur(30px)',
        }}
      />
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute inset-0 w-full h-full hero-ring-spin"
        style={{ animationDuration: '60s' }}
      >
        <circle cx="200" cy="200" r="190" stroke="rgba(92, 58, 32, 0.25)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="180" stroke="rgba(201, 169, 110, 0.15)" strokeWidth="0.5" strokeDasharray="8 24" />
        <path
          d="M200 20 A180 180 0 0 1 380 200"
          stroke="rgba(201, 169, 110, 0.35)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="200" cy="20" r="2" fill="rgba(201, 169, 110, 0.5)" />
        <circle cx="380" cy="200" r="2" fill="rgba(201, 169, 110, 0.4)" />
      </svg>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute inset-0 w-full h-full hero-ring-spin-reverse"
        style={{ animationDuration: '45s' }}
      >
        <circle cx="200" cy="200" r="150" stroke="rgba(201, 169, 110, 0.12)" strokeWidth="0.5" />
        <circle cx="200" cy="200" r="140" stroke="rgba(184, 115, 51, 0.1)" strokeWidth="0.5" strokeDasharray="4 20" />
        <path
          d="M200 60 A140 140 0 0 0 60 200"
          stroke="rgba(201, 169, 110, 0.25)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="200" cy="60" r="1.5" fill="rgba(201, 169, 110, 0.4)" />
        <circle cx="60" cy="200" r="1.5" fill="rgba(201, 169, 110, 0.3)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 200 200" fill="none" className="w-32 h-32 lg:w-36 lg:h-36">
          <polygon
            points="100,8 179,54 179,146 100,192 21,146 21,54"
            stroke="rgba(201, 169, 110, 0.3)"
            strokeWidth="0.75"
            fill="rgba(42, 26, 14, 0.4)"
          />
          <polygon
            points="100,24 167,62 167,138 100,176 33,138 33,62"
            stroke="rgba(201, 169, 110, 0.15)"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
        <span
          className="absolute font-serif text-5xl lg:text-6xl italic select-none"
          style={{
            color: '#c9a96e',
            textShadow: '0 0 40px rgba(201, 169, 110, 0.3)',
          }}
        >
          S
        </span>
      </div>
    </div>
  )
})
const SocialIcon = memo(function SocialIcon({ social }) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      data-cursor={social.label}
      className="relative text-brown-400 hover:text-accent-gold transition-all duration-300 hover:-translate-y-1"
    >
      <social.icon size={24} />
    </a>
  )
})
export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [introComplete, setIntroComplete] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
      setTimeout(() => setIntroComplete(true), 600)
    }, 2400)
    return () => clearTimeout(timer)
  }, [])
  const handleProjectsClick = useCallback((e) => {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  const handleContactClick = useCallback((e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={null}>
        <ShaderBackground />
      </Suspense>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(42, 26, 14, 0.3) 0%, transparent 60%),
            linear-gradient(180deg,
              rgba(26, 15, 8, 0.35) 0%,
              rgba(26, 15, 8, 0.2) 40%,
              rgba(32, 20, 11, 0.15) 70%,
              rgba(38, 24, 14, 0.1) 100%
            )
          `,
        }}
      />
      <ConcentricCirclesBackground />
      <FloatingParticles />
      <SpotlightEffect />
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-brown-950"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-cream-100 tracking-tight px-4 text-center"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Your Name Here
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 md:px-20 lg:px-24 xl:px-32 transition-all duration-700 ${introComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-24 items-center justify-center">
          <div className="w-full lg:w-1/2 lg:max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase">
                Welcome!
              </p>
              <div
                className="absolute -bottom-2 left-0 h-[2px]"
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #c9a96e 0%, #c9a96e 80%, rgba(201, 169, 110, 0.5) 100%)',
                  boxShadow: '0 0 10px rgba(201, 169, 110, 0.5)',
                }}
              />
            </motion.div>
            <motion.h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream-50 leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Hey, I'm{' '}
              <span className="text-accent-gold italic block lg:inline">Your Name</span>
            </motion.h1>
            <motion.p
              className="text-brown-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              A B.Tech student at Coding Gita. I design and build modern,
              user-friendly web applications with cutting-edge technologies.
              My focus is on performance, smooth animations, and clean
              interfaces that users love.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-4 mb-12 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <a
                href="#projects"
                onClick={handleProjectsClick}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-brown-950 font-semibold rounded-full transition-all duration-300 hover:bg-accent-warm hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
                data-cursor="View"
              >
                View My Work
                <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brown-600 text-cream-100 font-semibold rounded-full transition-all duration-300 hover:border-accent-gold hover:text-accent-gold hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]"
                data-cursor="Contact"
              >
                Get In Touch
              </a>
            </motion.div>
            <motion.div
              className="flex items-center gap-8 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} social={social} />
              ))}
            </motion.div>
          </div>
          <motion.div
            className="hidden lg:flex w-1/2 items-center justify-center order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroMonogram />
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="arrow-bounce">
          <ArrowDown size={20} className="text-brown-500" />
        </div>
      </motion.div>
    </section>
  )
}