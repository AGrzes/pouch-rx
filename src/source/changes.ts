import debug from 'debug'
import { Observable, Subscriber } from 'rxjs'

const log = debug('pouch-rx:changes')
export const changes = <T extends {}>(
  db: PouchDB.Database<T>,
  options?: PouchDB.Core.ChangesOptions
): Observable<PouchDB.Core.ChangesResponseChange<T>> => {
  log('Called with options %o', options)
  return new Observable((observer: Subscriber<PouchDB.Core.ChangesResponseChange<T>>) => {
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
