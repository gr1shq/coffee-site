'use client';
import { useEffect, useRef, useState } from 'react';
import ImageSlide from '../(components)/ImageSlide';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

interface Image {
  src: string;
  alt: string;
  caption: string; // Added for caption reveal
}

const images: Image[] = [
  { src: '/images/coffee-interior.webp', alt: 'Coffee shop interior', caption: 'Cozy Interior' },
  { src: '/images/coffee-cup2.webp', alt: 'Latte art', caption: 'Artisan Latte' },
  { src: '/images/coffee-work.webp', alt: 'Barista working', caption: 'Craft in Action' },
  { src: '/images/coffee-bar.jpg', alt: 'Coffee kitchen', caption: 'Coffe Kitchen' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Background parallax
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrollY = window.scrollY;
      const sectionTop = section.getBoundingClientRect().top + scrollY;
      const bg = section.querySelector('.gallery-bg');
      if (bg) {
        const offset = (scrollY - sectionTop) * 0.15; // Subtle parallax
        (bg as HTMLElement).style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Modal navigation
  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Click outside modal to close
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) closeModal();
  };

  return (
    <section
      id="gallery"
      className="py-16 px-4 bg-white relative overflow-hidden"
      ref={sectionRef}
      role="region"
      aria-label="Coffee shop gallery"
    >
      {/* Background Parallax */}
      <div
        className="gallery-bg absolute inset-0 bg-[url('/images/coffee-beans-bg.jpg')] bg-cover bg-center opacity-10 will-change-transform"
        style={{ zIndex: 0 }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className="text-3xl md:text-4xl font-inter font-bold text-center text-gray-900 mb-12 fade-in-up"
          data-animate
        >
          Our Coffee Shop Vibe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <button
              key={img.src}
              className="relative w-full h-[30vh] rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 fade-in-up group"
              onClick={() => openModal(index)}
              data-animate
              style={{ animationDelay: `${index * 150}ms` }}
              aria-label={`View ${img.alt}`}
            >
              <ImageSlide src={img.src} alt={img.alt} index={index} />
              <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-inter">{img.caption}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          ref={modalRef}
          onClick={handleModalClick}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-700 transition-colors lightbox-button"
            onClick={closeModal}
            aria-label="Close lightbox"
          >
            <FaTimes size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-gray-700 transition-colors lightbox-button"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <FaChevronLeft size={24} />
          </button>
          <div className="w-[90vw] md:w-[70vw] h-[60vh] relative lightbox-image">
            <ImageSlide
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              index={selectedImage}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-inter">
              {images[selectedImage].caption}
            </div>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:bg-gray-700 transition-colors lightbox-button"
            onClick={nextImage}
            aria-label="Next image"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}