// app/(components)/Header.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '#menu' },
    { name: 'Book a Table', href: '#booking' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Visit Us', href: '#map' },
    { name: 'Follow Us', href: '#social' },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-inter font-bold text-gray-900">Neon Brew</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 font-inter hover:text-green-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 font-inter hover:text-green-600 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}