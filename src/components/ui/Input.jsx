import styles from './Input.module.css'

export default function Input({ label, placeholder, value, onChange, type = 'text', error, helperText, name }) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={`${styles.input} ${error ? styles.error : ''}`} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} />
      {(error || helperText) && <p className={error ? styles.errorText : styles.helper}>{error || helperText}</p>}
    </div>
  )
}
