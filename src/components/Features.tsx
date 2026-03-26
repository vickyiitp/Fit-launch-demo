import { motion } from 'motion/react';
import { Dumbbell, Clock, Shield, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Clock, title: '24/7 Access', desc: 'Train on your schedule, day or night. Your keycard grants you unlimited access.' },
  { icon: Dumbbell, title: 'Elite Equipment', desc: 'Top-tier machines, free weights, and functional training rigs.' },
  { icon: Zap, title: 'High Energy', desc: 'An atmosphere designed to push you further with curated playlists and lighting.' },
  { icon: Shield, title: 'Safe & Clean', desc: 'Immaculate facilities maintained daily with state-of-the-art ventilation.' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-4"
        >
          The <span className="text-neon">Arsenal</span>
        </motion.h2>
        <p className="text-gray-400 font-sans max-w-xl mx-auto">Everything you need to build your best self.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface border border-white/5 p-8 hover:border-neon/50 transition-colors group"
            >
              <div className="w-14 h-14 bg-dark flex items-center justify-center mb-6 group-hover:bg-neon group-hover:text-darker transition-colors text-neon">
                <Icon size={28} />
              </div>
              <h3 className="font-display text-2xl uppercase tracking-wide mb-3">{feat.title}</h3>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
