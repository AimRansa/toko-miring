// app/admin/components/StatsSection.tsx
import { Suspense } from "react";
import SkeletonCard from "./SkeletonCard";

import StatsCardProfit from "./cards/StatsCardProfit";
import StatsCardProduct from "./cards/StatsCardProduct";
import StatsCardCustomer from "./cards/StatsCardCustomer";
import StatsCardTopProduct from "./cards/StatsCardTopProduct";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Suspense fallback={<SkeletonCard />}>
        <StatsCardProfit />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <StatsCardProduct />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <StatsCardCustomer />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <StatsCardTopProduct />
      </Suspense>
    </div>
  );
}
