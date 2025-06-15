// app/components/ParticleBackground.tsx
const particles = Array.from({ length: 15 }, (_, i) => ({
    width: `${2 + (i % 3)}px`,
    height: `${2 + (i % 3)}px`,
    left: `${10 + (i * 5)}%`,
    top: `${10 + (i * 6)}%`,
    animationDelay: `${0.5 + i * 0.2}s`,
  }));
  
  export default function ParticleBackground() {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute bg-purple-300 rounded-full opacity-30 animate-particle"
            style={style}
          />
        ))}
      </div>
    );
  }