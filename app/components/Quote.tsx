interface QuoteProps {
  quote: string
  author: string
  role?: string
  context?: string
  date: string
  source: string
  portrait?: string
}

export default function Quote({ quote, author, role, context, date, source, portrait }: QuoteProps) {
  // Auto-size text based on quote length
  const textSize = quote.length < 80 
    ? 'text-2xl sm:text-3xl md:text-4xl'
    : quote.length < 150 
      ? 'text-xl sm:text-2xl md:text-3xl'
      : 'text-lg sm:text-xl md:text-2xl'

  return (
    <div className="relative w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col border-t-2 border-amber-400 lg:border-t-0">
      
      {/* Header */}
      <div className="mb-4">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          Notable Quote
        </div>
        {context && (
          <p className="text-neutral-500 text-sm">
            {context}
          </p>
        )}
      </div>

      {/* Quote */}
      <div className="flex-1 flex items-center relative">
        {/* Decorative quotation mark */}
        <span className="absolute -top-2 -left-2 text-7xl sm:text-8xl text-amber-400/10 font-serif leading-none select-none">
          "
        </span>
        <blockquote className={`text-white font-bold leading-tight ${textSize}`}>
          "{quote}"
        </blockquote>
      </div>

      {/* Author */}
      <div className="mt-4 mb-4">
        <div className="text-amber-400 font-bold text-lg">
          {author}
        </div>
        {role && (
          <div className="text-neutral-500 text-sm">
            {role}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 pt-4 border-t border-neutral-800">
        <div className="text-neutral-600 text-xs uppercase tracking-wide">
          {source} • {date}
        </div>
        
        {!portrait && (
          <div className="flex items-center gap-1.5">
            <span className="text-sm">⚡</span>
            <span className="text-sm font-bold tracking-wide" style={{ color: '#E5B94E' }}>
              BIGBET.ENERGY
            </span>
          </div>
        )}
      </div>

      {/* Portrait overlay - circular, bottom right corner */}
      {portrait && (
        <div className="absolute bottom-4 right-4 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-amber-400">
          <img 
            src={portrait} 
            alt="" 
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}
    </div>
  )
}
