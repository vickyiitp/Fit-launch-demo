import { motion } from 'motion/react';
import { Dumbbell } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-dark/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2 text-neon">
        <Dumbbell size={32} />
        <span className="font-display text-2xl tracking-wider uppercase text-white">Fit<span className="text-neon">Launch</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-gray-300">
        <a href="#features" className="hover:text-neon transition-colors">Features</a>
        <a href="#schedule" className="hover:text-neon transition-colors">Schedule</a>
        <a href="#trainers" className="hover:text-neon transition-colors">Trainers</a>
        <a href="#pricing" className="hover:text-neon transition-colors">Pricing</a>
        <a href="#contact" className="hover:text-neon transition-colors">Contact</a>
      </div>
      <a href="#pricing" className="bg-neon text-darker px-6 py-2 font-display uppercase tracking-wider text-sm hover:bg-white transition-colors skew-x-[-10deg] inline-block">
        <div className="skew-x-[10deg]">Join Now</div>
      </a>
    </motion.nav>
  );
}
