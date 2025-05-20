// app/admin/components/cards/StatsCardProduct.tsx
import StatsCard from "../StatsCard";
import { prisma } from "@/lib/prisma";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function StatsCardProduct() {
  await delay(3000); // delay card ke-2

  const count = await prisma.product.count();

  return (
    <StatsCard
      title="Total Product"
      value={count.toString()}
      percentage="2.59%"
      isPositive={true}
    />
  );
}
