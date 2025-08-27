import debug from 'debug'
import { MergeFunction } from './merge.js'

const log = debug('pouch-rx:override')
export const override: MergeFunction = <T>(
  document: PouchDB.Core.Document<T>,
  { _rev }: PouchDB.Core.ExistingDocument<T> = {} as any
): PouchDB.Core.Document<T> => {
  log('Called with document %o rev %s', document, _rev)
  const result = _rev ? { ...document, _rev } : document
  log('Returning %o', result)
  return result
}
