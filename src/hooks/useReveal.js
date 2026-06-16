import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach((node) => node.classList.add('visible'))
  }, [])
}
