"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Star, Camera, PhoneCall, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Components ---

const FireworkOverlay = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete();
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[2000] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6 relative z-10"
      >
        <h2 className="font-italian text-4xl sm:text-6xl text-white mb-4 tracking-widest">
          JOYEUX ANNIVERSAIRE
        </h2>
        <p className="font-cormorant italic text-xl sm:text-2xl text-gold-2 opacity-80">
          Vendôme Beauty & Spa
        </p>
      </motion.div>
    </motion.div>
  );
};

const LoadingCurtain = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="fixed inset-0 bg-[#2a241d] z-[1000] flex items-center justify-center overflow-hidden"
        initial={{ clipPath: 'inset(0 0 0 0)' }}
        exit={{ clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,153,105,0.15),transparent_60%)]" />
        <motion.span
          className="font-italian text-[clamp(40px,8vw,120px)] text-[#b89969] relative tracking-[0.1em]"
          initial={{ opacity: 0, y: 40, scale: 0.95, letterSpacing: '0.3em' }}
          animate={{
            opacity: [0, 1, 0],
            y: [40, 0, 0],
            scale: [0.95, 1, 1.05],
            letterSpacing: ['0.3em', '0.1em', '0.1em'],
          }}
          transition={{
            times: [0, 0.4, 1],
            duration: 3,
            ease: "easeOut",
            delay: 0.3
          }}
        >
          Vendôme
          <motion.div
            className="absolute left-1/2 -bottom-5 h-px bg-[#b89969] -translate-x-1/2"
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.span>
      </motion.div>
    )}
  </AnimatePresence>
);

const FallingPetals = () => {
  const petals = Array.from({ length: 8 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-[-30px] w-3.5 h-[18px] rounded-[50%_10%_50%_10%] blur-[0.3px]"
          style={{
            left: `${[5, 18, 32, 48, 62, 75, 88, 96][i]}%`,
            background: i % 2 === 0
              ? 'radial-gradient(ellipse at 30% 30%, #e5c6b5, #b88770)'
              : 'radial-gradient(ellipse at 30% 30%, #d4b98a, #b89969)',
          }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 0.7, 0.5, 0.4, 0],
            rotate: [0, 200, 540],
            x: [0, 30, -40],
          }}
          transition={{
            duration: [14, 11, 16, 13, 15, 12, 14, 13][i],
            repeat: Infinity,
            delay: [0, -2, -5, -7, -3, -9, -1, -6][i],
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const Countdown = () => {
  const targetDate = new Date('2026-04-25T14:00:00+01:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div
      className="flex justify-center gap-[clamp(14px,3vw,36px)] my-11 flex-wrap"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1.2 }}
      viewport={{ once: true }}
    >
      {[
        { label: 'Jours', value: timeLeft.d },
        { label: 'Heures', value: timeLeft.h },
        { label: 'Minutes', value: timeLeft.m },
        { label: 'Secondes', value: timeLeft.s },
      ].map((unit, i) => (
        <div key={unit.label} className="text-center min-w-[80px] relative">
          <motion.div
            key={unit.value}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-italian text-[clamp(42px,6vw,72px)] text-[#2a241d] leading-none tracking-[-0.02em]"
          >
            {unit.value}
          </motion.div>
          <div className="font-inter text-[10px] tracking-[0.3em] uppercase text-[#8a6f47] mt-2.5">
            {unit.label}
          </div>
          {i < 3 && (
            <div className="absolute -right-[clamp(7px,1.5vw,18px)] top-1/4 h-2/5 w-px bg-gradient-to-b from-transparent via-[#b89969] to-transparent opacity-40 hidden sm:block" />
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState<'welcome' | 'fireworks' | 'loading' | 'site'>('welcome');

  const handleStart = () => {
    const audio = new Audio('/audio/fireworks.mp3');
    audio.volume = 1.0;
    audio.play().catch(() => { });
    setStage('fireworks');
    setTimeout(() => setStage('loading'), 4500);
  };

  useEffect(() => {
    if (stage === 'loading') {
      const timer = setTimeout(() => setStage('site'), 3500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5),
        y: (e.clientY / window.innerHeight - 0.5),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-[#b89969] selection:text-[#fbf8f3]">
      <AnimatePresence>
        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            className="fixed inset-0 z-[4000] bg-[#2a241d] flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,153,105,0.15),transparent_60%)]" />
            <motion.div
              className="text-center relative z-10 px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="font-inter text-[10px] tracking-[0.5em] text-[#b89969] uppercase mb-6">
                Vendôme Beauty & Spa
              </div>
              <h1 className="font-italian text-[clamp(36px,7vw,90px)] text-[#f6f1ea] tracking-wide mb-3 leading-tight">
                Joyeux Anniversaire
              </h1>
              <p className="font-cormorant italic text-[clamp(16px,2vw,22px)] text-[#d4b98a] mb-12 opacity-80">
                Une soirée d'exception vous attend
              </p>
              <motion.button
                onClick={handleStart}
                className="relative inline-flex items-center gap-3 py-4 px-12 border border-[#b89969] text-[#f6f1ea] font-inter text-[11px] tracking-[0.4em] uppercase overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Entrer</span>
                <div className="absolute inset-0 bg-[#b89969] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {stage === 'fireworks' && <FireworkOverlay onComplete={() => setStage('loading')} />}
      </AnimatePresence>

      {stage !== 'site' && <LoadingCurtain show={stage === 'loading'} />}
      {stage === 'site' && <FallingPetals />}

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center p-10 sm:p-6 overflow-hidden">
        {/* Background & Orbs */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(229,198,181,0.4),transparent_50%),radial-gradient(ellipse_70%_50%_at_80%_90%,rgba(212,185,138,0.35),transparent_55%),radial-gradient(ellipse_60%_80%_at_50%_50%,#fbf8f3,#f6f1ea_60%,#efe7db_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-20 bg-[linear-gradient(rgba(184,153,105,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(184,153,105,0.04)_1px,transparent_1px)] bg-[length:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

        <motion.div
          className="absolute -z-10 w-[400px] h-[400px] bg-[#e5c6b5] rounded-full blur-[60px] opacity-50 top-[-100px] left-[-100px]"
          animate={{
            x: mousePos.x * 12,
            y: mousePos.y * 12,
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -z-10 w-[500px] h-[500px] bg-[#d4b98a] rounded-full blur-[60px] opacity-50 bottom-[-150px] right-[-100px]"
          animate={{
            x: mousePos.x * 24,
            y: mousePos.y * 24,
            scale: [1, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: -9 }}
        />

        {/* Corner Decorations */}
        {[
          { pos: 'top-8 left-8', transform: '' },
          { pos: 'top-8 right-8', transform: 'scale-x-[-1]' },
          { pos: 'bottom-8 left-8', transform: 'scale-y-[-1]' },
          { pos: 'bottom-8 right-8', transform: 'scale-[-1]' },
        ].map((corner, i) => (
          <motion.div
            key={i}
            className={`absolute z-10 hidden lg:block ${corner.pos} ${corner.transform}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 1.4 }}
          >
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" stroke="#b89969" strokeWidth="1">
              <path d="M1 30 V1 H30" />
              <path d="M10 10 L25 10 M10 10 L10 25" />
              <circle cx="10" cy="10" r="2.5" fill="#b89969" stroke="none" />
              <path d="M15 15 Q25 20 20 30 Q15 40 25 45" opacity="0.6" />
            </svg>
          </motion.div>
        ))}

        {/* Brand Header */}
        <motion.div
          className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="font-inter text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] text-[#8a6f47] uppercase mb-1.5">
            Beauté · Élégance · Raffinement
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3.5">
            <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-transparent to-[#b89969]" />
            <div className="font-italian text-[11px] sm:text-[13px] tracking-[0.2em] sm:tracking-[0.4em] text-[#8a6f47] whitespace-nowrap">
              VENDÔME · LAC 2 · TUNIS
            </div>
            <div className="w-6 sm:w-10 h-px bg-gradient-to-l from-transparent to-[#b89969]" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-[900px] text-center relative z-30 mt-20 sm:mt-0">
          <motion.div
            className="font-inter text-[9px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.6em] uppercase text-[#8a6f47] mb-5 sm:mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.7, duration: 1 }}
          >
            <span className="relative px-2 sm:px-3.5 before:absolute before:right-full before:top-1/2 before:w-[20px] sm:before:w-[30px] before:h-px before:bg-[#b89969] after:absolute after:left-full after:top-1/2 after:w-[20px] sm:after:w-[30px] after:h-px after:bg-[#b89969]">
              Une soirée d'exception
            </span>
          </motion.div>

          <h1 className="font-italian text-[clamp(56px,11vw,160px)] font-normal text-[#2a241d] leading-[0.95] tracking-tight mb-5">
            {['Joyeux', 'Anniversaire', 'Vendôme'].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden align-top px-[0.05em]">
                <motion.span
                  className={`inline-block ${i === 1 ? 'italic font-cormorant text-[#8a6f47]' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 3.6 + (i * 0.15), duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {word}{i < 2 ? <br className={i === 1 ? 'block' : 'hidden'} /> : ''}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="font-cormorant italic text-[clamp(18px,2.2vw,26px)] text-[#4a4238] mt-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.3, duration: 1.2 }}
          >
            Beauty & Spa — Lac 2
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 1 }}
          >
            <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#b89969] to-transparent" />
            <div className="w-2 h-2 bg-[#b89969] rotate-45 relative before:absolute before:w-1 before:h-1 before:bg-[#b89969] before:top-0.5 before:-left-2.5 after:absolute after:w-1 after:h-1 after:bg-[#b89969] after:top-0.5 after:-right-2.5" />
            <div className="w-[60px] h-px bg-gradient-to-l from-transparent via-[#b89969] to-transparent" />
          </motion.div>

          <motion.p
            className="font-cormorant text-[clamp(16px,1.6vw,19px)] font-light text-[#4a4238] leading-relaxed max-w-[580px] mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.7, duration: 1.2 }}
          >
            Nous avons l'immense plaisir de vous convier à célébrer, en notre compagnie,{' '}
            <strong className="text-[#8a6f47] font-medium tracking-wide">
              une année de beauté, de bien-être et de moments privilégiés
            </strong>.
            Laissez-vous porter par une soirée raffinée, pensée avec passion pour nos très chères clientes.
          </motion.p>

          <Countdown />

          <motion.div
            className="inline-block py-5 px-11 border-y border-[#b89969] relative my-5 sm:my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.1, duration: 1.2 }}
          >
            <div className="absolute left-[-3px] top-1/2 -mt-[3px] w-1.5 h-1.5 border border-[#b89969] rotate-45 bg-[#fbf8f3]" />
            <div className="absolute right-[-3px] top-1/2 -mt-[3px] w-1.5 h-1.5 border border-[#b89969] rotate-45 bg-[#fbf8f3]" />
            <div className="font-italian text-[clamp(22px,3vw,30px)] text-[#8a6f47] tracking-[0.3em] uppercase">
              25 Avril
            </div>
            <div className="font-inter text-[10px] tracking-[0.5em] text-[#4a4238] uppercase mt-1.5">
              Samedi · à partir de 14h
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.3, duration: 1.2 }}
          >
            <a href="#details" className="group relative inline-flex items-center gap-3 py-4 px-9 bg-[#2a241d] text-[#f6f1ea] border border-[#b89969] text-[11px] tracking-[0.3em] uppercase transition-colors overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Découvrir la soirée
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-[#8a6f47] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
            <a href="https://instagram.com/vendome_beauty_spa" target="_blank" className="group relative inline-flex items-center py-4 px-9 border border-[#b89969] text-[#2a241d] text-[11px] tracking-[0.3em] uppercase overflow-hidden">
              <span className="relative z-10 group-hover:text-[#f6f1ea] transition-colors">Confirmer ma présence</span>
              <div className="absolute inset-0 bg-[#2a241d] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[#8a6f47] z-20 hidden sm:flex"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ delay: 5.8, duration: 1.5, repeat: Infinity }}
        >
          <div className="text-[9px] tracking-[0.5em] uppercase [writing-mode:vertical-rl]">Découvrir</div>
          <div className="w-px h-10 bg-gradient-to-b from-[#b89969] to-transparent relative">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] bg-[#b89969] rounded-full"
              animate={{ top: ['0px', '40px'], opacity: [1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn" }}
            />
          </div>
        </motion.div>
      </section>

      {/* DETAILS SECTION */}
      <section id="details" className="relative py-20 lg:py-40 px-6 bg-[#2a241d] text-[#f6f1ea] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_30%,rgba(184,153,105,0.12),transparent_60%),radial-gradient(ellipse_40%_40%_at_80%_70%,rgba(229,198,181,0.08),transparent_60%)]" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <motion.div
            className="text-center text-[10px] tracking-[0.5em] text-[#d4b98a] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            L'Événement
          </motion.div>
          <motion.h2
            className="text-center font-italian text-[clamp(40px,6vw,72px)] leading-[1.05] mb-4 text-[#f6f1ea]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Une soirée <span className="font-cormorant italic text-[#d4b98a]">inoubliable</span>
          </motion.h2>
          <motion.p
            className="text-center font-cormorant italic text-[clamp(17px,1.8vw,21px)] text-[#f6f1ea]/70 max-w-[600px] mx-auto mb-20 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            « Un an déjà… que Vendôme sublime votre beauté. Pour fêter cette première étoile,
            nous vous réservons une expérience aussi raffinée que chaleureuse. »
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#b89969]/20 border border-[#b89969]/20">
            {[
              { icon: Calendar, k: 'La date', v: '25 Avril 2026', s: 'Samedi soir' },
              { icon: Clock, k: 'L\'heure', v: '14 h 00', s: 'Accueil & cocktail' },
              { icon: MapPin, k: 'Le lieu', v: 'Vendôme Spa', s: 'Les Berges du Lac 2, Tunis', link: 'https://maps.app.goo.gl/2zSc7PeLGi25BNXLA?g_st=ic' },
              { icon: Star, k: 'Le dress code', v: 'Chic & Élégant', s: 'Tenue de soirée' },
            ].map((item, i) => (
              <motion.div
                key={item.k}
                className="bg-[#2a241d] relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-12 text-center hover:bg-[#b89969]/10 transition-colors h-full w-full"
                  >
                    <item.icon className="w-12 h-12 mx-auto mb-6 stroke-[#d4b98a] stroke-[1.2]" />
                    <div className="text-[10px] tracking-[0.4em] text-[#d4b98a] uppercase mb-3.5">{item.k}</div>
                    <div className="font-italian text-2xl text-[#f6f1ea] mb-1.5 leading-tight">{item.v}</div>
                    <div className="font-cormorant italic text-[15px] text-[#f6f1ea]/60">{item.s}</div>
                  </a>
                ) : (
                  <div className="p-12 text-center h-full w-full">
                    <item.icon className="w-12 h-12 mx-auto mb-6 stroke-[#d4b98a] stroke-[1.2]" />
                    <div className="text-[10px] tracking-[0.4em] text-[#d4b98a] uppercase mb-3.5">{item.k}</div>
                    <div className="font-italian text-2xl text-[#f6f1ea] mb-1.5 leading-tight">{item.v}</div>
                    <div className="font-cormorant italic text-[15px] text-[#f6f1ea]/60">{item.s}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Marquee Ribbon */}
          <motion.div
            className="mt-20 py-6 border-y border-[#b89969]/25 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="flex gap-12 whitespace-nowrap animate-marquee">
              {[
                'Hammam', 'Soins du visage', 'Massage signature', 'Manucure & Pédicure',
                'Épilation', 'Coiffure', 'Maquillage', 'Bride\'s Hammam'
              ].concat([
                'Hammam', 'Soins du visage', 'Massage signature', 'Manucure & Pédicure',
                'Épilation', 'Coiffure', 'Maquillage', 'Bride\'s Hammam'
              ]).map((item, i) => (
                <div key={i} className="font-italian text-[clamp(22px,3vw,34px)] text-[#d4b98a] flex items-center gap-12">
                  {item}
                  <span className="text-[#b89969] text-sm">✦</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-[#f6f1ea] text-center relative border-t border-[#b89969]/10">
        <div className="font-italian text-4xl text-[#8a6f47] tracking-wider mb-3">Vendôme</div>
        <div className="font-cormorant italic text-[15px] text-[#4a4238] mb-6">Beauty & Spa · Lac 2 · Tunis</div>

        <div className="flex justify-center gap-5 mb-6">
          <a href="https://instagram.com/vendome_beauty_spa" target="_blank" className="w-9 h-9 inline-flex items-center justify-center border border-[#b89969] rounded-full text-[#8a6f47] hover:bg-[#2a241d] hover:text-[#f6f1ea] hover:border-[#2a241d] transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
          </a>
          <a href="https://wa.me/+21623851338" target="_blank" className="w-9 h-9 inline-flex items-center justify-center border border-[#b89969] rounded-full text-[#8a6f47] hover:bg-[#2a241d] hover:text-[#f6f1ea] hover:border-[#2a241d] transition-all duration-300 hover:-translate-y-1" aria-label="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21l2-6a9 9 0 1 1 4 4z" /><path d="M8.5 10c.5 2 2 3.5 4 4l1.5-1.5 2.5 1v1.5c-2 1-5-.5-6.5-2S7.5 9 8.5 7L10 7.5l1 2.5z" /></svg>
          </a>
          <a href="tel:+21623851338" className="w-9 h-9 inline-flex items-center justify-center border border-[#b89969] rounded-full text-[#8a6f47] hover:bg-[#2a241d] hover:text-[#f6f1ea] hover:border-[#2a241d] transition-all duration-300 hover:-translate-y-1" aria-label="Phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c1 .3 2 .6 3 .7a2 2 0 0 1 1.7 2z" /></svg>
          </a>
        </div>

        <div className="text-[10px] tracking-[0.3em] text-[#8a6f47] uppercase">
          © {new Date().getFullYear()} Vendôme Beauty & Spa · Made with love
        </div>
      </footer>
    </main>
  );
}
