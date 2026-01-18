interface HeroProps {
  headline: string;
  subhead?: string;
  image: string;
  odds?: number;
  category?: string;
  oddsLabel?: string;
}

export default function Hero({ 
  headline, 
  image,
}: HeroProps) {
  return (
    <div className="relative w-full h-full bg-black">
      
      {/* Headline - at top */}
      <div className="pt-6 sm:pt-10 md:pt-12 px-6 sm:px-10 md:px-12">
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-black text-center uppercase leading-tight tracking-tight">
          {headline}
        </h1>
      </div>

      {/* Image bar - absolute bottom, touching edge */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] sm:w-[220px] md:w-[280px] h-[240px] sm:h-[300px] md:h-[380px] rounded-t-xl overflow-hidden border-4 border-b-0 border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.4)]">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>

    </div>
  );
}