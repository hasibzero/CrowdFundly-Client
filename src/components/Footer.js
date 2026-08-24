"use client";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-surface-container-lowest w-full py-xl px-margin-mobile md:px-lg border-t border-outline-variant dark:border-outline">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-sm">
          <p className="text-label-sm font-label-sm text-on-surface-variant dark:text-outline">© 2024 Crowdfundly. Built for creators.</p>
          <div className="flex gap-md">
            <span className="text-label-sm font-label-sm text-on-surface-variant cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
