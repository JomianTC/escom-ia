export const setLocalStorage = (key: string, value: string | object | any) => {
  if (typeof value === 'object') { localStorage.setItem(key, JSON.stringify({ ...value })) }
  localStorage.setItem(key, JSON.stringify({ value }))
}

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key)
  return JSON.parse(value ?? '')
}

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
