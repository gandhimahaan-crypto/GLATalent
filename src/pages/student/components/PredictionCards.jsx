import Badge from '../../../components/ui/Badge'
import Card from '../../../components/ui/Card'
import ProgressBar from '../../../components/ui/ProgressBar'
import ReadinessGauge from './ReadinessGauge'
import styles from './StudentComponents.module.css'

export default function PredictionCards({ prediction }) {
  return (
    <div className={styles.predictionGrid}>
      <Card><p className={styles.kicker}>Best Fit Domain</p><h3>{prediction.bestDomain}</h3><p>{prediction.confidence}% confidence</p></Card>
      <Card><p className={styles.kicker}>Expected Package</p><h3>{prediction.packageRange}</h3><p>Annual CTC estimate</p></Card>
      <Card><p className={styles.kicker}>Placement Probability</p><h3>{prediction.probability}%</h3><p>Based on profile</p></Card>
      <Card className={styles.center}><p className={styles.kicker}>Readiness Score</p><ReadinessGauge value={prediction.readiness} /></Card>
      <Card><p className={styles.kicker}>Company Tier</p><div className={styles.badges}>{prediction.companyTier.map((tier) => <Badge key={tier} variant="gla">{tier}</Badge>)}</div></Card>
      <Card><p className={styles.kicker}>Top 3 Domains</p>{prediction.topDomains.map((item) => <ProgressBar key={item.domain} label={item.domain} value={item.score} />)}</Card>
    </div>
  )
}
