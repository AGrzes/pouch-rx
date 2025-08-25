const {flatMap} = require('rxjs/operators')
const log = require('debug')('ouch-rx:sink')
module.exports.sink = (db) => (source) => {
  log('Called')
  return source.pipe(flatMap((document) => {
    log('Saving %o', document)
    return db.put(document)
  }))
}
