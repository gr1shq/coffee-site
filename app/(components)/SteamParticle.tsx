// app/components/SteamParticle.tsx
const steamParticles = Array.from({ length: 10 }, (_, i) => ({
    width: `${4 + (i % 2)}px`,
    height: `${4 + (i % 2)}px`,
    left: `${20 + (i * 6)}%`,
    bottom: `${10 + (i * 5)}%`,
    animationDelay: `${0.3 + i * 0.2}s`,
  }));
  
  export default function SteamParticle() {
    return (
      <div className="absolute inset-0 z-5 pointer-events-none">
        {steamParticles.map((style, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-steamRise"
            style={style}
          />
        ))}
      </div>
    );
  }