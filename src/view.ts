import debug from 'debug'
import { Observable } from 'rxjs'

const log = debug('ouch-rx:view')
export const view = (db, name?, options?) => {
  log('Called with name %s and options %o', name, options)
  return Observable.create((observer) => {
    log('Calling query')
    db.query(name, { ...options, include_docs: true })
      .then((documents) => {
        log('Pushing documents')
        documents.rows.forEach((row) => observer.next(row.doc))
        log('Finishing')
        observer.complete()
      })
      .catch((err) => {
        log('Error %o', err)
        return observer.error(err)
      })
  })
}
