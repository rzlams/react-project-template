export const setStorage = (key, data, type = 'local') => {
  const storage = type === 'local' ? localStorage : sessionStorage
  storage.setItem(key, JSON.stringify(data))
}

export const getStorage = (key, type = 'local') => {
  const storage = type === 'local' ? localStorage : sessionStorage
  return JSON.parse(storage.getItem(key))
}

export const removeStorage = (key, type = 'local') => {
  const storage = type === 'local' ? localStorage : sessionStorage
  storage.removeItem(key)
}
