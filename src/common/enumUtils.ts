export const enumKeys = <O extends object, K extends keyof O = keyof O>(obj: O): K[] => {
  return Object.values(obj).filter(k => typeof (k) === 'string') as K[]
}
