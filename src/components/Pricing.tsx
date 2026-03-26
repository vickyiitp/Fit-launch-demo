import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Basic',
    price: { monthly: 49, yearly: 490 },
    features: ['Access to gym floor', 'Locker room access', '1 Group class/month', 'Free WiFi'],
    highlight: false
  },
  {
    name: 'Pro',
    price: { monthly: 89, yearly: 890 },
    features: ['Unlimited gym access', 'Unlimited group classes', '1 PT session/month', 'Sauna access', 'Nutrition guide'],
    highlight: true
  },
  {
    name: 'Elite',
    price: { monthly: 149, yearly: 1490 },
    features: ['Everything in Pro', 'Unlimited PT sessions', 'Recovery lounge access', 'Guest passes (4/month)', 'Priority booking'],
    highlight: false
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-6"
        >
          Choose Your <span className="text-neon">Arsenal</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 font-sans"
        >
          <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-8 bg-surface rounded-full p-1 relative border border-white/10"
          >
            <motion.div
              layout
              className="w-6 h-6 bg-neon rounded-full"
              animate={{ x: isYearly ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-gray-500'}`}>
            Yearly <span className="text-neon text-xs ml-1">(Save 20%)</span>
          </span>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-center">
        {PLANS.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative p-8 bg-surface flex flex-col h-full ${
              plan.highlight
                ? 'ring-2 ring-neon shadow-[0_0_30px_rgba(204,255,0,0.15)] md:-translate-y-4 z-10'
                : 'border border-white/5'
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon text-darker px-4 py-1 font-display uppercase tracking-wider text-sm skew-x-[-10deg]">
                <div className="skew-x-[10deg]">Most Popular</div>
              </div>
            )}

            <h3 className="font-display text-3xl uppercase tracking-wide mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="font-display text-5xl text-neon">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
              <span className="text-gray-400 font-sans text-sm">/{isYearly ? 'yr' : 'mo'}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow font-sans text-sm text-gray-300">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-3">
                  <Check size={18} className="text-neon shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 font-display uppercase tracking-wider transition-colors skew-x-[-10deg] ${
              plan.highlight
                ? 'bg-neon text-darker hover:bg-white'
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
            }`}>
              <div className="skew-x-[10deg]">Select Plan</div>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
