// app/admin/components/cards/StatsCardCustomer.tsx
import StatsCard from "../StatsCard";
import { prisma } from "@/lib/prisma";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function StatsCardCustomer() {
  await delay(1000); // delay card ke-3

  const count = await prisma.customer.count();

  return (
    <StatsCard
      title="Total Customer"
      value={count.toString()}
      percentage="0.95%"
      isPositive={false}
    />
  );
}
