import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const REVIEWS = [
  { name: 'David R.', role: 'Powerlifter', text: 'Best gym I have ever joined. The trainers actually care about your progress and the equipment is world-class.', rating: 5 },
  { name: 'Jessica M.', role: 'CrossFit Athlete', text: 'The HIIT classes are brutal but effective. Lost 10lbs in my first month and never felt stronger.', rating: 5 },
  { name: 'Michael T.', role: 'Marathon Runner', text: 'Incredible atmosphere. Everyone is pushing each other to be better. The recovery lounge is a lifesaver.', rating: 5 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-16 text-center"
        >
          Wall of <span className="text-neon">Fame</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-dark p-8 border border-white/5 relative"
            >
              <div className="flex gap-1 text-neon mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 font-sans italic mb-8">"{review.text}"</p>
              <div>
                <div className="font-display text-xl uppercase tracking-wide">{review.name}</div>
                <div className="text-neon text-sm font-sans">{review.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
