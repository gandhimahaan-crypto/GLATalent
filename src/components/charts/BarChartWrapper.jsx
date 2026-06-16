import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './Charts.module.css'

export default function BarChartWrapper({ data, xKey = 'name', yKey = 'value', layout = 'vertical' }) {
  const vertical = layout === 'vertical'
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout={vertical ? 'vertical' : 'horizontal'} margin={{ left: 12, right: 12, top: 8, bottom: 8 }}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
          {vertical ? <XAxis type="number" tick={{ fill: '#6b6b6b', fontSize: 12 }} /> : <XAxis dataKey={xKey} tick={{ fill: '#6b6b6b', fontSize: 12 }} />}
          {vertical ? <YAxis type="category" dataKey={xKey} width={118} tick={{ fill: '#6b6b6b', fontSize: 12 }} /> : <YAxis tick={{ fill: '#6b6b6b', fontSize: 12 }} />}
          <Tooltip contentStyle={{ background: '#000', color: '#fff', border: 0, borderRadius: 6 }} />
          <Bar dataKey={yKey} fill="var(--gla-orange)" radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
