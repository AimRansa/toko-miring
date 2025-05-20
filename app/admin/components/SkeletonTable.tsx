export default function SkeletonTable() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="animate-pulse space-y-4">
        {Array(5).fill(null).map((_, idx) => (
          <div key={idx} className="h-6 bg-gray-200 rounded w-full" />
        ))}
      </div>
    </div>
  );
}
