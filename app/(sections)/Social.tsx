'use client';
import { useEffect, useRef } from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function Social() {
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-animate]').forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Mock Instagram posts (replace with API data in production)
  const posts = [
    { id: 1, src: '/images/post1.jpg', alt: 'Coffee post 1', caption: 'Morning latte vibes ☕' },
    { id: 2, src: '/images/post2.png', alt: 'Coffee post 2', caption: 'Cozy corner at Neon Brew' },
    { id: 3, src: '/images/post3.jpg', alt: 'Coffee post 3', caption: 'Open daily!' },
  ];

  return (
    <section
      id="social"
      className="py-16 px-4 bg-brown-600 text-white relative overflow-hidden"
      ref={sectionRef}
      role="region"
      aria-label="Social media showcase"
    >
      {/* Background Parallax */}
      <div
        className="absolute inset-0 bg-[url('/images/coffee-beans-bg.jpg')] bg-cover bg-center opacity-10 will-change-transform"
        style={{ transform: 'translateY(0)' }}
      />
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h2
          className="text-3xl md:text-4xl font-inter font-bold mb-8 fade-in-up"
          data-animate
        >
          Join Our Coffee Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 fade-in-up group"
              data-animate
              style={{ animationDelay: `${index * 150}ms` }}
              aria-label={`View Instagram post: ${post.caption}`}
            >
              <img
                src={post.src}
                alt={post.alt}
                className="w-full h-[25vh] object-cover"
                onError={() => console.error(`Failed to load ${post.src}`)}
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-inter">{post.caption}</span>
              </div>
            </a>
          ))}
        </div>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white font-inter px-8 py-3 rounded-full hover:bg-green-700 transition-colors animate-pulse-cta fade-in-up"
          data-animate
          style={{ animationDelay: '450ms' }}
          aria-label="Follow Neon Brew on Instagram"
        >
          <FaInstagram size={20} />
          Follow Us on Instagram
        </a>
        <p
          className="text-sm font-inter mt-8 fade-in-up"
          data-animate
          style={{ animationDelay: '600ms' }}
        >
          Social powered by{' '}
          <a
            href="https://tapecode.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-300"
          >
            Tapecode
          </a>
        </p>
      </div>
    </section>
  );
}