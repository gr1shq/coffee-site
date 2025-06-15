'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
    <section id="about" className="py-16 px-4 bg-gray-50" ref={sectionRef}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-inter font-bold text-gray-900 mb-8 fade-in-up" data-animate>
          Our Story
        </h2>
        <p className="text-lg font-inter text-gray-700 fade-in-up" data-animate style={{ animationDelay: '200ms' }}>
          Neon Brew is a family-owned coffee shop dedicated to crafting exceptional coffee with care. Located in [City], we source our beans ethically and create a welcoming space for coffee lovers to connect and relax.
        </p>
      </div>
    </section>
  );
}