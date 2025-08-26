import debug from 'debug'
import { MergeFunction } from './merge.js'

const log = debug('ouch-rx:skip')
export const skip: MergeFunction = <T>(
  document: PouchDB.Core.Document<T>,
  existing?: PouchDB.Core.ExistingDocument<T>
): PouchDB.Core.Document<T> => {
  log('Called with document %o existing %o', document, existing)
  const result = existing ? null : document
  log('Returning %o', result)
  return result
}
