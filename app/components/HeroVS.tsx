interface HeroVSProps {
  category: string
  headline: string
  subhead: string
  leftImage: string
  leftLabel?: string
  leftOdds?: number
  rightImage: string
  rightLabel?: string
  rightOdds?: number
  pointerSide: 'left' | 'right'
  image: string
}

export default function HeroVS({ 
  category,
  headline,
  subhead,
  leftImage,
  leftLabel,
  leftOdds,
  rightImage,
  rightLabel,
  rightOdds,
  pointerSide, 
  image
}: HeroVSProps) {
  
  const hasLeftContent = leftLabel || leftOdds !== undefined
  const hasRightContent = rightLabel || rightOdds !== undefined

  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      {/* Background image with heavy overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-6 md:p-10 lg:p-12">
        
        {/* Headline */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wide text-center">
          {headline}
        </h1>
        
        {/* Subhead */}
        <p className="text-amber-400 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-center mb-4 sm:mb-6 md:mb-8">
          {subhead}
        </p>

        {/* Cards */}
        <div className="flex items-end gap-2 sm:gap-3 md:gap-4">
          
          {/* Left Card */}
          <div className={`
            relative w-32 sm:w-36 md:w-44 lg:w-48 h-48 sm:h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden
            border-2 
            ${pointerSide === 'left' 
              ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]' 
              : 'border-neutral-600'
            }
            ${pointerSide === 'left' ? '-translate-y-3 sm:-translate-y-4 md:-translate-y-6' : ''}
          `}>
            <img 
              src={leftImage} 
              alt=""
              className={`absolute inset-0 w-full h-full object-cover ${pointerSide !== 'left' ? 'grayscale-[30%]' : ''}`}
            />
            {/* Gradient - gold for winner, grey for loser */}
            <div className={`absolute inset-0 bg-gradient-to-t ${
              pointerSide === 'left'
                ? 'from-amber-500/90 via-amber-500/40 to-transparent'
                : 'from-neutral-700/90 via-neutral-700/40 to-transparent'
            }`} />
            {/* Content - odds, label, or nothing */}
            {hasLeftContent && (
              <div className="absolute inset-x-0 bottom-1/4 flex items-center justify-center px-2">
                {leftOdds !== undefined ? (
                  <span className={`font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
                    pointerSide === 'left' ? 'text-amber-950' : 'text-white'
                  }`}>
                    {leftOdds}%
                  </span>
                ) : leftLabel ? (
                  <span className={`font-black text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase text-center leading-tight ${
                    pointerSide === 'left' ? 'text-amber-950' : 'text-white'
                  }`}>
                    {leftLabel}
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Card */}
          <div className={`
            relative w-32 sm:w-36 md:w-44 lg:w-48 h-48 sm:h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden
            border-2 
            ${pointerSide === 'right' 
              ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]' 
              : 'border-neutral-600'
            }
            ${pointerSide === 'right' ? '-translate-y-3 sm:-translate-y-4 md:-translate-y-6' : ''}
          `}>
            <img 
              src={rightImage} 
              alt=""
              className={`absolute inset-0 w-full h-full object-cover ${pointerSide !== 'right' ? 'grayscale-[30%]' : ''}`}
            />
            {/* Gradient - gold for winner, grey for loser */}
            <div className={`absolute inset-0 bg-gradient-to-t ${
              pointerSide === 'right'
                ? 'from-amber-500/90 via-amber-500/40 to-transparent'
                : 'from-neutral-700/90 via-neutral-700/40 to-transparent'
            }`} />
            {/* Content - odds, label, or nothing */}
            {hasRightContent && (
              <div className="absolute inset-x-0 bottom-1/4 flex items-center justify-center px-2">
                {rightOdds !== undefined ? (
                  <span className={`font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
                    pointerSide === 'right' ? 'text-amber-950' : 'text-white'
                  }`}>
                    {rightOdds}%
                  </span>
                ) : rightLabel ? (
                  <span className={`font-black text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase text-center leading-tight ${
                    pointerSide === 'right' ? 'text-amber-950' : 'text-white'
                  }`}>
                    {rightLabel}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}