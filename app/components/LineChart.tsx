interface DataPoint {
  label: string
  value: number
}

interface LineChartProps {
  title: string
  subtitle?: string
  date: string
  source: string
  data: DataPoint[]
  unit?: string
}

export default function LineChart({ title, subtitle, date, source, data, unit = '%' }: LineChartProps) {
  const width = 380
  const height = 180
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  
  const values = data.map(d => d.value)
  const minValue = Math.min(...values) - 1
  const maxValue = Math.max(...values) + 1
  
  const xStep = chartWidth / (data.length - 1)
  
  const getY = (value: number) => {
    return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight
  }
  
  const pathData = data
    .map((point, i) => {
      const x = i * xStep
      const y = getY(point.value)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const lastPoint = data[data.length - 1]
  const firstPoint = data[0]
  const change = lastPoint.value - firstPoint.value
  const changeText = change >= 0 ? `+${change}` : `${change}`

  return (
    <div className="w-full h-full bg-black p-6 sm:p-10 md:p-12 flex flex-col">
      
      {/* Header */}
      <div className="mb-4">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#E5B94E' }}>
          Odds Movement
        </div>
        <h2 className="text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-400 text-base mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center">
        <svg 
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[380px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform={`translate(${padding.left}, ${padding.top})`}>
            
            {/* Grid lines */}
            {[...Array(5)].map((_, i) => {
              const value = minValue + ((maxValue - minValue) / 4) * i
              return (
                <g key={i}>
                  <line
                    x1={0}
                    y1={getY(value)}
                    x2={chartWidth}
                    y2={getY(value)}
                    className="stroke-neutral-900"
                    strokeWidth={1}
                  />
                </g>
              )
            })}
            
            {/* Line */}
            <path
              d={pathData}
              fill="none"
              className="stroke-amber-400"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {data.map((point, i) => (
              <circle
                key={i}
                cx={i * xStep}
                cy={getY(point.value)}
                r={5}
                className="fill-amber-400"
              />
            ))}
            
            {/* X-axis labels */}
            {data.map((point, i) => (
              <text
                key={i}
                x={i * xStep}
                y={chartHeight + 18}
                className="fill-neutral-500"
                fontSize={11}
                textAnchor="middle"
              >
                {point.label}
              </text>
            ))}
          </g>
        </svg>
      </div>

      {/* Change indicator */}
      <div className="text-center mb-2">
        <span className={`text-3xl sm:text-4xl font-bold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {changeText}{unit}
        </span>
        <span className="text-neutral-400 text-sm ml-2">
          since {firstPoint.label}
        </span>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 pt-4 border-t border-neutral-800">
        <div className="text-neutral-500 text-sm uppercase tracking-wide">
          {source} • {date}
        </div>
      </div>
    </div>
  )
}