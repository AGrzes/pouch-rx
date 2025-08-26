import debug from 'debug'
import { Observable } from 'rxjs'

const log = debug('ouch-rx:all')
export const all = (db, options?) => {
  log('Called with options %o', options)
  return Observable.create((observer) => {
    log('Calling allDocs')
    db.allDocs({ ...options, include_docs: true })
      .then((documents) => {
        log('Pushing documents')
        documents.rows.forEach((row) => observer.next(row.doc))
        log('Finishing')
        observer.complete()
      })
      .catch((err) => {
        log('Error %o', err)
        observer.error(err)
      })
  })
}
