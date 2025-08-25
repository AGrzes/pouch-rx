const log = require('debug')('ouch-rx:skip')
module.exports = (document, existing) => {
  log('Called with document %o existing %o', document, existing)
  const result = existing ? null : document
  log('Returning %o', result)
  return result
}
