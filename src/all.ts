import debug from 'debug'
import { Observable } from 'rxjs'

const log = debug('ouch-rx:all')
export const all = <T extends {}>(db, options?) => {
  log('Called with options %o', options)
  return Observable.create(async (observer) => {
    log('Calling allDocs')
    try {
      const documents = await db.allDocs({ ...options, include_docs: true })
      log('Pushing documents')
      documents.rows.forEach((row) => observer.next(row.doc))
      log('Finishing')
      observer.complete()
    } catch (err) {
      log('Error %o', err)
      observer.error(err)
    }
  })
}
