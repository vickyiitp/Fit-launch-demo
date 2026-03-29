import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('submitting');
    
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: "New Contact Message - FitLaunch Demo",
          Name: formData.name,
          Email: formData.email,
          Message: formData.message
        }),
      });
    } catch (err) {
      console.log("Failed to send email", err);
    }

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 10 seconds
    setTimeout(() => {
      setStatus('idle');
    }, 10000);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-6">
            Join The <span className="text-neon">Cult</span>
          </h2>
          <p className="text-gray-400 font-sans mb-12 max-w-md">
            Ready to transform? Drop by our facility or send us a message. We're ready when you are.
          </p>

          <div className="space-y-6 font-sans">
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 bg-surface flex items-center justify-center text-neon border border-white/5">
                <MapPin size={20} />
              </div>
              <div>
                <div className="font-bold text-white">Location</div>
                <div>123 Iron Street, Muscle City, MC 90210</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 bg-surface flex items-center justify-center text-neon border border-white/5">
                <Phone size={20} />
              </div>
              <div>
                <div className="font-bold text-white">Phone</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="w-12 h-12 bg-surface flex items-center justify-center text-neon border border-white/5">
                <Mail size={20} />
              </div>
              <div>
                <div className="font-bold text-white">Email</div>
                <div>ignite@fitlaunch.com</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-surface p-8 border border-white/5"
        >
          <form className="space-y-6 font-sans" onSubmit={handleSubmit}>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-dark/80 border border-neon text-white p-6 rounded"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-neon" size={24} />
                  <span className="text-lg font-bold text-neon uppercase tracking-wider">Message Sent Successfully!</span>
                </div>
                <div className="text-sm text-gray-300 space-y-3">
                  <p><strong>Note:</strong> This is a demo site. Your simulated message went through.</p>
                  <p>If you're looking for a developer to build a fully functional website with real database integration and payment gateways, I can build it for you!</p>
                  <div className="pt-3 mt-3 border-t border-white/10 text-white">
                    <p className="font-bold text-neon mb-2">Hire Me:</p>
                    <p>🌐 Portfolio: <a href="https://vickyiitp.tech" target="_blank" rel="noreferrer" className="hover:text-neon underline transition-colors">vickyiitp.tech</a></p>
                    <p>📧 Email: <a href="mailto:vickyykumar14@gmail.com" className="hover:text-neon transition-colors">vickyykumar14@gmail.com</a></p>
                    <p>📱 Phone: 8102099678</p>
                  </div>
                </div>
              </motion.div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-dark border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-dark border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" 
                placeholder="john@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                rows={4} 
                required
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-dark border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" 
                placeholder="I'm ready to start..."
              ></textarea>
            </div>
            <button 
              disabled={status === 'submitting'}
              className="w-full py-4 bg-neon text-darker font-display uppercase tracking-wider hover:bg-white transition-colors skew-x-[-10deg] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="skew-x-[10deg]">
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </div>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
