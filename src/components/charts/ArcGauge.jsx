export function ArcGauge({ value }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="arc-gauge">
      <svg viewBox="0 0 120 120" aria-label={`Readiness ${value} out of 100`}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e0e0e0" strokeWidth="8" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#000000" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} transform="rotate(-90 60 60)" />
      </svg>
      <strong>{value}/100</strong>
    </div>
  );
}
