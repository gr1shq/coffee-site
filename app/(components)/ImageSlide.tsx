'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageSlideProps {
  src: string;
  alt: string;
  index: number;
}

export default function ImageSlide({ src, alt, index }: ImageSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slide = slideRef.current;
    if (!slide) return;

    const handleScroll = () => {
      const rect = slide.getBoundingClientRect();
      const viewportCenter = window.innerWidth / 2;
      const slideCenter = rect.left + rect.width / 2;
      const distanceFromCenter = Math.abs(viewportCenter - slideCenter);
      const scale = 1 - distanceFromCenter / window.innerWidth * 0.1;
      slide.style.transform = `scale(${scale})`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={slideRef} className="relative w-full h-full rounded-lg overflow-hidden will-change-transform">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, 80vw"
        loading={index === 0 ? 'eager' : 'lazy'}
      />
    </div>
  );
}