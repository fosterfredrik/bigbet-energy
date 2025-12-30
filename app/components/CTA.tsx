interface CTAProps {
    offer: string
    description?: string
    buttonText: string
    buttonUrl: string
    logo: string
    logoAlt: string
    terms: string
    date: string
  }
  
  export default function CTA({ offer, description, buttonText, buttonUrl, logo, logoAlt, terms, date }: CTAProps) {
    // Auto-size offer text based on length
    const offerSize = offer.length < 30 
      ? 'text-2xl sm:text-3xl' 
      : offer.length < 50 
        ? 'text-xl sm:text-2xl'
        : 'text-lg sm:text-xl'
  
    return (
      <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
        
        {/* Header */}
        <div className="mb-4">
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
            Featured Offer
          </div>
        </div>
  
        {/* Logo */}
        <div className="mb-6">
          <img 
            src={logo} 
            alt={logoAlt}
            className="h-12 sm:h-14 object-contain"
          />
        </div>
  
        {/* Offer */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className={`text-white font-bold uppercase leading-tight mb-4 ${offerSize}`}>
            {offer}
          </h2>
          {description && (
            <p className="text-neutral-400 text-sm sm:text-base mb-6">
              {description}
            </p>
          )}
  
          {/* Button */}
          <a 
            href={buttonUrl}
            className="inline-block bg-amber-400 hover:bg-amber-500 text-black text-center font-bold uppercase tracking-wide py-4 px-6 text-lg transition-colors"
          >
            {buttonText}
          </a>
        </div>
  
        {/* Terms */}
        <div className="mt-6 pt-4 border-t border-neutral-800">
          <p className="text-neutral-600 text-xs leading-relaxed mb-3">
            {terms}
          </p>
          
          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
            <div className="text-neutral-600 text-xs uppercase tracking-wide">
              Ad • {date}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">⚡</span>
              <span className="text-sm font-bold tracking-wide" style={{ color: '#E5B94E' }}>
                BIGBET.ENERGY
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }