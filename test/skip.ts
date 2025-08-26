import chai from 'chai'
import 'mocha'
import { skip } from '../src/skip'

const expect = chai.expect
describe('skip', function () {
  it('should return new document', function () {
    const doc = { a: 'b' }
    expect(skip(doc)).to.be.deep.equals(doc)
  })
  it('should return null if existing supplied', function () {
    const doc = { a: 'b' }
    const existing = { _rev: '_rev' }
    expect(skip(doc, existing)).to.be.null
  })
})
