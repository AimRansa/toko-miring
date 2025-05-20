// app/admin/dashboard/loading.tsx
import SkeletonCard from "../components/SkeletonCard";
import SkeletonTable from "../components/SkeletonTable";

export default function LoadingDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Skeleton Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Skeleton Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SkeletonCard className="h-[300px]" />
          <SkeletonCard className="h-[300px]" />
        </div>

        {/* Skeleton Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <SkeletonTable />
        </div>
      </div>
    </div>
  );
}
