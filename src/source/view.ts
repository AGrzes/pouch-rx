import debug from 'debug'
import { defer, from, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

const log = debug('pouch-rx:view')
export const view = <T extends {}, R extends {}>(
  db: PouchDB.Database<T>,
  name?: string,
  options?: PouchDB.Query.Options<T, R>
): Observable<PouchDB.Core.ExistingDocument<R>> => {
  log('Called with name %s and options %o', name, options)
  return defer(() =>
    from(db.query<R>(name, { ...options, include_docs: true })).pipe(
      mergeMap((documents) => from(documents.rows.map(({ doc }) => doc)))
    )
  )
}
