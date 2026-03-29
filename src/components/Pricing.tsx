import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, CheckCircle, CreditCard, Shield, Clock } from 'lucide-react';
import Modal from './Modal';

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
  const [checkoutPlan, setCheckoutPlan] = useState<typeof PLANS[0] | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Will be replaced by user
          subject: "New Subscription Checkout - FitLaunch Demo",
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Plan_Selected: checkoutPlan?.name,
          Billing_Schedule: isYearly ? 'Yearly' : 'Monthly',
          Amount: isYearly ? checkoutPlan?.price.yearly : checkoutPlan?.price.monthly,
          Message: "Someone completed the dummy checkout on the demo site."
        }),
      });
    } catch (err) {
      console.log("Failed to send email", err);
    }

    setCheckoutStep('success');
    setTimeout(() => {
      closeModal();
    }, 10000);
  };

  const closeModal = () => {
    setCheckoutPlan(null);
    setCheckoutStep('form');
    setFormData({ name: '', email: '', phone: '' });
  };

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

            <button 
              onClick={() => {
                setCheckoutPlan(plan);
                setCheckoutStep('form');
              }}
              className={`w-full py-4 font-display uppercase tracking-wider transition-colors skew-x-[-10deg] ${
              plan.highlight
                ? 'bg-neon text-darker hover:bg-white'
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
            }`}>
              <div className="skew-x-[10deg]">Select Plan</div>
            </button>
          </motion.div>
        ))}
      </div>

      {checkoutPlan && (
        <Modal
          isOpen={!!checkoutPlan}
          onClose={closeModal}
          title={checkoutStep === 'success' ? 'Welcome to the Cult' : `Complete Your ${checkoutPlan.name} Subscription`}
        >
          <div className="font-sans text-white">
            {checkoutStep === 'form' && (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="bg-white/5 p-4 rounded mb-6 flex justify-between items-center border border-white/10">
                  <div>
                    <div className="font-bold">{checkoutPlan.name} Plan</div>
                    <div className="text-sm text-gray-400">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  </div>
                  <div className="text-xl font-display text-neon">
                    ${isYearly ? checkoutPlan.price.yearly : checkoutPlan.price.monthly}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-dark border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-dark border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon transition-colors" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-dark border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon transition-colors" 
                      placeholder="(555) 123-4567" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Card Number</label>
                  <div className="relative">
                    <input required type="text" maxLength={19} className="w-full bg-dark border border-white/10 px-3 py-2 pl-10 text-white focus:outline-none focus:border-neon transition-colors" placeholder="0000 0000 0000 0000" />
                    <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Expiry (MM/YY)</label>
                    <input required type="text" maxLength={5} className="w-full bg-dark border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon transition-colors" placeholder="12/25" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">CVC</label>
                    <input required type="text" maxLength={4} className="w-full bg-dark border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon transition-colors" placeholder="123" />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Shield size={14} className="text-neon" />
                  <span>Secure, encrypted checkout</span>
                </div>

                <button type="submit" className="w-full py-3 bg-neon text-darker font-display uppercase tracking-wider hover:bg-white transition-colors skew-x-[-10deg] mt-4">
                  <div className="skew-x-[10deg]">Pay ${isYearly ? checkoutPlan.price.yearly : checkoutPlan.price.monthly}</div>
                </button>
              </form>
            )}

            {checkoutStep === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Clock size={40} className="text-neon" />
                </motion.div>
                <div className="font-display uppercase tracking-wider text-xl">Processing Payment...</div>
                <div className="text-gray-400 text-sm">Please do not close this window</div>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                  <CheckCircle size={56} className="text-neon" />
                </motion.div>
                <div className="font-display uppercase tracking-wider text-2xl pt-1">Payment Successful!</div>
                
                <div className="text-sm bg-dark/80 border border-white/10 p-5 rounded mt-2 w-full text-left">
                  <p className="text-gray-300 mb-3">
                    <strong>Note:</strong> This is a demo site. Your simulated payment and contact info went through locally.
                  </p>
                  <p className="text-gray-300 mb-4">
                    If you want a fully functional website like this, integrated with a real database and a real payment gateway, I can build it for you!
                  </p>
                  <div className="pt-3 border-t border-white/10 text-white space-y-1">
                    <p className="font-bold text-neon mb-2">My Contact Details:</p>
                    <p>🌐 Portfolio: <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="hover:text-neon underline transition-colors">vickyiitp.tech</a></p>
                    <p>📧 Email: <a href="mailto:vickyykumar14@gmail.com" className="hover:text-neon transition-colors">vickyykumar14@gmail.com</a></p>
                    <p>📱 Phone: 8102099678</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
