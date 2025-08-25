const expect = require('chai').use(require('sinon-chai')).expect
const sinon = require('sinon')
const {changes} = require('../src/changes')
const {toArray} = require('rxjs/operators')
const EventEmitter = require('events')
const process = require('process')
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
        })
      }
      changes(db).subscribe({
        complete () {
          expect(db.changes).to.have.been.called
          done()
        },
        error: done
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
        })
      }
      changes(db, {
        other: true
      }).subscribe({
        complete () {
          expect(db.changes).to.have.been.calledWithMatch((options) => options && options.other === true)
          done()
        },
        error: done
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
        })
      }
      changes(db).pipe(toArray())
        .subscribe({
          next (rows) {
            expect(rows).to.be.deep.equals([{ doc: 'a' }, { doc: 'b' }])
            done()
          },
          error: done
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
        })
      }
      changes(db).subscribe({
        complete () {
          expect.fail()
        },
        error: (err) => {
          expect(err).to.be.equals(error)
          done()
        }
      })
    })
  })
})
