import debug from 'debug'
import { OperatorFunction } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

const log = debug('ouch-rx:sink')
export const sink =
  <T extends {}>(
    db: PouchDB.Database<T>
  ): OperatorFunction<PouchDB.Core.ExistingDocument<T>, T & PouchDB.Core.IdMeta & PouchDB.Core.RevisionIdMeta> =>
  (source) => {
    log('Called')
    return source.pipe(
      mergeMap(async (document) => {
        log('Saving %o', document)
        const put = await db.put(document)

        return { ...document, _id: put.id, _rev: put.rev }
      })
    )
  }
