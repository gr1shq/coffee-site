// app/(sections)/Hero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Dancing_Script } from 'next/font/google';
import { motion } from 'framer-motion';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-dancing-script',
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation trigger
  useEffect(() => {
    console.log('Hero Section Mounted'); // Debug log
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-animate]').forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative h-[60vh] flex items-center px-4 bg-brown-600 overflow-hidden" ref={sectionRef}>
      {/* Parallax Background */}
      <Image
        src="/images/coffee-shop-bg.jpg"
        alt="Neon Brew coffee shop"
        fill
        className="object-cover z-0"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        onError={() => console.error('Failed to load coffee-shop-bg.jpg')} // Debug log
      />
      {/* Animated Coffee Beans */}
      <Image
        src="/images/coffee-bean.png"
        alt="Coffee bean"
        width={30}
        height={30}
        className="absolute top-20 left-10 animate-float z-10"
        data-animate
      />
      <Image
        src="/images/coffee-bean.png"
        alt="Coffee bean"
        width={30}
        height={30}
        className="absolute bottom-20 right-20 animate-float-delayed z-10"
        data-animate
        style={{ animationDelay: '1s' }}
      />
      {/* Steam Wisp */}
      <Image
        src="/images/steam.png"
        alt="Steam wisp"
        width={50}
        height={50}
        className="absolute top-1/3 left-1/4 animate-steam z-10"
        data-animate
        style={{ animationDelay: '0.5s' }}
      />
      <div className="relative z-20 max-w-6xl mx-auto text-center">
        <h1
          className={`text-4xl md:text-6xl font-bold text-white ${dancingScript.variable} dancing-script fade-in-up`}
          data-animate
        >
          Neon Brew Coffee
        </h1>
        <p
          className="mt-2 text-lg md:text-xl font-inter text-white fade-in-up"
          data-animate
          style={{ animationDelay: '200ms' }}
        >
          Crafted Coffee, Cozy Vibes
        </p>
        <a
          href="#booking"
          className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white font-inter px-8 py-3 rounded-full hover:bg-green-700 transition-colors animate-pulse-cta fade-in-up"
          data-animate
          style={{ animationDelay: '400ms' }}
          aria-label="Reserve a table"
        >
          <Image
            src="/images/steam.png"
            alt="Coffee cup icon"
            width={20}
            height={20}
          />
          Reserve a Table
        </a>
        <motion.div
          className="mt-6 text-sm md:text-base font-inter text-white/80 fade-in-up"
          data-animate
          style={{ animationDelay: '600ms' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          “Best latte in town!” — Happy Customer
        </motion.div>
      </div>
    </section>
  );
}