import debug from 'debug'

const log = debug('ouch-rx:skip')
export const skip = (document, existing?) => {
  log('Called with document %o existing %o', document, existing)
  const result = existing ? null : document
  log('Returning %o', result)
  return result
}
