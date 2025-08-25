const expect = require('chai').use(require('sinon-chai')).expect
const sinon = require('sinon')
const {all} = require('../src/all')
const {toArray} = require('rxjs/operators')
describe('Ouch', function () {
  describe('#all()', function () {
    it('should call allDocs', function (done) {
      const db = {
        allDocs: sinon.spy(() => Promise.resolve({rows: []}))
      }
      all(db).subscribe({
        complete () {
          expect(db.allDocs).to.have.been.called
          done()
        },
        error: done
      })
    })

    it('should call allDocs with include_docs', function (done) {
      const db = {
        allDocs: sinon.spy(() => Promise.resolve({rows: []}))
      }
      all(db).subscribe({
        complete () {
          expect(db.allDocs).to.have.been.calledWithMatch((options) => options && options.include_docs === true)
          done()
        },
        error: done
      })
    })

    it('should pass other options to all docs', function (done) {
      const db = {
        allDocs: sinon.spy(() => Promise.resolve({rows: []}))
      }
      all(db, {
        other: true
      }).subscribe({
        complete () {
          expect(db.allDocs).to.have.been.calledWithMatch((options) => options && options.other === true)
          done()
        },
        error: done
      })
    })

    it('should read rows', function (done) {
      const db = {
        allDocs: sinon.spy(() => Promise.resolve({rows: [{
          doc: 'a'
        }, {
          doc: 'b'
        }]}))
      }
      all(db).pipe(toArray())
        .subscribe({
          next (rows) {
            expect(rows).to.be.deep.equals(['a', 'b'])
            done()
          },
          error: done
        })
    })
    it('should handle error', function (done) {
      const error = new Error()
      const db = {
        allDocs: sinon.spy(() => Promise.reject(error))
      }
      all(db, {
        other: true
      }).subscribe({
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
