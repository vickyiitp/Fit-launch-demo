import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 py-12 px-6 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-neon">
          <Dumbbell size={24} />
          <span className="font-display text-xl tracking-wider uppercase text-white">Fit<span className="text-neon">Launch</span></span>
        </div>
        <div className="text-gray-500 font-sans text-sm">
          &copy; {new Date().getFullYear()} FitLaunch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
