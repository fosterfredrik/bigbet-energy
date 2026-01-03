interface StatCardProps {
  stat: string
  label: string
  subtitle?: string
  date: string
  source: string
  portrait?: string
  quote?: string
  quoteAuthor?: string
}

export default function StatCard({ stat, label, subtitle, date, source, portrait, quote, quoteAuthor }: StatCardProps) {
  return (
    <div className="relative w-full h-full p-6 sm:p-10 md:p-12 flex flex-col bg-black">

      {/* Header */}
      <div className="mb-6">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          Market Stat
        </div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          {label}
        </h2>
        {subtitle && (
          <p className="text-neutral-500 text-sm mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main content - quote left, stat right */}
      <div className="flex-1 flex flex-row justify-between items-center">
        {/* Quote on left */}
        {quote && (
          <div className="flex flex-col">
            <span className="text-white text-2xl sm:text-3xl font-bold italic">
              "{quote}"
            </span>
            {quoteAuthor && (
              <span className="text-neutral-500 text-sm mt-2">
                — {quoteAuthor}
              </span>
            )}
          </div>
        )}

        {/* Stat on right */}
        <div className="text-amber-400 text-6xl sm:text-7xl md:text-8xl font-black text-right">
          {stat}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 pt-4 border-t border-neutral-800">
        <div className="text-xs uppercase tracking-wide text-neutral-600 text-right">
          {source} • {date}
        </div>
      </div>

      {/* Portrait overlay - bottom LEFT corner */}
      {portrait && (
        <img
          src={portrait}
          alt=""
          className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 object-contain object-bottom"
        />
      )}
    </div>
  )
}