import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Modal from './Modal';

export default function Hero() {
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send demo data to your email via web3forms
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Will be replaced by user
          subject: "New Free Trial Request - FitLaunch Demo",
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Message: "Someone requested a free trial through the demo website."
        }),
      });
    } catch (err) {
      console.log("Failed to send email", err);
    }

    setSubmitStatus('success');
    setTimeout(() => {
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '' }); // reset form
      setTimeout(() => setSubmitStatus('idle'), 300); // reset after transition
    }, 10000);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark z-10" />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter uppercase mb-6">
            Forge Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-400">Legacy</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Elite trainers, state-of-the-art equipment, and a community that pushes you beyond your limits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button onClick={() => setIsModalOpen(true)} className="group relative px-8 py-4 bg-neon text-darker font-display text-xl uppercase tracking-widest skew-x-[-10deg] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)]">
            <div className="skew-x-[10deg] flex items-center gap-2">
              Start Free Trial
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </div>
          </button>
        </motion.div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Start Free Trial">
        {submitStatus === 'success' ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center text-white">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
              <CheckCircle size={56} className="text-neon" />
            </motion.div>
            <div className="font-display uppercase tracking-wider text-2xl pt-1">You're on the list!</div>
            
            <div className="text-sm bg-dark/80 border border-white/10 p-5 rounded mt-2 w-full text-left">
              <p className="text-gray-300 mb-3">
                <strong>Note:</strong> This is a demo site. Your simulated submission went through locally.
              </p>
              <p className="text-gray-300 mb-4">
                If you need this website fully integrated with a real database to track member signups, I can build it for you!
              </p>
              <div className="pt-3 border-t border-white/10 text-white space-y-1">
                <p className="font-bold text-neon mb-2">My Contact Details:</p>
                <p>🌐 Portfolio: <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="hover:text-neon underline transition-colors">vickyiitp.tech</a></p>
                <p>📧 Email: <a href="mailto:vickyykumar14@gmail.com" className="hover:text-neon transition-colors">vickyykumar14@gmail.com</a></p>
                <p>📱 Phone: 8102099678</p>
              </div>
            </div>
          </div>
        ) : (
          <form className="space-y-4 font-sans" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-dark border border-white/10 px-4 py-2 text-white focus:border-neon outline-none transition-colors" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-dark border border-white/10 px-4 py-2 text-white focus:border-neon outline-none transition-colors" 
                placeholder="john@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-dark border border-white/10 px-4 py-2 text-white focus:border-neon outline-none transition-colors" 
                placeholder="(555) 000-0000" 
              />
            </div>
            <button type="submit" className="w-full py-3 mt-4 bg-neon text-darker font-display uppercase tracking-wider hover:bg-white transition-colors skew-x-[-10deg]">
              <div className="skew-x-[10deg]">Claim My Trial</div>
            </button>
          </form>
        )}
      </Modal>
    </section>
  );
}
