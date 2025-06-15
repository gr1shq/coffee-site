// app/(sections)/Booking.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function Booking() {
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

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log({
      name: formData.get('name'),
      date: formData.get('date'),
      time: formData.get('time'),
      party: formData.get('party'),
    });
    alert('Table booked! Check console for details.');
  };

  return (
    <section id="booking" className="py-16 px-4 bg-gray-50" ref={sectionRef}>
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl md:text-4xl font-inter font-bold text-center text-gray-900 mb-8 fade-in-up" data-animate>
          Book a Table
        </h2>
        <form
          onSubmit={handleBooking}
          className="bg-white p-6 rounded-lg shadow-md fade-in-up"
          data-animate
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-inter font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              required
              aria-label="Your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-inter font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full border border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              required
              aria-label="Reservation date"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-inter font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="w-full border border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              required
              aria-label="Reservation time"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="party" className="block text-sm font-inter font-medium text-gray-700 mb-2">
              Party Size
            </label>
            <input
              type="number"
              id="party"
              name="party"
              min="1"
              className="w-full border border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
              required
              aria-label="Number of people"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-inter py-2 rounded hover:bg-green-700 transition-colors"
            aria-label="Submit booking"
          >
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
}