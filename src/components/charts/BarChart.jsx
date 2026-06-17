import { Bar, BarChart as ReBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MonoBarChart({ data, xKey, yKey, layout = "horizontal" }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ReBarChart data={data} layout={layout} margin={{ top: 8, right: 16, left: layout === "vertical" ? 28 : 0, bottom: 8 }}>
        <CartesianGrid stroke="#e0e0e0" vertical={false} />
        {layout === "vertical" ? <XAxis type="number" stroke="#6b6b6b" /> : <XAxis dataKey={xKey} stroke="#6b6b6b" />}
        {layout === "vertical" ? <YAxis dataKey={xKey} type="category" stroke="#6b6b6b" width={92} /> : <YAxis stroke="#6b6b6b" />}
        <Tooltip contentStyle={{ background: "#000", color: "#fff", borderRadius: 4, border: 0, fontSize: 12 }} />
        <Bar dataKey={yKey} fill="#000000" radius={[2, 2, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  );
}
