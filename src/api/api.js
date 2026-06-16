export async function api(path, options = {}) {
  const baseUrl = import.meta.env.VITE_API_URL
  const response = await fetch(`${baseUrl}${path}`, options)
  if (!response.ok) throw new Error('Request failed')
  return response.json()
}
