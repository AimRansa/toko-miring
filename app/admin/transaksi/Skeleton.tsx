'use client'

export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-4 bg-slate-300 rounded w-24" />
          <div className="h-4 bg-slate-300 rounded w-32" />
          <div className="h-4 bg-slate-300 rounded w-20" />
          <div className="h-4 bg-slate-300 rounded w-36" />
          <div className="h-4 bg-slate-300 rounded w-28" />
          <div className="h-4 bg-slate-300 rounded w-24" />
        </div>
      ))}
    </div>
  )
}
