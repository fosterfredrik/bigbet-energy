'use client';

interface DonutSegment {
  label: string;
  value: number;
  highlight?: boolean;
}

interface DonutProps {
  label?: string;
  title: string;
  subtitle?: string;
  date: string;
  source: string;
  segments: DonutSegment[];
  portrait?: string;
}

export default function Donut({ 
  label = "Breakdown",
  title, 
  subtitle, 
  date, 
  source, 
  segments,
  portrait
}: DonutProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  
  // Ring is 50% thinner, portrait stays same size
  const strokeWidth = 16; // Was 32
  const portraitRadius = 90; // Same as before
  const radius = portraitRadius + strokeWidth / 2 + 8;
  const size = 2 * (radius + strokeWidth / 2 + 4);
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const labelRadius = radius + strokeWidth / 2 + 25;

  // Gold + greys palette
  const greys = ['#6B7280', '#4B5563', '#374151'];

  // Calculate segment positions
  let currentAngle = -90; // Start from top
  const segmentData = segments.map((segment, index) => {
    const percentage = (segment.value / total) * 100;
    const sweepAngle = (segment.value / total) * 360;
    const length = (circumference * segment.value) / total;
    const gap = 4;
    const adjustedLength = Math.max(0, length - gap);
    
    // Mid-angle for label positioning
    const midAngle = currentAngle + sweepAngle / 2;
    const midAngleRad = (midAngle * Math.PI) / 180;
    
    // Label position
    const labelX = center + labelRadius * Math.cos(midAngleRad);
    const labelY = center + labelRadius * Math.sin(midAngleRad);
    
    // Line end point (on the donut edge)
    const lineEndRadius = radius + strokeWidth / 2 + 3;
    const lineX = center + lineEndRadius * Math.cos(midAngleRad);
    const lineY = center + lineEndRadius * Math.sin(midAngleRad);
    
    const startAngle = currentAngle;
    currentAngle += sweepAngle;
    
    // Which side for text alignment
    const isRightSide = midAngle > -90 && midAngle < 90;
    
    // Grey index
    let greyIndex = 0;
    for (let i = 0; i < index; i++) {
      if (!segments[i].highlight) greyIndex++;
    }
    
    return {
      ...segment,
      percentage,
      length: adjustedLength,
      startAngle,
      midAngle,
      labelX,
      labelY,
      lineX,
      lineY,
      isRightSide,
      color: segment.highlight ? '#E5B94E' : greys[greyIndex % greys.length]
    };
  });

  // Convert angle to offset
  const getOffset = (startAngle: number) => {
    const normalizedAngle = ((startAngle + 90) / 360) * circumference;
    return -normalizedAngle;
  };

  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      {/* Label */}
      <div className="mb-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#E5B94E' }}>
          {label}
        </span>
      </div>

      {/* Title - secondary */}
      <div className="mb-4">
        <h2 className="text-neutral-400 text-lg sm:text-xl font-bold uppercase tracking-wide">
          {title}
        </h2>
      </div>

      {/* Donut Chart with Labels */}
      <div className="flex-1 flex items-center justify-center">
        <svg 
          width="100%"
          height="100%"
          viewBox={`-55 -35 ${size + 110} ${size + 70}`}
          preserveAspectRatio="xMidYMid meet"
          className="max-w-[340px] max-h-[300px]"
        >
          {/* Donut segments */}
          <g transform={`rotate(-90, ${center}, ${center})`}>
            {segmentData.map((segment, index) => (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={segment.highlight ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={`${segment.length} ${circumference}`}
                strokeDashoffset={getOffset(segment.startAngle)}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Labels around the donut */}
          {segmentData.map((segment, index) => (
            <g key={`label-${index}`}>
              {/* Connector line */}
              <line
                x1={segment.lineX}
                y1={segment.lineY}
                x2={segment.labelX}
                y2={segment.labelY}
                stroke={segment.color}
                strokeWidth={1.5}
                opacity={0.7}
              />
              
              {/* Label text */}
              <text
                x={segment.labelX + (segment.isRightSide ? 5 : -5)}
                y={segment.labelY - 3}
                textAnchor={segment.isRightSide ? 'start' : 'end'}
                className="fill-white font-bold"
                style={{ fontSize: '12px' }}
              >
                {segment.label}
              </text>
              <text
                x={segment.labelX + (segment.isRightSide ? 5 : -5)}
                y={segment.labelY + 11}
                textAnchor={segment.isRightSide ? 'start' : 'end'}
                className="font-bold"
                style={{ fontSize: '13px', fill: segment.color }}
              >
                {Math.round(segment.percentage)}%
              </text>
            </g>
          ))}

          {/* Center portrait */}
          {portrait && (
            <>
              <defs>
                <clipPath id="donut-portrait-clip">
                  <circle cx={center} cy={center} r={portraitRadius} />
                </clipPath>
              </defs>
              <circle 
                cx={center} 
                cy={center} 
                r={portraitRadius + 2} 
                fill="none" 
                stroke="#262626" 
                strokeWidth={3}
              />
              <image
                href={portrait}
                x={center - portraitRadius}
                y={center - portraitRadius}
                width={portraitRadius * 2}
                height={portraitRadius * 2}
                clipPath="url(#donut-portrait-clip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </>
          )}

          {/* If no portrait, show percentage in center */}
          {!portrait && (
            <>
              <text
                x={center}
                y={center + 8}
                textAnchor="middle"
                style={{ fontSize: '42px', fill: '#E5B94E', fontWeight: 900 }}
              >
                {Math.round((segmentData.find(s => s.highlight) || segmentData[0]).percentage)}%
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-neutral-800">
        <div className="text-neutral-500 text-xs uppercase tracking-wide">
          {source} • {date}
        </div>
      </div>
    </div>
  );
}
