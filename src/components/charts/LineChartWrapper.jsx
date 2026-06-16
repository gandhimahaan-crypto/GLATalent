import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './Charts.module.css'

export default function LineChartWrapper({ data, lines = ['Software'] }) {
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 4, right: 16, top: 8, bottom: 8 }}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fill: '#6b6b6b', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b6b6b', fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#000', color: '#fff', border: 0, borderRadius: 6 }} />
          {lines.map((line, index) => <Line key={line} type="monotone" dataKey={line} stroke={index === 0 ? 'var(--gla-orange)' : 'var(--gla-green)'} strokeWidth={2} dot={{ r: 3 }} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
