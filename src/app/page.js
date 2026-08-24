"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, DollarSign, Rocket, ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Home() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const campaigns = [
    {
      id: 1,
      tag: "Tech",
      tagColor: "bg-indigo-100 text-indigo-700",
      verified: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCBDpiAnTAPxY5MHopAJ1GYPXpHTWSuhAKW8bRrQhX-NCD81gSX1nOJ51Rtppt6j6c1njIYCAYkJ7_9EB70gHBKOptgxpZcOOdIpVW4uL4_8Uaqo8m5Kg_bp4yxVsNem1WwvSfN-zv2qrCTb7JavHvM0ZVI3ID6v92TQYUXrct7IbRKl6b02W0Ih91p6-MjRLvmatDiRbn-nOhPCuwutMu4CUdxN6TC6R_eYXjHp-soteu9VwLVDU0fw",
      title: "Aerobike: The Smart Commuter EV",
      description: "Revolutionizing urban transport with an AI-assisted electric bike designed for seamless city commuting.",
      amount: "$124,500",
      fundedPercent: "89%",
      daysLeft: "12 Days Left"
    },
    {
      id: 2,
      tag: "Community",
      tagColor: "bg-purple-100 text-purple-700",
      verified: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD17l24u-g9ziHfsFRac80zRBwDAJWr_xdJx1DuXK4EYvgMVsQrUhGdtijAeu_-9A7QhrXqhpJQ0gzF86jOZUmOSDlf0K0GL1rnVkir4ontcjq6qEKgb9LsJUW_sQhwMKM6Kzfw3jedMvYDO_-QBQ5EAfyjLa-aaGHg4CcFcg6ADu7yfFzfsi3Xct6AKdA-Mz584il3wHy8mtjs8fDNlAVOPrFztEybR8u0eiRL62gER6w6-TU3xrZfKw",
      title: "Urban Oasis: Modular City Gardens",
      description: "Empowering neighborhoods to grow their own food with easily deployable, self-watering garden pods.",
      amount: "$45,200",
      fundedPercent: "115%",
      daysLeft: "3 Days Left"
    },
    {
      id: 3,
      tag: "Art & Gaming",
      tagColor: "bg-indigo-100 text-indigo-700",
      verified: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6PSWirvqMlhHovlc98bR4gO0on6tsF8kcIqwKoT-y8Eu9Ms5toLahKoErvnGjo3Wbmk91xNeL1QVccDk14NTHt63IsWvqDCRUTrCgVzSx8XRI3nGuwb05rdmJ6mUJVc3tLRHZyfazyNgsHBM11p3uRhvr49S_4yJsV2JiIJTuK9zyHJQYV2a_q0jyXaGcuK4PpTxubEpzJ59nwEOfs7IMA2QQqf5hsHrScNBPm_-Gw4RLnYgnLXqnhA",
      title: "Wanderer's Tale: An Indie RPG",
      description: "A narrative-driven adventure game with stunning handcrafted visuals and an orchestral soundtrack.",
      amount: "$210,000",
      fundedPercent: "67%",
      daysLeft: "21 Days Left"
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Crowdfundly provided the exact launchpad we needed. The community here is incredibly supportive and genuinely cares about sustainable tech. We hit our goal in just 48 hours!",
      name: "Sarah Jenkins",
      role: "Creator, EcoPod",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs3AX-gXEl6SPaqWQOJhhuVPOasoWsuWz2nAYk58EdQiICp20d474aWoqhzaUWv5QBDnzXH9pTLZiUG3IrAIMRfMnDRhty-llYsmhu_xLLX0OK1ObxmgggtqaqLWRRMEoLO43bUiOYyEdAIt_4__E4FzNDgth_NmBAWYhnQkg86cHEX3T9DxicMh8UklQMqhcxJooG9QYlEvvO4Xdibg-7awmcTaM3h-FQB0SWmGyMJP7aHcAg_AkLMA"
    },
    {
      id: 2,
      quote: "As a backer, I love the transparency. The platform makes it easy to track the progress of the hardware projects I've invested in. It feels safe, professional, and exciting.",
      name: "Michael Chen",
      role: "Super Backer",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3zNFMmj5mbgv3MY69M95PAtS1BUAeDB6xwxJTNhezwjAUWzSX1yz2BcWMa-tqfSOw6gtg52AowJD6KbPDLanUHBebHLgts2LwMQdzEx4jTTzBdsANgILJ-Fsib0DOPLfACoCp-RTbX7wxCnWWYNE1iBQDqTTfwft0bdwG6AMXB_yzMjUDGcPnJ4j6HKeA43hNKRoyEJ4ZCgsIpozzwdmJA2rXq1bQNqSLwa-b4w4Bl_zD-nQreK14_g"
    },
    {
      id: 3,
      quote: "The tools provided for creators are top-notch. Managing updates and communicating with my supporters was seamless. Highly recommend this platform to any indie artist.",
      name: "Elena Rodriguez",
      role: "Artist & Creator",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD26900U56APz_3sTcVUoKclwxvolp_gkldIaJX8vRo3pB6FKWt9o3l_jhfJIOHNy6lcNFxUkXeYbesSky3uZ-sx4yltFW5LHsm9OSrl7l3FA1SpyhpYctFul-hcQzjBRLtKOfrttM_GoddHI3VGaAHqAFtkqJcB8-TBVxPga5pIYPfxyw38XThyMSsT-CWAxTu8lMhyPArBN1cOGRnbLPjay2sKS148C0loOG-3eI36D7KorrIxDrZfA"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] text-zinc-900 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="w-full h-[520px]"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative w-full h-full bg-zinc-300 flex flex-col justify-end items-center pb-16 overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover" alt="Impact Your Community" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202738]/90 via-[#202738]/40 to-transparent" />
              </div>
              <div className="relative z-10 text-center px-4 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 tracking-tight">Impact Your Community</h1>
                <p className="text-zinc-200 text-sm md:text-base mb-8 leading-relaxed">Back local initiatives that matter. From urban gardens to community centers, your support builds stronger neighborhoods.</p>
                <Link href="/campaigns" className="inline-block bg-[#12643E] hover:bg-[#0e4f31] text-white text-sm font-semibold px-8 py-3 rounded-full transition-colors shadow-sm">Explore Campaigns</Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative w-full h-full bg-zinc-300 flex flex-col justify-end items-center pb-16 overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2074" className="w-full h-full object-cover" alt="Launch Dream" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202738]/90 via-[#202738]/40 to-transparent" />
              </div>
              <div className="relative z-10 text-center px-4 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 tracking-tight">Launch Your Dream</h1>
                <p className="text-zinc-200 text-sm md:text-base mb-8 leading-relaxed">Get the funding you need to grow. Join thousands of successful creators who brought their vision to life on Crowdfundly.</p>
                <Link href="/register" className="inline-block bg-white hover:bg-zinc-100 text-[#12643E] text-sm font-semibold px-8 py-3 rounded-full transition-colors shadow-sm">Start Your Project</Link>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative w-full h-full bg-zinc-300 flex flex-col justify-end items-center pb-16 overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover" alt="Innovative Tech" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202738]/90 via-[#202738]/40 to-transparent" />
              </div>
              <div className="relative z-10 text-center px-4 max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 tracking-tight">Fuel the Future</h1>
                <p className="text-zinc-200 text-sm md:text-base mb-8 leading-relaxed">Support innovative tech projects that are changing the world. Be an early adopter of tomorrow's breakthroughs.</p>
                <Link href="/campaigns" className="inline-block bg-[#12643E] hover:bg-[#0e4f31] text-white text-sm font-semibold px-8 py-3 rounded-full transition-colors shadow-sm">Explore Campaigns</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Metrics Section */}
      <section className="py-14 bg-white border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#12643E] mb-1">$45M+</h3>
            <p className="text-xs text-zinc-500 font-medium">Total Funded</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#4F46E5] mb-1">1,200+</h3>
            <p className="text-xs text-zinc-500 font-medium">Active Campaigns</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#D97706] mb-1">850K</h3>
            <p className="text-xs text-zinc-500 font-medium">Supporters Worldwide</p>
          </div>
        </div>
      </section>

      {/* How Crowdfundly Works */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 mb-2">
            How Crowdfundly Works
          </h2>
          <p className="text-xs md:text-sm text-zinc-500">
            Three simple steps to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <Search className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-serif font-bold text-zinc-900 mb-2">1. Discover</h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              Explore thousands of verified campaigns across diverse categories that match your interests.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <DollarSign className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-serif font-bold text-zinc-900 mb-2">2. Contribute</h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              Back projects securely. Choose reward tiers or simply donate to fuel their passion.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-5">
              <Rocket className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3 className="text-base font-serif font-bold text-zinc-900 mb-2">3. Impact</h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              Watch ideas become reality. Get updates directly from creators and see your impact grow.
            </p>
          </div>
        </div>
      </section>

      {/* Top Funded Campaigns */}
      <section className="py-16 bg-[#EEF2F6] border-y border-zinc-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 mb-1">
                Top Funded Campaigns
              </h2>
              <p className="text-xs text-zinc-500">
                Projects currently leading the charge on Crowdfundly.
              </p>
            </div>
            <Link href="/campaigns" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((camp) => (
              <div key={camp.id} className="bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-44 w-full">
                  <img src={camp.image} alt={camp.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${camp.tagColor}`}>
                      {camp.tag}
                    </span>
                  </div>
                  {camp.verified && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-zinc-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                      Verified
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-zinc-900 text-sm mb-1.5 line-clamp-1">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                      {camp.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-base font-bold text-[#12643E]">{camp.amount}</span>
                      <span className="text-[11px] text-zinc-400">Total Raised</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-2.5">
                      <div className="h-full bg-[#12643E] rounded-full" style={{ width: camp.fundedPercent }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-zinc-400 font-medium">
                      <span>{camp.fundedPercent} Funded</span>
                      <span>{camp.daysLeft}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Voices (Testimonials) */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
            Community Voices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-7 border border-zinc-100 shadow-sm flex flex-col justify-between">
              <div>
                <Quote className="w-6 h-6 text-amber-500 fill-amber-500 mb-4 opacity-90" />
                <p className="text-xs italic text-zinc-600 leading-relaxed font-serif mb-6">
                  "{item.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{item.name}</h4>
                  <p className="text-[10px] text-zinc-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200/80 pt-12 pb-8 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <span className="text-base font-serif font-extrabold text-[#12643E] block mb-2">
              Crowdfundly
            </span>
            <p className="text-zinc-500 leading-relaxed">
              Empowering creators and supporters to build a better future together through transparent, community-driven funding.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/campaigns" className="hover:text-zinc-900">All Campaigns</Link></li>
              <li><Link href="/campaigns" className="hover:text-zinc-900">Technology</Link></li>
              <li><Link href="/campaigns" className="hover:text-zinc-900">Art & Design</Link></li>
              <li><Link href="/campaigns" className="hover:text-zinc-900">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-zinc-900">How It Works</Link></li>
              <li><Link href="/" className="hover:text-zinc-900">Pricing</Link></li>
              <li><Link href="/" className="hover:text-zinc-900">Help Center</Link></li>
              <li><Link href="/" className="hover:text-zinc-900">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px] mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-zinc-900">LinkedIn</a></li>
              <li><a href="#" className="hover:text-zinc-900">Facebook</a></li>
              <li><a href="#" className="hover:text-zinc-900">GitHub</a></li>
              <li><a href="#" className="hover:text-zinc-900">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center text-[11px] text-zinc-400 gap-4">
          <p>© 2026 Crowdfundly. Built for creators.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-zinc-600">Privacy Policy</Link>
            <Link href="/" className="hover:text-zinc-600">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}