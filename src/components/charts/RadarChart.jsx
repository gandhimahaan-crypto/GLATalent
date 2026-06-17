import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

export function MonoRadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e0e0e0" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: "#6b6b6b", fontSize: 12 }} />
        <Tooltip contentStyle={{ background: "#000", color: "#fff", borderRadius: 4, border: 0, fontSize: 12 }} />
        <Radar dataKey="value" stroke="#000000" fill="rgba(0,0,0,0.05)" />
      </RadarChart>
    </ResponsiveContainer>
  );
}
