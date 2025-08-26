import { all } from './all'
import { assign } from './assign'
import { changes } from './changes'
import { merge } from './merge'
import { override } from './override'
import { sink } from './sink'
import { skip } from './skip'
import { view } from './view'

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
