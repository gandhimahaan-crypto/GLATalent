export function Progress({ value, label }) {
  return (
    <div className="progress-wrap">
      {label && <span className="caption">{label}</span>}
      <div className="progress"><span style={{ width: `${value}%` }} /></div>
    </div>
  );
}
