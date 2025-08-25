const rx = require('rxjs')
const log = require('debug')('ouch-rx:all')
module.exports.all = (db, options) => {
  log('Called with options %o', options)
  return rx.Observable.create((observer) => {
    log('Calling allDocs')
    db.allDocs({...options, include_docs: true}).then((documents) => {
      log('Pushing documents')
      documents.rows.forEach((row) => observer.next(row.doc))
      log('Finishing')
      observer.complete()
    }).catch((err) => {
      log('Error %o', err)
      observer.error(err)
    })
  })
}
