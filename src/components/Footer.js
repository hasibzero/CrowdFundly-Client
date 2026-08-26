"use client";
import Link from 'next/link';
import { Rocket } from 'lucide-react';

// Brand icons as inline SVG — lucide-react 1.34.0 ships no brand marks,
// and importing non-existent brand icons breaks the Turbopack build.
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

export default function Footer() {
  // NOTE: GitHub is the real profile. Update the LinkedIn/Facebook handles
  // below if yours differ from "hasibzero".
  const socials = [
    { Icon: GithubIcon, href: 'https://github.com/hasibzero', label: 'GitHub' },
    { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/hasibzero', label: 'LinkedIn' },
    { Icon: FacebookIcon, href: 'https://www.facebook.com/hasibzero', label: 'Facebook' },
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
            <a
              href="https://github.com/hasibzero/CrowdFundly-Client"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#12643E] transition-colors"
            >
              Join as Developer
            </a>
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
