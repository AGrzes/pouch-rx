import debug from 'debug'
import { Observable } from 'rxjs'

const log = debug('ouch-rx:changes')
export const changes = (db, options?) => {
  log('Called with options %o', options)
  return Observable.create((observer) => {
    log('Calling changes')
    db.changes(options)
      .on('change', (row) => {
        log('Pushing change %o', row)
        observer.next(row)
      })
      .on('complete', () => {
        log('Complete')
        observer.complete()
      })
      .on('error', (error) => {
        log('Error %o', error)
        observer.error(error)
      })
  })
}
