import { CartesianGrid, Line, LineChart as ReLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MonoLineChart({ data, lines, colors = ["#000000", "#6b6b6b", "#cccccc"] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ReLineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="#e0e0e0" vertical={false} />
        <XAxis dataKey="year" stroke="#6b6b6b" />
        <YAxis stroke="#6b6b6b" />
        <Tooltip contentStyle={{ background: "#000", color: "#fff", borderRadius: 4, border: 0, fontSize: 12 }} />
        {lines.map((line, index) => <Line key={line} dataKey={line} stroke={colors[index] || "#cccccc"} strokeWidth={2} dot={false} />)}
      </ReLineChart>
    </ResponsiveContainer>
  );
}
