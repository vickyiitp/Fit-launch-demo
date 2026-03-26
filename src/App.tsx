import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Schedule from './components/Schedule';
import Trainers from './components/Trainers';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-dark selection:bg-neon selection:text-darker">
      <Navbar />
      <Hero />
      <Features />
      <Schedule />
      <Trainers />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
