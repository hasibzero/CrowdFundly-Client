"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ArrowRight, Coins, Rocket, Search, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Navbar from '@/components/Navbar';
import { API_URL } from '@/lib/api';

const fmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070',
    eyebrow: 'Crowdfundly',
    title: 'Back ideas that move communities forward.',
    text: 'Discover approved projects, support creators with secure credit contributions, and follow the impact you help make.',
    primary: { label: 'Explore campaigns', href: '/campaigns' },
    secondary: { label: 'Create an account', href: '/register' },
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070',
    eyebrow: 'Fund with confidence',
    title: 'Every contribution runs on secure credits.',
    text: 'Top up once, then back as many projects as you like. Transparent tiers, instant updates, and no hidden fees.',
    primary: { label: 'Browse projects', href: '/campaigns' },
    secondary: { label: 'How it works', href: '#how-it-works' },
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070',
    eyebrow: 'For creators',
    title: 'Launch your campaign. Reach real backers.',
    text: 'Tell your story, set a funding goal, and turn a community of supporters into momentum for your idea.',
    primary: { label: 'Start a campaign', href: '/register' },
    secondary: { label: 'Join as Developer', href: 'https://github.com/hasibzero/CrowdFundly-Client' },
  },
];

const TESTIMONIALS = [
  {
    quote: 'Crowdfundly made it effortless to rally support for our neighborhood garden. We hit our funding goal in eleven days.',
    name: 'Maya Rodriguez',
    role: 'Community Organizer',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    quote: 'The credit system is genuinely frictionless. I topped up once and backed five projects the same afternoon.',
    name: 'David Chen',
    role: 'Early Backer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote: 'As a first-time creator, the guided campaign builder walked me through everything. Approval was fast and fair.',
    name: 'Aisha Bello',
    role: 'Product Designer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote: 'We funded our short film here after two other platforms fell through. The backer updates kept everyone engaged.',
    name: 'Liam Carter',
    role: 'Filmmaker',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    quote: 'Transparent tiers and clear progress bars meant our supporters always knew exactly where we stood.',
    name: 'Priya Nair',
    role: 'Hardware Founder',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    quote: 'I love seeing the impact of what I back. The updates from creators make every contribution feel personal.',
    name: 'Sofia Almeida',
    role: 'Monthly Supporter',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
];

// Brand icons as inline SVG — lucide-react 1.34.0 ships no brand marks.
function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-1.95c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.78 24h20.44c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}
function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  );
}

// Real profile links. Update the LinkedIn/Facebook handles if yours differ from "hasibzero".
const SOCIALS = [
  { Icon: GithubIcon, label: 'GitHub', href: 'https://github.com/hasibzero' },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/hasibzero' },
  { Icon: FacebookIcon, label: 'Facebook', href: 'https://www.facebook.com/hasibzero' },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.12 } },
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({ totalFunded: 0, activeCampaigns: 0, supporters: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const [campaignsResponse, statsResponse] = await Promise.all([
          axios.get(`${API_URL}/api/campaigns`),
          axios.get(`${API_URL}/api/platform/stats`),
        ]);
        // Sort campaigns by amount raised descending, then take the top 6
        const sortedCampaigns = [...campaignsResponse.data].sort((a, b) => (b.raised || 0) - (a.raised || 0));
        setCampaigns(sortedCampaigns.slice(0, 6));
        setStats(statsResponse.data);
      } finally {
        setLoading(false);
      }
    };
    loadHome();
  }, []);

  return <div className="min-h-screen bg-[#F8FAFC] text-zinc-900">
    <Navbar />

    {/* HERO SLIDER */}
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-[560px] w-full"
        style={{
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-opacity': '0.45',
          '--swiper-pagination-bottom': '28px',
        }}
      >
        {HERO_SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative flex h-full min-h-[560px] items-center justify-center overflow-hidden bg-zinc-900 px-6 text-center">
              <img src={slide.image} className="absolute inset-0 h-full w-full object-cover opacity-55" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202738] via-[#202738]/60 to-[#202738]/20" />
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                className="relative z-10 max-w-3xl pt-16"
              >
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">{slide.eyebrow}</p>
                <h1 className="mb-5 font-serif text-4xl font-bold text-white md:text-6xl">{slide.title}</h1>
                <p className="mb-9 text-base leading-relaxed text-zinc-200 md:text-lg">{slide.text}</p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <HeroLink href={slide.primary.href} className="rounded-full bg-[#12643E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0e4f31]">{slide.primary.label}</HeroLink>
                  <HeroLink href={slide.secondary.href} className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#12643E] transition-colors hover:bg-zinc-100">{slide.secondary.label}</HeroLink>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

    {/* METRICS */}
    <motion.section
      className="border-b border-zinc-100 bg-white py-14"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 text-center md:grid-cols-3">
        <Metric value={fmt.format(stats.totalFunded)} label="Credits funded" />
        <Metric value={stats.activeCampaigns.toLocaleString()} label="Active campaigns" />
        <Metric value={stats.supporters.toLocaleString()} label="Supporters" />
      </div>
    </motion.section>

    {/* HOW IT WORKS */}
    <motion.section
      id="how-it-works"
      className="mx-auto max-w-6xl px-6 py-20"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div variants={itemReveal} className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-[#0f172a]">How Crowdfundly Works</h2>
        <p className="mt-2 text-sm text-gray-500">Three simple steps to bring ideas to life.</p>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Step
          icon={<Search className="w-6 h-6 text-indigo-500" />}
          title="1. Discover"
          text="Explore verified campaigns across diverse categories that match your interests."
          iconBg="bg-indigo-50"
        />
        <Step
          icon={<Coins className="w-6 h-6 text-emerald-500" />}
          title="2. Contribute"
          text="Back projects securely with credits. Choose a reward tier or simply fuel their passion."
          iconBg="bg-emerald-50"
        />
        <Step
          icon={<Rocket className="w-6 h-6 text-orange-400" />}
          title="3. Impact"
          text="Watch ideas become reality. Get updates directly from creators and see your impact grow."
          iconBg="bg-orange-50"
        />
      </div>
    </motion.section>

    {/* TOP FUNDED CAMPAIGNS */}
    <motion.section
      className="border-y border-zinc-200/60 bg-[#EEF2F6] py-16"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div variants={itemReveal} className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a]">Top Funded Campaigns</h2>
            <p className="mt-1 text-sm text-zinc-500">Projects currently leading the charge on Crowdfundly.</p>
          </div>
          <Link href="/campaigns" className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        {loading ? (
          <div className="py-12 text-center text-sm text-zinc-500">Loading campaigns…</div>
        ) : campaigns.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center text-sm text-zinc-500">No campaigns found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {campaigns.map((campaign, i) => (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
              >
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>

    {/* TESTIMONIALS SLIDER */}
    <motion.section
      className="bg-white py-20"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div variants={itemReveal} className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#12643E]">
            <Quote className="h-3.5 w-3.5" /> Community Voices
          </span>
          <h2 className="text-3xl font-bold text-[#0f172a]">Loved by creators and backers</h2>
          <p className="mt-2 text-sm text-gray-500">Real stories from the people building and backing on Crowdfundly.</p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          spaceBetween={24}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
          style={{ '--swiper-pagination-color': '#12643E', '--swiper-pagination-bottom': '0px' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>

    {/* CALL TO ACTION */}
    <motion.section
      className="bg-[#F8FAFC] px-6 py-20"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#12643E] to-[#0b3f27] px-8 py-16 text-center shadow-xl">
        <motion.h2 variants={itemReveal} className="font-serif text-3xl font-bold text-white md:text-4xl">
          Ready to fund the next big idea?
        </motion.h2>
        <motion.p variants={itemReveal} className="mx-auto mt-4 max-w-[36rem] text-sm leading-relaxed text-emerald-100 md:text-base">
          Join Crowdfundly today. Back a campaign in minutes, or launch your own and reach a community ready to support you.
        </motion.p>
        <motion.div variants={itemReveal} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register" className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#12643E] transition-colors hover:bg-emerald-50">Get started free</Link>
          <Link href="/campaigns" className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">Explore campaigns</Link>
        </motion.div>
      </div>
    </motion.section>

    {/* FOOTER */}
    <footer className="bg-[#f8fafc] border-t border-gray-200 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Rocket className="h-6 w-6 text-[#12643E]" />
              <h3 className="text-xl font-bold text-[#12643E]">Crowdfundly</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Empowering creators and supporters to build a better future together through transparent, community-driven funding.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/campaigns" className="hover:text-[#12643E]">All Campaigns</Link></li>
              <li><Link href="/campaigns" className="hover:text-[#12643E]">Technology</Link></li>
              <li><Link href="/campaigns" className="hover:text-[#12643E]">Art &amp; Design</Link></li>
              <li><a href="https://github.com/hasibzero/CrowdFundly-Client" target="_blank" rel="noopener noreferrer" className="hover:text-[#12643E]">Join as Developer</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#how-it-works" className="hover:text-[#12643E]">How it Works</Link></li>
              <li><Link href="/dashboard/credits" className="hover:text-[#12643E]">Buy Credits</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">Help Center</Link></li>
              <li><Link href="#" className="hover:text-[#12643E]">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {SOCIALS.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#12643E]">
                    <Icon className="h-4 w-4" /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Crowdfundly. Built for creators and backers.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>;
}

function HeroLink({ href, className, children }) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

function Metric({ value, label }) {
  return (
    <motion.div variants={itemReveal}>
      <p className="font-serif text-4xl font-bold text-[#12643E]">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
    </motion.div>
  );
}

function Step({ icon, title, text, iconBg }) {
  return (
    <motion.div
      variants={itemReveal}
      className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-shadow"
    >
      <div className={`mb-5 rounded-full p-4 ${iconBg}`}>{icon}</div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-gray-500">{text}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, name, role, image }) {
  return (
    <div className="flex h-full min-h-[240px] flex-col justify-between rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
      <div>
        <Quote className="mb-4 h-7 w-7 text-orange-400" />
        <p className="mb-8 text-[15px] italic leading-relaxed text-gray-600">
          {quote}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="h-10 w-10 rounded-full object-cover" />
        <div>
          <h4 className="text-[13px] font-bold text-gray-900">{name}</h4>
          <p className="text-[12px] text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ campaign }) {
  const percent = campaign.targetAmount ? Math.min(Math.round(((campaign.raised || 0) / campaign.targetAmount) * 100), 100) : 0;
  const end = campaign.deadline ? new Date(campaign.deadline) : new Date(new Date(campaign.createdAt).getTime() + campaign.duration * 86400000);
  const days = Math.max(Math.ceil((end - new Date()) / 86400000), 0);
  return <Link href={`/campaigns/${campaign._id}`} className="group block h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md"><div className="h-44 bg-zinc-100">{campaign.coverImage ? <img src={campaign.coverImage} alt={campaign.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-zinc-400">No campaign image</div>}</div><div className="p-5"><span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700">{campaign.category}</span><h3 className="mt-3 truncate font-serif text-lg font-bold group-hover:text-[#12643E]">{campaign.title}</h3><p className="mt-2 line-clamp-2 min-h-10 text-sm text-zinc-500">{campaign.shortDescription || campaign.story}</p><div className="mt-5 flex justify-between text-sm"><span className="font-bold text-[#12643E]">{percent}% funded</span><span className="text-zinc-500">{days} days left</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-[#12643E]" style={{ width: `${percent}%` }} /></div><p className="mt-2 text-sm text-zinc-600"><strong>{fmt.format(campaign.raised || 0)}</strong> of {fmt.format(campaign.targetAmount || 0)} credits</p></div></Link>;
}
