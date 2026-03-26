import { motion } from 'motion/react';
import { useRef } from 'react';

const TRAINERS = [
  {
    name: 'Marcus Vance',
    role: 'Head Strength Coach',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    stats: { experience: '10 Yrs', specialty: 'Powerlifting' }
  },
  {
    name: 'Sarah Connor',
    role: 'HIIT Specialist',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop',
    stats: { experience: '6 Yrs', specialty: 'Endurance' }
  },
  {
    name: 'Alex Mercer',
    role: 'CrossFit Elite',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop',
    stats: { experience: '8 Yrs', specialty: 'Olympic Lifting' }
  },
  {
    name: 'Elena Rostova',
    role: 'Yoga & Mobility',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    stats: { experience: '12 Yrs', specialty: 'Flexibility' }
  }
];

export default function Trainers() {
  const scrollRef = useRef(null);

  return (
    <section id="trainers" className="py-24 bg-surface border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight">Elite <span className="text-neon">Trainers</span></h2>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar px-6 pb-12 snap-x snap-mandatory max-w-7xl mx-auto"
      >
        {TRAINERS.map((trainer, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            key={trainer.name}
            className="min-w-[300px] md:min-w-[400px] h-[500px] relative group snap-center overflow-hidden bg-dark"
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-display text-3xl uppercase tracking-wide mb-1 text-white">{trainer.name}</h3>
              <p className="text-neon font-sans text-sm font-medium mb-4">{trainer.role}</p>

              <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded">
                  <div className="text-xs text-gray-400 uppercase">Exp</div>
                  <div className="font-mono font-bold">{trainer.stats.experience}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded">
                  <div className="text-xs text-gray-400 uppercase">Focus</div>
                  <div className="font-mono font-bold">{trainer.stats.specialty}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
