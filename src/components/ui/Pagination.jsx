import styles from './Pagination.module.css'
import Button from './Button'

export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className={styles.pagination}>
      <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</Button>
      <span>Page {page} of {totalPages}</span>
      <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Next</Button>
    </div>
  )
}
