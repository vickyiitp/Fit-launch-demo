import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, User } from 'lucide-react';
import Modal from './Modal';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SCHEDULE_DATA = {
  Mon: [
    { id: 1, time: '06:00 AM', name: 'CrossFit WOD', trainer: 'Alex Mercer', type: 'Strength' },
    { id: 2, time: '09:00 AM', name: 'HIIT Blast', trainer: 'Sarah Connor', type: 'Cardio' },
    { id: 3, time: '05:30 PM', name: 'Powerlifting', trainer: 'Marcus Vance', type: 'Strength' },
  ],
  Tue: [
    { id: 4, time: '07:00 AM', name: 'Vinyasa Yoga', trainer: 'Elena Rostova', type: 'Flexibility' },
    { id: 5, time: '12:00 PM', name: 'Core Crusher', trainer: 'Alex Mercer', type: 'Core' },
    { id: 6, time: '06:00 PM', name: 'Muay Thai', trainer: 'Tony Jaa', type: 'Combat' },
  ]
};

// Fill missing days with some data for the demo
['Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day, index) => {
  SCHEDULE_DATA[day as keyof typeof SCHEDULE_DATA] = SCHEDULE_DATA.Mon.map(c => ({
    ...c, 
    id: c.id + (index + 1) * 10
  }));
});

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Mon');
  const [bookingClass, setBookingClass] = useState<any>(null);

  return (
    <section id="schedule" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-4">Class <span className="text-neon">Schedule</span></h2>
        <p className="text-gray-400 font-sans max-w-xl">Book your spot in advance. Classes fill up quickly.</p>
      </motion.div>

      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-6 py-3 font-display uppercase tracking-wider text-lg transition-colors whitespace-nowrap ${
              activeDay === day ? 'bg-neon text-darker' : 'bg-surface text-white hover:bg-surface-hover'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4"
          >
            {SCHEDULE_DATA[activeDay as keyof typeof SCHEDULE_DATA].map((cls, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={cls.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface border border-white/5 hover:border-neon/50 transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 mb-6 md:mb-0">
                  <div className="flex items-center gap-2 text-neon font-mono text-lg">
                    <Clock size={20} />
                    {cls.time}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wide mb-1">{cls.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-sans">
                      <User size={16} />
                      {cls.trainer} &bull; <span className="px-2 py-0.5 bg-white/10 rounded text-xs">{cls.type}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setBookingClass(cls)} className="px-6 py-3 border border-neon text-neon font-display uppercase tracking-wider hover:bg-neon hover:text-darker transition-colors skew-x-[-10deg]">
                  <div className="skew-x-[10deg]">Book Slot</div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Modal isOpen={!!bookingClass} onClose={() => setBookingClass(null)} title="Book Class">
        {bookingClass && (
          <div className="font-sans">
            <div className="mb-6 p-4 bg-dark border border-white/5 rounded">
              <h4 className="font-display text-xl uppercase text-white mb-2">{bookingClass.name}</h4>
              <div className="text-gray-400 text-sm flex flex-col gap-1">
                <div><span className="text-neon">Time:</span> {bookingClass.time} ({activeDay})</div>
                <div><span className="text-neon">Trainer:</span> {bookingClass.trainer}</div>
                <div><span className="text-neon">Type:</span> {bookingClass.type}</div>
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setBookingClass(null); }}>
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-1">Member ID / Email</label>
                <input type="text" required className="w-full bg-dark border border-white/10 px-4 py-2 text-white focus:border-neon outline-none transition-colors" placeholder="Enter your details" />
              </div>
              <button type="submit" className="w-full py-3 bg-neon text-darker font-display uppercase tracking-wider hover:bg-white transition-colors skew-x-[-10deg]">
                <div className="skew-x-[10deg]">Confirm Booking</div>
              </button>
            </form>
          </div>
        )}
      </Modal>
    </section>
  );
}
