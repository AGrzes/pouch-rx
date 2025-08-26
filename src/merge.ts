import debug from 'debug'
import lodash from 'lodash'
import { flatMap } from 'rxjs/operators'

const { isEqual } = lodash
const log = debug('ouch-rx:merge')
export const merge = (db, f) => (source) =>
  source.pipe(
    flatMap(async (object) => {
      log('Saving %o', object)
      const document = f(object)
      log('Transformed %o', document)
      try {
        return await db.put(document)
      } catch (error) {
        if (error.name === 'conflict') {
          const existing = await db.get(document._id)
          log('Merging %o and %o', object, existing)
          const merged = f(object, existing)
          log('Merged %o', merged)
          const save = merged && !isEqual(merged, existing)
          log('Save %o', save)
          return save ? db.put(merged) : existing
        } else {
          log('Error %o', error)
          throw error
        }
      }
    })
  )
