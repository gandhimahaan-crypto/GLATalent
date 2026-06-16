import styles from './Button.module.css'

export default function Button({ variant = 'primary', size = 'md', onClick, disabled, fullWidth, children, type = 'button' }) {
  return (
    <button type={type} className={[styles.btn, styles[variant], styles[size], fullWidth ? styles.fullWidth : '', disabled ? styles.disabled : ''].join(' ')} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
