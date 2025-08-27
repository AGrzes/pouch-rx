import debug from 'debug'
import { defer, from, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

const log = debug('pouch-rx:all')
export const all = <T extends {}>(
  db: PouchDB.Database<T>,
  options?: Parameters<PouchDB.Database<T>['allDocs']>[0]
): Observable<PouchDB.Core.ExistingDocument<T>> => {
  log('Called with options %o', options)
  return defer(() =>
    from(db.allDocs({ ...options, include_docs: true })).pipe(
      mergeMap((documents) => from(documents.rows.map(({ doc }) => doc)))
    )
  )
}
