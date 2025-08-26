import chai from 'chai'
import 'mocha'
import { toArray } from 'rxjs/operators'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { view } from '../src/view'

const expect = chai.use(sinonChai).expect
describe('Ouch', function () {
  describe('#view()', function () {
    it('should call query', function (done) {
      const db = {
        query: sinon.spy(() => Promise.resolve({ rows: [] })),
      }
      view(db).subscribe({
        complete() {
          expect(db.query).to.have.been.called
          done()
        },
        error: done,
      })
    })

    it('should call query with name and include_docs', function (done) {
      const db = {
        query: sinon.spy(() => Promise.resolve({ rows: [] })),
      }
      view(db, 'name').subscribe({
        complete() {
          expect(db.query).to.have.been.calledWithMatch('name', (options) => options && options.include_docs === true)
          done()
        },
        error: done,
      })
    })

    it('should pass other options to all docs', function (done) {
      const db = {
        query: sinon.spy(() => Promise.resolve({ rows: [] })),
      }
      view(db, 'name', {
        other: true,
      }).subscribe({
        complete() {
          expect(db.query).to.have.been.calledWithMatch('name', (options) => options && options.other === true)
          done()
        },
        error: done,
      })
    })

    it('should read rows', function (done) {
      const db = {
        query: sinon.spy(() =>
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
      view(db, 'name')
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
        query: sinon.spy(() => Promise.reject(error)),
      }
      view(db, 'name').subscribe({
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
