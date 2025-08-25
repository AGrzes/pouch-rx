const expect = require('chai').use(require('sinon-chai')).expect
const sinon = require('sinon')
const {sink} = require('../src/sink')
const rx = require('rxjs')
describe('Ouch', function () {
  describe('#sink()', function () {
    it('should call put', function (done) {
      const db = {
        put: sinon.spy(() => Promise.resolve(null))
      }
      rx.of('a').pipe(sink(db)).subscribe({
        complete () {
          expect(db.put).to.have.been.called
          done()
        },
        error: done
      })
    })
    it('should pass items to put', function (done) {
      const db = {
        put: sinon.spy(() => Promise.resolve(null))
      }
      rx.of('a', 'b').pipe(sink(db)).subscribe({
        complete () {
          expect(db.put).to.have.been.calledWith('a')
          expect(db.put).to.have.been.calledWith('b')
          done()
        },
        error: done
      })
    })
    it('should continue when put failed', function (done) {
      const error = new Error()
      const db = {
        put: sinon.spy(() => Promise.reject(error))
      }
      rx.of('a', 'b').pipe(sink(db)).subscribe({
        error (err) {
          expect(err).to.be.equal(error)
          done()
        },
        complete () {
          expect.fail()
        }
      })
    })
  })
})
