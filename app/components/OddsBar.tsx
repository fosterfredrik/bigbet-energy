interface OddsItem {
  label: string
  value: number
}

interface OddsBarProps {
  market: string
  date: string
  source: string
  odds: OddsItem[]
  variant?: 'dark' | 'light'
  portrait?: string
}

export default function OddsBar({ market, date, source, odds, variant = 'dark', portrait }: OddsBarProps) {
  const maxValue = Math.max(...odds.map(o => o.value))
  const isDark = variant === 'dark'

  const gapSize = odds.length <= 3 ? 'gap-6 sm:gap-8' : 'gap-4 sm:gap-5'
  const barHeight = odds.length <= 3 ? 'h-4' : 'h-3'
  const textSize = odds.length <= 3 ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'

  return (
    <div className={`relative w-full h-full p-6 sm:p-10 md:p-12 flex flex-col ${isDark ? 'bg-black' : 'bg-amber-400'}`}>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${isDark ? 'text-amber-400' : 'text-black/60'}`}>
          Market Odds
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
          {market}
        </h2>
      </div>

      {/* Bars */}
      <div className={`flex-1 flex flex-col justify-center ${gapSize}`}>
        {odds.map((item, index) => {
          const isHighlight = item.value === maxValue
          return (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1 sm:gap-0">
                <span className={`text-sm font-bold uppercase tracking-wide ${isDark
                  ? (isHighlight ? 'text-amber-400' : 'text-neutral-500')
                  : (isHighlight ? 'text-black' : 'text-black/50')
                  }`}>
                  {item.label}
                </span>
                <span className={`font-bold ${textSize} ${isDark
                  ? (isHighlight ? 'text-white' : 'text-neutral-700')
                  : (isHighlight ? 'text-black' : 'text-black/40')
                  }`}>
                  {item.value}%
                </span>
              </div>
              <div className={`w-full ${barHeight} rounded-full overflow-hidden ${isDark ? 'bg-neutral-900' : 'bg-black/20'}`}>
                <div
                  className={`h-full rounded-full ${isDark
                    ? (isHighlight ? 'bg-amber-400' : 'bg-neutral-800')
                    : (isHighlight ? 'bg-black' : 'bg-black/30')
                    }`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-6 sm:mt-8 pt-4 border-t ${isDark ? 'border-neutral-800' : 'border-black/20'}`}>
        <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-neutral-600' : 'text-black/50'}`}>
          {source} • {date}
        </div>
      </div>

      {/* Portrait overlay - bottom right corner */}
      {portrait && (
        <img
          src={portrait}
          alt=""
          className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 object-contain object-bottom"
        />
      )}
    </div>
  )
}
