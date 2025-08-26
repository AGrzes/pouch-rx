/* c8 ignore start */
import { assign } from './merge/assign'
import { merge } from './merge/merge'
import { override } from './merge/override'
import { skip } from './merge/skip'
import { sink } from './sink/sink'
import { all } from './source/all'
import { changes } from './source/changes'
import { view } from './source/view'

export class Ouch<T extends {}> {
  constructor(private db: PouchDB.Database<T>) {}
  sink() {
    return sink(this.db)
  }
  merge(mergeFunction: Parameters<typeof merge>[1]) {
    return merge(this.db, mergeFunction)
  }
  all(options: Parameters<typeof all>[1]) {
    return all(this.db, options)
  }
  changes(options: Parameters<typeof changes>[1]) {
    return changes(this.db, options)
  }
  view(name: string, options: Parameters<typeof view>[2]) {
    return view(this.db, name, options)
  }
}

export { all, assign, changes, merge, override, sink, skip, view }
