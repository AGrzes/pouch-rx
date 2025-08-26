import chai from 'chai'
import 'mocha'
import { skip } from '../../src/merge/skip'

const expect = chai.expect
describe('skip', function () {
  it('should return new document', function () {
    const doc = { a: 'b', _id: 'id' }
    expect(skip(doc)).to.be.deep.equals(doc)
  })
  it('should return null if existing supplied', function () {
    const doc = { a: 'b', _id: 'id' }
    const existing = { a: 'c', _rev: '_rev', _id: 'id' }
    expect(skip(doc, existing)).to.be.null
  })
})
