'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Map() {
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
    <section id="map" className="py-16 px-4 bg-gray-50" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-inter font-bold text-center text-gray-900 mb-8 fade-in-up" data-animate>
          Visit Us
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 fade-in-up" data-animate style={{ animationDelay: '200ms' }}>
            <Image
              src="/images/map.jpg"
              alt="Neon Brew location map"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center fade-in-up" data-animate style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-inter font-semibold text-gray-900 mb-2">Neon Brew</h3>
            <p className="text-sm font-inter text-gray-700 mb-2">123 Brew St, [City]</p>
            <p className="text-sm font-inter text-gray-700">Open: Mon-Sun, 7 AM - 8 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}