const env = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`missing env key: ${key}`)
  }
  return value
}

const keys = ["NODE_ENV", "APP_KEY", "PORT"] as const

export default Object.fromEntries(keys.map(key => [key, env(key)])) as {
  [key in typeof keys[number]]: string
}
