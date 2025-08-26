import chai from 'chai'
import EventEmitter from 'events'
import 'mocha'
import process from 'process'
import { toArray } from 'rxjs/operators'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { changes } from '../../src/source/changes'

const expect = chai.use(sinonChai).expect
describe('Ouch', function () {
  describe('#changes()', function () {
    it('should call changes', function (done) {
      const db = {
        changes: sinon.spy(() => {
          const emiter = new EventEmitter()
          emiter.once('newListener', () => {
            process.nextTick(() => {
              emiter.emit('change', {})
              emiter.emit('complete')
            })
          })
          return emiter
        }),
      }
      changes(db as unknown as PouchDB.Database).subscribe({
        complete() {
          expect(db.changes).to.have.been.called
          done()
        },
        error: done,
      })
    })

    it('should pass options to `changes`', function (done) {
      const db = {
        changes: sinon.spy(() => {
          const emiter = new EventEmitter()
          emiter.once('newListener', () => {
            process.nextTick(() => {
              emiter.emit('change', {})
              emiter.emit('complete')
            })
          })
          return emiter
        }),
      }
      changes(db as unknown as PouchDB.Database, {
        conflicts: true,
      }).subscribe({
        complete() {
          expect(db.changes).to.have.been.calledWithMatch((options) => options && options.conflicts === true)
          done()
        },
        error: done,
      })
    })

    it('should read rows', function (done) {
      const db = {
        changes: sinon.spy(() => {
          const emiter = new EventEmitter()
          emiter.once('newListener', () => {
            process.nextTick(() => {
              emiter.emit('change', { doc: 'a' })
              emiter.emit('change', { doc: 'b' })
              emiter.emit('complete')
            })
          })
          return emiter
        }),
      }
      changes(db as unknown as PouchDB.Database)
        .pipe(toArray())
        .subscribe({
          next(rows) {
            expect(rows).to.be.deep.equals([{ doc: 'a' }, { doc: 'b' }])
            done()
          },
          error: done,
        })
    })
    it('should handle error', function (done) {
      const error = new Error()
      const db = {
        changes: sinon.spy(() => {
          const emiter = new EventEmitter()
          emiter.once('newListener', () => {
            process.nextTick(() => {
              emiter.emit('error', error)
            })
          })
          return emiter
        }),
      }
      changes(db as unknown as PouchDB.Database).subscribe({
        complete() {
          expect.fail()
        },
        error: (err) => {
          expect(err).to.be.equals(error)
          done()
        },
      })
    })
  })
})
