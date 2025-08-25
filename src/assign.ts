const log = require('debug')('ouch-rx:assign')
module.exports = (document, {_rev, ...rest} = {}) => {
  log('Called with document %o rev %s rest %o', document, _rev, rest)
  const result = _rev ? {...rest, ...document, _rev} : document
  log('Returning %o', result)
  return result
}
