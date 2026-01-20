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
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.863 13.44c-.065-.03-.13-.058-.196-.085a7.17 7.17 0 00-.216-2.847c-.47-1.62-1.47-2.756-2.996-3.378-.94-.384-1.95-.513-2.986-.457-1.323.07-2.46.47-3.38 1.205-.97.775-1.594 1.848-1.856 3.2l1.474.273c.19-.97.59-1.725 1.19-2.24.63-.543 1.424-.847 2.364-.9.77-.042 1.49.06 2.13.31 1.02.398 1.698 1.17 2.016 2.293.11.39.17.79.19 1.2-.69-.105-1.42-.148-2.17-.13-1.13.03-2.15.23-3.03.6-.96.4-1.69.98-2.16 1.73-.485.77-.71 1.67-.664 2.67.06 1.33.58 2.4 1.54 3.18.83.68 1.87 1.04 3.09 1.07h.35c1.18-.03 2.21-.35 3.05-.96.91-.66 1.56-1.59 1.93-2.74.16.09.32.18.47.28.91.62 1.48 1.36 1.69 2.22.3 1.22.08 2.4-.66 3.51-.7 1.04-1.73 1.8-3.06 2.26-1.22.43-2.6.53-4.1.32-1.63-.23-3.05-.81-4.21-1.73-1.23-.97-2.14-2.29-2.71-3.92-.55-1.56-.83-3.37-.83-5.38 0-2.01.28-3.82.83-5.38.57-1.64 1.48-2.95 2.71-3.92 1.17-.92 2.58-1.5 4.21-1.73 1.67-.23 3.22-.08 4.61.46 1.28.49 2.35 1.26 3.17 2.29.78.97 1.32 2.14 1.62 3.46l1.46-.35c-.35-1.56-1-2.93-1.94-4.1-.99-1.23-2.28-2.15-3.84-2.75-1.66-.64-3.5-.82-5.47-.56-1.9.27-3.57.95-4.96 2.05-1.45 1.14-2.54 2.68-3.22 4.57-.65 1.8-.98 3.85-.98 6.1 0 2.25.33 4.3.98 6.1.68 1.89 1.77 3.43 3.22 4.58 1.4 1.1 3.06 1.78 4.96 2.04.35.05.7.08 1.04.1 1.62.07 3.12-.13 4.46-.59 1.63-.56 2.94-1.52 3.87-2.85 1.02-1.45 1.35-3.17.97-5.1-.3-1.5-1.15-2.72-2.5-3.64zm-4.56 4.62c-.51.47-1.22.72-2.12.76-1.1.04-1.89-.27-2.39-.74-.45-.43-.69-.99-.72-1.67-.03-.61.13-1.13.48-1.57.37-.46.91-.8 1.61-1.03.63-.2 1.36-.31 2.18-.33.74-.02 1.5.03 2.26.15-.05 1.3-.35 2.35-.9 3.14-.27.39-.55.69-.9.93l-.18.12-.32.24z" />
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