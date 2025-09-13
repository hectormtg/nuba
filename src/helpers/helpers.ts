export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms || 1000))
