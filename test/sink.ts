import chai from 'chai'
import 'mocha'
import * as rx from 'rxjs'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { sink } from '../src/sink'

const expect = chai.use(sinonChai).expect
describe('Ouch', function () {
  describe('#sink()', function () {
    it('should call put', function (done) {
      const db = {
        put: sinon.spy(() => Promise.resolve(null)),
      }
      rx.of('a')
        .pipe(sink(db))
        .subscribe({
          complete() {
            expect(db.put).to.have.been.called
            done()
          },
          error: done,
        })
    })
    it('should pass items to put', function (done) {
      const db = {
        put: sinon.spy(() => Promise.resolve(null)),
      }
      rx.of('a', 'b')
        .pipe(sink(db))
        .subscribe({
          complete() {
            expect(db.put).to.have.been.calledWith('a')
            expect(db.put).to.have.been.calledWith('b')
            done()
          },
          error: done,
        })
    })
    it('should continue when put failed', function (done) {
      const error = new Error()
      const db = {
        put: sinon.spy(() => Promise.reject(error)),
      }
      rx.of('a', 'b')
        .pipe(sink(db))
        .subscribe({
          error(err) {
            expect(err).to.be.equal(error)
            done()
          },
          complete() {
            expect.fail()
          },
        })
    })
  })
})
