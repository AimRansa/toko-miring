// app/admin/components/LineChartSection.tsx
"use server";

import LineChartComponent from "./LineChartComponent";

const profitData = [
  { month: "Sep", value: 20 },
  { month: "Oct", value: 35 },
  { month: "Nov", value: 45 },
  { month: "Dec", value: 60 },
  { month: "Jan", value: 40 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 70 },
];

export default async function LineChartSection() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // simulasi delay

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Profit this week</h2>
      <LineChartComponent data={profitData} />
      <div className="flex justify-between mt-4">
        {profitData.map((item) => (
          <span key={item.month} className="text-gray-500 text-xs">
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
}
