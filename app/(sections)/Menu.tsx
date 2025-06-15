// app/(sections)/Menu.tsx
'use client';

import { useEffect, useRef } from 'react';
import MenuItem from '../(components)/MenuItem';

export default function Menu() {
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

  const menuItems = [
    { name: 'Latte', price: 4.5, image: '/images/latte.jpg', tags: ['Vegan'] },
    { name: 'Croissant', price: 3.0, image: '/images/croissant.jpg', tags: ['Vegetarian'] },
    { name: 'Espresso', price: 2.5, image: '/images/espresso.jpg', tags: [] },
    { name: 'Cappuccino', price: 4.0, image: '/images/cappuccino.webp', tags: ['Gluten-Free'] },
  ];

  return (
    <section id="menu" className="py-16 px-4 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-inter font-bold text-center text-gray-900 mb-8 fade-in-up" data-animate>
          Our Menu
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.name}
              name={item.name}
              price={item.price}
              image={item.image}
              tags={item.tags}
              animationDelay={`${index * 200}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}