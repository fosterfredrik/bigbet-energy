interface PostHeaderProps {
  category: string;
  title: string;
  subtitle?: string;
  date: string;
  image?: string;
}

export default function PostHeader({ 
  category, 
  title, 
  subtitle, 
  date,
  image
}: PostHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();

  return (
    <div className="relative w-full h-full bg-black flex flex-col overflow-hidden">
      {/* Background Image */}
      {image && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 w-full h-full p-6 sm:p-10 md:p-12 flex flex-col">
        {/* Top - Category */}
        <div className="mb-auto">
          <span className="inline-block bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* Middle - Title & Subtitle */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-neutral-300 text-base sm:text-lg md:text-xl mt-4 max-w-lg">
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom - Date */}
        <div className="mt-auto pt-4 border-t border-white/20">
          <span className="text-neutral-400 text-sm uppercase tracking-wider">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}