import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-black border-t-4 border-amber-400 text-white">
      <div className="max-w-[1104px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Branding (Darker Box) */}
          <div className="bg-black/50 rounded-xl p-6">
            <Link href="/" className="block mb-4">
              <img 
                src="/images/bbe-png3.png" 
                alt="BigBet.Energy" 
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
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
            <div className="flex flex-col space-y-2 text-sm text-neutral-400">
              <a href="https://t.me/bigbetenergy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Telegram
              </a>
              <a href="mailto:info@bigbet.energy" className="hover:text-white transition">
                Email
              </a>
            </div>
          </nav>

          {/* Column 3: Legal */}
          <nav>
            <div className="font-bold text-white mb-4">Legal</div>
            <div className="flex flex-col space-y-2 text-sm text-neutral-400">
              <span className="text-neutral-600">21+ Only</span>
              <span className="text-neutral-600">Gamble Responsibly</span>
            </div>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-6 text-center text-sm text-neutral-500">
          <p>© 2025 Big Bet Energy • All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
