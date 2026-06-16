import BarChartWrapper from '../../../components/charts/BarChartWrapper'

export default function SubjectBarChart({ data }) {
  return <BarChartWrapper data={data.map((item) => ({ name: item.subject, value: item.score }))} />
}
