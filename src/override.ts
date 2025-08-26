import debug from 'debug'

const log = debug('ouch-rx:override')
module.exports = (document, { _rev } = {} as any) => {
  log('Called with document %o rev %s', document, _rev)
  const result = _rev ? { ...document, _rev } : document
  log('Returning %o', result)
  return result
}
