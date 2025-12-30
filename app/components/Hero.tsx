interface HeroProps {
    category: string
    headline: string
    subhead?: string
    image: string
  }
  
  export default function Hero({ category, headline, subhead, image }: HeroProps) {
    const headlineSize = headline.length < 30 
      ? 'text-4xl sm:text-5xl md:text-6xl'
      : headline.length < 50 
        ? 'text-3xl sm:text-4xl md:text-5xl'
        : 'text-2xl sm:text-3xl md:text-4xl'
  
    return (
      <div className="absolute inset-0 bg-black flex flex-col">
        
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
  
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-10 md:p-12">
          
          {/* Category */}
          <div>
            <span className="inline-block bg-amber-400 text-black text-xs font-bold tracking-widest uppercase px-3 py-1">
              {category}
            </span>
          </div>
  
          {/* Headline */}
          <div>
            <h1 className={`text-white font-bold uppercase leading-tight mb-3 ${headlineSize}`}>
              {headline}
            </h1>
            {subhead && (
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {subhead}
              </p>
            )}
            
            {/* Footer */}
            <div className="flex items-center gap-1.5 mt-6 pt-4 border-t border-white/20">
              <span className="text-sm font-bold tracking-wide text-amber-400">
                BIGBET.ENERGY⚡
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }