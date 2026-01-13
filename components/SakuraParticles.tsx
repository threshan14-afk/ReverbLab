
import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
  rotation: string;
  opacity: number;
}

const SakuraParticles: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: `${5 + Math.random() * 10}px`,
      rotation: `${Math.random() * 360}deg`,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-50px]"
          style={{
            left: petal.left,
            animation: `fall ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
          }}
        >
          <div
            style={{
              width: petal.size,
              height: `calc(${petal.size} * 1.5)`,
              background: 'linear-gradient(to bottom right, #ffb7c5, #ff69b4)',
              borderRadius: '50% 0% 50% 50%',
              opacity: petal.opacity,
              transform: `rotate(${petal.rotation})`,
              filter: 'blur(1px)',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) translateX(150px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SakuraParticles;
