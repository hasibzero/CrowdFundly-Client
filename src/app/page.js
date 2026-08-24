"use client";
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Dynamically load Swiper JS and CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Swiper) {
        new window.Swiper('.hero-swiper', {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          }
        });

        new window.Swiper('.testimonial-swiper', {
          slidesPerView: 1,
          spaceBetween: 24,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }
        });
      }
    };
    document.body.appendChild(script);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-up').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-background text-on-surface font-body-md pt-16">
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-fade-up.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
      `}} />

      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 lg:px-10 h-16 max-w-7xl mx-auto bg-surface dark:bg-inverse-surface shadow-sm transition-all duration-300">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-extrabold text-primary">Crowdfundly</Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/campaigns" className="text-secondary font-bold hover:text-primary transition-colors">Explore Campaigns</Link>
            <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/register" className="hidden md:block bg-surface text-secondary border border-secondary px-4 py-2 rounded-full font-semibold hover:bg-secondary hover:text-white transition-colors">
            Register
          </Link>
          <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-full font-bold hover:bg-primary-container transition-colors">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[819px] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="swiper hero-swiper w-full max-w-7xl px-4 md:px-6 lg:px-10">
          <div className="swiper-wrapper">
            <div className="swiper-slide flex flex-col items-center justify-center text-center relative min-h-[600px] h-[819px]">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070" className="absolute inset-0 w-full h-full object-cover -z-20" alt="Community Impact" />
              <div className="absolute inset-0 bg-black/40 -z-10"></div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl drop-shadow-lg">Impact Your Community</h1>
              <p className="text-lg text-white/90 mb-10 max-w-2xl">Back local initiatives that matter. From urban gardens to community centers, your support builds stronger neighborhoods.</p>
              <div className="flex gap-4">
                <Link href="/campaigns" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-container transition-colors shadow-sm">Explore Campaigns</Link>
              </div>
            </div>
            <div className="swiper-slide flex flex-col items-center justify-center text-center relative min-h-[600px] h-[819px]">
              <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2074" className="absolute inset-0 w-full h-full object-cover -z-20" alt="Launch Dream" />
              <div className="absolute inset-0 bg-black/40 -z-10"></div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl drop-shadow-lg">Launch Your Dream</h1>
              <p className="text-lg text-white/90 mb-10 max-w-2xl">Get the funding you need to grow. Join thousands of successful creators who brought their vision to life on Crowdfundly.</p>
              <div className="flex gap-4">
                <Link href="/register" className="bg-white text-secondary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">Start Your Project</Link>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>

      {/* Platform Impact Stats */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center animate-fade-up">
            <div>
              <h3 className="text-5xl font-bold text-primary mb-2">$45M+</h3>
              <p className="text-lg text-gray-600">Total Funded</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-indigo-600 mb-2">1,200+</h3>
              <p className="text-lg text-gray-600">Active Campaigns</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-orange-500 mb-2">850K</h3>
              <p className="text-lg text-gray-600">Supporters Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 lg:px-10 animate-fade-up">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How Crowdfundly Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Three simple steps to bring ideas to life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl p-10 shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6 text-indigo-600 font-bold text-xl">1</div>
            <h3 className="text-2xl font-bold mb-2">Discover</h3>
            <p className="text-gray-600">Explore thousands of verified campaigns across diverse categories that match your interests.</p>
          </div>
          <div className="bg-white rounded-xl p-10 shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 text-primary font-bold text-xl">2</div>
            <h3 className="text-2xl font-bold mb-2">Contribute</h3>
            <p className="text-gray-600">Back projects securely. Choose reward tiers or simply donate to fuel their passion.</p>
          </div>
          <div className="bg-white rounded-xl p-10 shadow-sm text-center border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 text-orange-500 font-bold text-xl">3</div>
            <h3 className="text-2xl font-bold mb-2">Impact</h3>
            <p className="text-gray-600">Watch ideas become reality. Get updates directly from creators and see your impact grow.</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 w-full py-16 px-4 md:px-10 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500">© 2024 Crowdfundly. Built for creators.</p>
            <div className="flex gap-6">
              <span className="text-gray-500 cursor-pointer hover:text-primary">Privacy Policy</span>
              <span className="text-gray-500 cursor-pointer hover:text-primary">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
