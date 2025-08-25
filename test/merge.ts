const expect = require('chai').use(require('sinon-chai')).expect
const sinon = require('sinon')
const {
  merge
} = require('../src/merge')
const rx = require('rxjs')
describe('Ouch', function () {
  describe('#merge()', function () {
    it('should call put', function (done) {
      const f = sinon.spy((x) => x)
      const db = {
        put: sinon.spy(() => Promise.resolve(null))
      }
      rx.of('a').pipe(merge(db, f)).subscribe({
        complete () {
          expect(db.put).to.have.been.called
          done()
        },
        error: done
      })
    })
    it('should pass items to put', function (done) {
      const f = sinon.spy((x) => x)
      const db = {
        put: sinon.spy(() => Promise.resolve(null))
      }
      rx.of('a', 'b').pipe(merge(db, f)).subscribe({
        complete () {
          expect(db.put).to.have.been.calledWith('a')
          expect(db.put).to.have.been.calledWith('b')
          done()
        },
        error: done
      })
    })
    it('should pass items to provided function', function (done) {
      const f = sinon.spy((x) => x)
      const db = {
        put: sinon.spy(() => Promise.resolve(null))
      }
      rx.of('a', 'b').pipe(merge(db, f)).subscribe({
        complete () {
          expect(f).to.have.been.calledWith('a')
          expect(f).to.have.been.calledWith('b')
          done()
        },
        error: done
      })
    })

    it('should fail when put failed', function (done) {
      const f = sinon.spy((x) => x)
      const error = new Error()
      const db = {
        put: sinon.spy(() => Promise.reject(error))
      }
      rx.of('a', 'b').pipe(merge(db, f)).subscribe({
        error (err) {
          expect(err).to.be.equal(error)
          done()
        },
        complete () {
          expect.fail()
        }
      })
    })

    it('should call get when got update conflict', function (done) {
      const object = {
        _id: 'a'
      }
      const f = sinon.spy((x) => x)
      const error = new Error()
      error.name = 'conflict'
      const db = {
        put: sinon.stub().onFirstCall().returns(Promise.reject(error)).onSecondCall().returns(Promise.resolve()),
        get: sinon.spy(() => Promise.resolve(object))
      }
      rx.of(object).pipe(merge(db, f)).subscribe({
        complete () {
          expect(db.get).to.have.been.called
          done()
        },
        error: done
      })
    })

    it('should pass id to get when got update conflict', function (done) {
      const object = {
        _id: 'a'
      }
      const f = sinon.spy((x) => x)
      const error = new Error()
      error.name = 'conflict'
      const db = {
        put: sinon.stub().onFirstCall().returns(Promise.reject(error)).onSecondCall().returns(Promise.resolve()),
        get: sinon.spy(() => Promise.resolve(object))
      }
      rx.of(object).pipe(merge(db, f)).subscribe({
        complete () {
          expect(db.get).to.have.been.calledWith('a')
          done()
        },
        error: done
      })
    })
    it('should merge get result when got update conflict', function (done) {
      const object = {
        _id: 'a'
      }
      const f = sinon.spy((x) => x)
      const error = new Error()
      error.name = 'conflict'
      const db = {
        put: sinon.stub().onFirstCall().returns(Promise.reject(error)).onSecondCall().returns(Promise.resolve()),
        get: sinon.spy(() => Promise.resolve('b'))
      }
      rx.of(object).pipe(merge(db, f)).subscribe({
        complete () {
          expect(f.secondCall).to.have.been.calledWith(object, 'b')
          done()
        },
        error: done
      })
    })

    it('should put merge result when got update conflict', function (done) {
      const object = {
        _id: 'a'
      }
      const f = sinon.spy((x) => 'merge')
      const error = new Error()
      error.name = 'conflict'
      const db = {
        put: sinon.stub().onFirstCall().returns(Promise.reject(error)).onSecondCall().returns(Promise.resolve()),
        get: sinon.spy(() => Promise.resolve('b'))
      }
      rx.of(object).pipe(merge(db, f)).subscribe({
        complete () {
          expect(db.put.secondCall).to.have.been.calledWith('merge')
          done()
        },
        error: done
      })
    })

    it('should skip merge when merge result is null', function (done) {
      const object = {
        _id: 'a'
      }
      const f = sinon.spy((x, y) => y ? null : 'merge')
      const error = new Error()
      error.name = 'conflict'
      const db = {
        put: sinon.stub().onFirstCall().returns(Promise.reject(error)).onSecondCall().returns(Promise.resolve()),
        get: sinon.spy(() => Promise.resolve('b'))
      }
      rx.of(object).pipe(merge(db, f)).subscribe({
        complete () {
          expect(db.put).to.have.been.calledOnce
          done()
        },
        error: done
      })
    })

    it('should skip merge when merge result is the same as existing document', function (done) {
      const object = {
        _id: 'a'
      }
      const f = sinon.spy((x, y) => y ? 'b' : 'merge')
      const error = new Error()
      error.name = 'conflict'
      const db = {
        put: sinon.stub().onFirstCall().returns(Promise.reject(error)).onSecondCall().returns(Promise.resolve()),
        get: sinon.spy(() => Promise.resolve('b'))
      }
      rx.of(object).pipe(merge(db, f)).subscribe({
        complete () {
          expect(db.put).to.have.been.calledOnce
          done()
        },
        error: done
      })
    })
  })
})
