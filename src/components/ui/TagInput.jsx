import styles from './TagInput.module.css'

export default function TagInput({ tags = [] }) {
  return <div className={styles.tags}>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
}
