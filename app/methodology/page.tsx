import Link from 'next/link';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-black border-b-4 border-amber-400">
        <div className="max-w-[1104px] mx-auto px-4 py-5">
          <Link href="/">
            <img 
              src="/images/bbe-logo.svg" 
              alt="BigBet.Energy" 
              className="h-8 sm:h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-[1104px] mx-auto px-4 pt-3">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'How We Rate' }
          ]}
        />
      </div>

      {/* Main Content */}
      <main className="py-8 px-4">
        <div className="max-w-[1104px] mx-auto">
          <div className="bg-black rounded-xl p-6 sm:p-10">
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              How We Rate
            </h1>
            <p className="text-neutral-400 mb-8">
              Our methodology for evaluating sportsbooks and online casinos.
            </p>

            {/* Intro */}
            <div className="mb-10">
              <p className="text-neutral-300 leading-relaxed">
                At BigBet.Energy, we evaluate every operator across four key categories. 
                Each category is scored from 0-100 based on objective criteria and real user experience. 
                We update our ratings regularly to reflect changes in bonus offers, payout speeds, and app performance.
              </p>
            </div>

            {/* Sportsbooks Section */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-amber-400 mb-4">Sportsbooks</h2>
              
              <div className="space-y-6">
                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">Bonus Value</h3>
                  <p className="text-neutral-400 text-sm">
                    We calculate the effective value of welcome bonuses, considering wagering requirements, 
                    minimum odds, time limits, and maximum bet restrictions. A $1,000 bonus with 10x rollover 
                    scores higher than a $1,500 bonus with 25x rollover.
                  </p>
                </div>

                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">Payout Speed</h3>
                  <p className="text-neutral-400 text-sm">
                    Based on average withdrawal times across payment methods. We test actual withdrawals 
                    and factor in verification requirements. Same-day payouts score highest; 5+ day waits 
                    score lowest.
                  </p>
                </div>

                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">Odds Quality</h3>
                  <p className="text-neutral-400 text-sm">
                    We analyze the vig (juice) across major markets — NFL, NBA, MLB, soccer. 
                    Lower margins mean better value for bettors. We compare odds against market 
                    averages across hundreds of events.
                  </p>
                </div>

                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">App Experience</h3>
                  <p className="text-neutral-400 text-sm">
                    Combines App Store/Play Store ratings with our hands-on testing. We evaluate 
                    bet slip functionality, live betting speed, navigation, and stability. 
                    Frequent crashes or slow load times hurt scores significantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Casinos Section */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-amber-400 mb-4">Online Casinos</h2>
              
              <div className="space-y-6">
                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">Bonus Value</h3>
                  <p className="text-neutral-400 text-sm">
                    Same methodology as sportsbooks — we look at the real expected value after 
                    wagering requirements. We also consider ongoing promotions, loyalty programs, 
                    and reload bonuses.
                  </p>
                </div>

                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">Payout Speed</h3>
                  <p className="text-neutral-400 text-sm">
                    Tested withdrawal times for casino winnings. We note any differences between 
                    sportsbook and casino withdrawals at the same operator.
                  </p>
                </div>

                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">Game Variety</h3>
                  <p className="text-neutral-400 text-sm">
                    Total game count, provider diversity, and availability of popular titles. 
                    We give extra weight to exclusive games, live dealer options, and new releases. 
                    Quality matters more than raw quantity.
                  </p>
                </div>

                <div className="border-l-2 border-amber-400 pl-4">
                  <h3 className="text-white font-bold mb-1">App Experience</h3>
                  <p className="text-neutral-400 text-sm">
                    Mobile gameplay quality, game load times, and overall polish. Casino apps 
                    need to handle graphics-heavy games smoothly. We test on both iOS and Android.
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
              <p className="text-neutral-500 text-xs leading-relaxed">
                <strong className="text-neutral-400">Disclaimer:</strong> Our ratings are based on our own research and testing. 
                Individual experiences may vary. We may receive compensation from operators featured on this site, 
                but this does not influence our ratings. Always gamble responsibly and only bet what you can afford to lose.
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
