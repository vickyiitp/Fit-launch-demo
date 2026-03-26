import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
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
          <form className="space-y-6 font-sans" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input type="text" className="w-full bg-dark border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" className="w-full bg-dark border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-dark border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors" placeholder="I'm ready to start..."></textarea>
            </div>
            <button className="w-full py-4 bg-neon text-darker font-display uppercase tracking-wider hover:bg-white transition-colors skew-x-[-10deg]">
              <div className="skew-x-[10deg]">Send Message</div>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
