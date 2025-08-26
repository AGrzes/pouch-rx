import debug from 'debug'
import { MergeFunction } from './merge.js'

const log = debug('ouch-rx:assign')
export const assign: MergeFunction = <T>(
  document: PouchDB.Core.Document<T>,
  { _rev, ...rest }: PouchDB.Core.ExistingDocument<T> = {} as any
): PouchDB.Core.Document<T> => {
  log('Called with document %o rev %s rest %o', document, _rev, rest)
  const result = _rev ? { ...rest, ...document, _rev } : document
  log('Returning %o', result)
  return result
}
