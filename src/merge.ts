import debug from 'debug'
import lodash from 'lodash'
import { Observable, OperatorFunction } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

const { isEqual } = lodash
const log = debug('ouch-rx:merge')
export type MergeFunction = <T>(
  input: PouchDB.Core.Document<T>,
  existing?: PouchDB.Core.ExistingDocument<T>
) => PouchDB.Core.Document<T>

export const merge =
  <T extends {}>(
    db: PouchDB.Database<T>,
    mergeFunction: MergeFunction
  ): OperatorFunction<PouchDB.Core.Document<T>, T & PouchDB.Core.IdMeta & PouchDB.Core.RevisionIdMeta> =>
  (source: Observable<PouchDB.Core.Document<T>>) =>
    source.pipe(
      mergeMap(async (object) => {
        log('Saving %o', object)
        const document = mergeFunction(object)
        log('Transformed %o', document)
        try {
          const put = await db.put(document)

          return { ...document, _id: put.id, _rev: put.rev }
        } catch (error) {
          if (error.name === 'conflict') {
            const existing = await db.get(document._id)
            log('Merging %o and %o', object, existing)
            const merged = mergeFunction(object, existing)
            log('Merged %o', merged)
            const save = merged && !isEqual(merged, existing)
            log('Save %o', save)
            if (save) {
              const put = await db.put(merged)
              return { ...merged, _id: put.id, _rev: put.rev }
            } else {
              return existing
            }
          } else {
            log('Error %o', error)
            throw error
          }
        }
      })
    )
