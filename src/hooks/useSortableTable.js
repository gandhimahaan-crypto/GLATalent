import { useMemo, useState } from 'react'

export function useSortableTable(rows) {
  const [sortKey, setSortKey] = useState(null)
  const sortedRows = useMemo(() => sortKey ? [...rows].sort((a, b) => String(a[sortKey]).localeCompare(String(b[sortKey]))) : rows, [rows, sortKey])
  return { sortKey, setSortKey, sortedRows }
}
