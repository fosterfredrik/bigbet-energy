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
            </div>
            <a href="mailto:info@bigbet.energy" className="block text-neutral-400 hover:text-amber-400 text-sm mt-4 transition">
              info@bigbet.energy
            </a>
            {/* Threads */}

            <a href="https://www.threads.com/@bigbet.energy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-amber-400 transition"
              aria-label="Threads"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.187.408-2.296 1.333-3.123.912-.816 2.228-1.303 3.705-1.373 1.139-.054 2.177.062 3.126.341.014-.675-.024-1.327-.114-1.953-.265-1.836-1.053-2.745-2.778-2.88-.953-.075-1.803.168-2.397.683-.553.479-.862 1.126-.922 1.927l-2.108-.092c.096-1.312.618-2.39 1.51-3.12.975-.796 2.278-1.168 3.77-1.074 1.573.094 2.9.591 3.833 1.438 1.048.95 1.62 2.407 1.7 4.332.057.04.113.083.168.128 1.09.875 1.886 1.99 2.307 3.236.566 1.674.518 3.652-.544 5.132C19.196 22.48 16.321 23.97 12.186 24zm-.09-6.831c-1.149.055-2.012.453-2.508.858-.558.456-.786 1.018-.757 1.544.039.706.509 1.905 2.629 1.905l.329-.013c1.094-.059 1.882-.453 2.341-1.171.406-.636.617-1.544.617-2.694-.748-.18-1.606-.286-2.526-.286l-.125-.001z" />
              </svg>
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