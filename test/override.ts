import chai from 'chai'
import 'mocha'
import { override } from '../src/override'

const expect = chai.expect
describe('override', function () {
  it('should return new document', function () {
    const doc = { a: 'b', _id: 'id' }
    expect(override(doc)).to.be.deep.equals(doc)
  })
  it('should set _rev based on existing', function () {
    const doc = { a: 'b', _id: 'id' }
    const existing = { a: 'c', _rev: '_rev', _id: 'id' }
    expect(override(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev', _id: 'id' })
  })
  it('should override _rev', function () {
    const doc = { a: 'b', _rev: '!_rev', _id: 'id' }
    const existing = { _rev: '_rev', _id: 'id' }
    expect(override(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev', _id: 'id' })
  })
})
