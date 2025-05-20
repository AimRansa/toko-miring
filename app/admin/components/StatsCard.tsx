'use client'

type StatsCardProps = {
  title: string
  value: string
  percentage: string
  isPositive: boolean
}

export default function StatsCard({ title, value, percentage, isPositive }: StatsCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-1">
      <h4 className="text-sm text-gray-500">{title}</h4>
      <p className="text-xl font-semibold">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {percentage} {isPositive ? '↑' : '↓'}
      </p>
    </div>
  )
}
