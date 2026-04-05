"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  totalKm: number;
}

export default function RunChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis unit=" km" />
        <Tooltip formatter={(value) => `${Number(value).toFixed(2)} km`} />
        <Bar dataKey="totalKm" name="Total KM" fill="#FC4C02" />
      </BarChart>
    </ResponsiveContainer>
  );
}
