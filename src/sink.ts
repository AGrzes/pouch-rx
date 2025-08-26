import debug from 'debug'
import { flatMap } from 'rxjs/operators'

const log = debug('ouch-rx:sink')
module.exports.sink = (db) => (source) => {
  log('Called')
  return source.pipe(
    flatMap((document) => {
      log('Saving %o', document)
      return db.put(document)
    })
  )
}
