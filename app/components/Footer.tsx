import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-black border-t-4 border-amber-400 text-white">
      <div className="max-w-[1104px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Column 1: Branding (Darker Box) */}
          <div className="bg-black/50 rounded-xl p-6">
            <Link href="/">
              <img
                src="/images/bbe-logo.svg"
                alt="BigBet.Energy"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-neutral-400 text-sm mt-4 mb-4 leading-relaxed">
              Betting intelligence that hits different.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@bigbet.energy" className="block text-neutral-400 hover:text-white transition">
                Contact
              </a>
            </div>
          </div>

          {/* Column 2: Connect */}
          <nav>
            <div className="font-bold text-white mb-4">Connect</div>
            <div className="flex gap-4">
              {/* Telegram */}
              <a
                href="https://t.me/bigbetenergy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition"
                aria-label="Telegram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              {/* X/Twitter */}
              <a
                href="https://x.com/bigbet_energy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition"
                aria-label="X"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/bigbet.energy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@bigbet.energy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@bigbet.energy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* Threads */}
              <a href="https://www.threads.com/@bigbet.energy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-amber-400 transition"
                aria-label="Threads"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 192 192">
                  <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.24-38.114 34.568.522 9.912 5.069 18.454 12.804 24.048 6.486 4.685 14.836 7.02 23.5 6.58 11.436-.58 20.396-4.7 26.638-12.238 4.718-5.7 7.672-13.02 8.894-22.063 5.98 3.6 10.412 8.39 12.857 14.146 4.262 10.044 4.518 26.534-8.441 39.477-11.613 11.601-25.564 16.63-46.453 16.793-23.18-.18-40.715-7.6-52.125-22.065-10.674-13.533-16.2-32.982-16.426-57.829.225-24.847 5.752-44.296 16.426-57.83C58.746 25.502 76.281 18.1 99.46 17.92c23.408.18 41.304 7.67 53.183 22.256 5.829 7.153 10.167 15.951 13.013 26.296l16.038-4.196c-3.385-12.313-8.653-23.08-15.788-32.14C151.314 12.225 128.964 2.004 99.378 1.8h-.164C69.723 2.004 47.645 12.133 33.236 29.94 16.899 49.985 8.594 78.742 8.333 114.77v.063c.261 36.03 8.566 64.786 24.903 84.83 14.409 17.808 36.487 27.936 65.98 28.14h.164c24.458-.178 43.086-6.59 58.593-20.19 17.784-15.584 20.204-37.751 14.49-51.217-4.098-9.658-12.291-17.406-23.926-22.408z" />
                </svg>
              </a>
            </div>
            <a href="mailto:info@bigbet.energy" className="block text-neutral-400 hover:text-amber-400 text-sm mt-4 transition">
              info@bigbet.energy
            </a>
          </nav>

          {/* Column 3: Legal */}
          <nav>
            <div className="font-bold text-white mb-4">Legal</div>
            <div className="flex flex-col space-y-2 text-sm text-neutral-400">
              <Link href="/methodology" className="hover:text-amber-400 transition">
                How We Rate
              </Link>
              <span className="text-neutral-500">21+ Only</span>
              <span className="text-neutral-500">Gamble Responsibly</span>
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-6 text-center text-sm text-neutral-400">
          <p>© 2026 Big Bet Energy • All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}