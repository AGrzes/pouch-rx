import chai from 'chai'
import 'mocha'
import { toArray } from 'rxjs/operators'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { all } from '../src/all'

const expect = chai.use(sinonChai).expect
describe('Ouch', function () {
  describe('#all()', function () {
    it('should call allDocs', function (done) {
      const db = {
        allDocs: sinon.spy(() => Promise.resolve({ rows: [] })),
      }
      all(db as PouchDB.Database).subscribe({
        complete() {
          expect(db.allDocs).to.have.been.called
          done()
        },
        error: done,
      })
    })

    it('should call allDocs with include_docs', function (done) {
      const db = {
        allDocs: sinon.spy(() => Promise.resolve({ rows: [] })),
      }
      all(db as PouchDB.Database).subscribe({
        complete() {
          expect(db.allDocs).to.have.been.calledWithMatch((options) => options && options.include_docs === true)
          done()
        },
        error: done,
      })
    })

    it('should pass other options to all docs', function (done) {
      const db = {
        allDocs: sinon.spy(() => Promise.resolve({ rows: [] })),
      }
      all(db as PouchDB.Database, {
        conflicts: true,
      }).subscribe({
        complete() {
          expect(db.allDocs).to.have.been.calledWithMatch((options) => options && options.conflicts === true)
          done()
        },
        error: done,
      })
    })

    it('should read rows', function (done) {
      const db = {
        allDocs: sinon.spy(() =>
          Promise.resolve({
            rows: [
              {
                doc: 'a',
              },
              {
                doc: 'b',
              },
            ],
          })
        ),
      }
      all(db as PouchDB.Database)
        .pipe(toArray())
        .subscribe({
          next(rows) {
            expect(rows).to.be.deep.equals(['a', 'b'])
            done()
          },
          error: done,
        })
    })
    it('should handle error', function (done) {
      const error = new Error()
      const db = {
        allDocs: sinon.spy(() => Promise.reject(error)),
      } 
      all(db as PouchDB.Database).subscribe({
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
