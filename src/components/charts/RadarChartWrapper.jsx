import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import styles from './Charts.module.css'

export default function RadarChartWrapper({ data, angleKey = 'skill', dataKey = 'score' }) {
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey={angleKey} tick={{ fill: '#6b6b6b', fontSize: 12 }} />
          <Tooltip contentStyle={{ background: '#000', color: '#fff', border: 0, borderRadius: 6 }} />
          <Radar dataKey={dataKey} fill="rgba(232,82,10,0.08)" stroke="var(--gla-orange)" strokeWidth={1.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
