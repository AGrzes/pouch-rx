const rx = require('rxjs')
const log = require('debug')('ouch-rx:view')
module.exports.view = (db, name, options) => {
  log('Called with name %s and options %o', name, options)
  return rx.Observable.create((observer) => {
    log('Calling query')
    db.query(name, {...options, include_docs: true}).then((documents) => {
      log('Pushing documents')
      documents.rows.forEach((row) => observer.next(row.doc))
      log('Finishing')
      observer.complete()
    }).catch((err) => {
      log('Error %o', err)
      return observer.error(err)
    })
  })
}
