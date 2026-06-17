export function StepWizard({ step, labels }) {
  return (
    <div className="wizard-head">
      <div className="step-labels">
        {labels.map((label, index) => {
          const state = index < step ? "completed" : index === step ? "active" : "upcoming";
          return (
            <span className={state} key={label}>
              <i>{index < step ? "✓" : index + 1}</i>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
