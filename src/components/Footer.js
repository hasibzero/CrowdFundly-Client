"use client";
import Link from 'next/link';
import { Rocket, Code2, AtSign, Briefcase, Users } from 'lucide-react';

export default function Footer() {
  const socials = [
    { Icon: Code2, href: 'https://github.com', label: 'GitHub' },
    { Icon: AtSign, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: Briefcase, href: 'https://linkedin.com', label: 'LinkedIn' },
    { Icon: Users, href: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-[#12643E]" />
            <span className="text-lg font-extrabold text-[#12643E] tracking-tight">Crowdfundly</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[14px] font-semibold text-gray-600">
            <Link href="/campaigns" className="hover:text-[#12643E] transition-colors">Explore</Link>
            <Link href="/register" className="hover:text-[#12643E] transition-colors">Join as Developer</Link>
            <Link href="#" className="hover:text-[#12643E] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#12643E] transition-colors">Terms of Service</Link>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-[#12643E] hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-[13px] text-gray-400">© 2026 Crowdfundly. Built for creators and backers.</p>
        </div>
      </div>
    </footer>
  );
}
