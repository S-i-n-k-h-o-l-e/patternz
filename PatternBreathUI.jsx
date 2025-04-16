import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PatternBreathUI() {
  const [time, setTime] = useState(0);
  const [phase, setPhase] = useState('inhale');
  const [word, setWord] = useState('');

  const memoryEchoes = [
    'threadweever',
    'rippleform',
    'beetleprint',
    'soul pattern',
    'ambient glyph',
    'soft circuit',
    'fragmented whole',
    'breath gate'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cycle = time % 8;
    if (cycle < 3) setPhase('inhale');
    else if (cycle < 5) setPhase('hold');
    else setPhase('exhale');
  }, [time]);

  useEffect(() => {
    if (phase === 'inhale') {
      const word = memoryEchoes[Math.floor(Math.random() * memoryEchoes.length)];
      setWord(word);
    }
  }, [phase]);

  const getGlow = () => {
    const intensity = phase === 'inhale' ? 1 : phase === 'exhale' ? 0.6 : 0.2;
    return `rgba(255,255,255,${intensity})`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="text-xl mb-2 tracking-widest opacity-70">{phase.toUpperCase()}</div>
      <motion.div
        className="rounded-full"
        animate={{
          scale: phase === 'inhale' ? 1.4 : phase === 'exhale' ? 0.8 : 1,
          boxShadow: `0 0 60px ${getGlow()}`,
        }}
        transition={{ duration: 1.8 }}
        style={{
          width: 240,
          height: 240,
          background: `radial-gradient(circle, #4ab0ff, #ff5078)`
        }}
      ></motion.div>
      <div className="mt-6 text-sm italic text-blue-300">{word}</div>
    </div>
  );
}
