'use client';
import { useEffect, useRef, useState } from 'react';
import { FaInstagram, FaTwitter } from 'react-icons/fa'; // Add react-icons

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('[data-animate]').forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * 100); // Faster animation
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate newsletter signup (replace with actual API call)
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000); // Reset after 3s
    setEmail('');
  };

  return (
    <footer className="py-12 px-4 bg-brown-600 text-black" ref={sectionRef}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="text-center md:text-left fade-in-up" data-animate>
          <h3 className="text-xl font-inter font-bold mb-4">Neon Brew Coffee</h3>
          <p className="text-sm font-inter">
            123 Brew St, [City, State]<br />
            <a href="mailto:contact@neonbrew.com" className="hover:underline">
              contact@neonbrew.com
            </a>
            <br />
            Open: Mon-Sun, 7 AM - 8 PM
          </p>
        </div>
        {/* Navigation Links */}
        <div className="text-center fade-in-up" data-animate style={{ animationDelay: '100ms' }}>
          <h3 className="text-xl font-inter font-bold mb-4">Explore</h3>
          <ul className="text-sm font-inter space-y-2">
            <li><a href="#menu" className="hover:underline">Menu</a></li>
            <li><a href="#booking" className="hover:underline">Reservations</a></li>
            <li><a href="#gallery" className="hover:underline">Gallery</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        {/* Newsletter & Socials */}
        <div className="text-center md:text-right fade-in-up" data-animate style={{ animationDelay: '200ms' }}>
          <h3 className="text-xl font-inter font-bold mb-4">Stay Connected</h3>
          <form onSubmit={handleSubscribe} className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full md:w-auto px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
              aria-label="Email for newsletter"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition-colors"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
            {subscribed && (
              <p className="text-sm mt-2 text-green-300">Thanks for subscribing!</p>
            )}
          </form>
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              aria-label="Follow Neon Brew on Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-300 transition-colors"
              aria-label="Follow Neon Brew on X"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="col-span-1 md:col-span-3 text-center mt-8 fade-in-up" data-animate style={{ animationDelay: '300ms' }}>
          <p className="text-sm font-inter">
            Neon Brew © {new Date().getFullYear()} | Made with ☕ by{' '}
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
      </div>
    </footer>
  );
}