const expect = require('chai').expect
const override = require('../src/override')
describe('override', function () {
  it('should return new document', function () {
    const doc = { a: 'b' }
    expect(override(doc)).to.be.deep.equals(doc)
  })
  it('should set _rev based on existing', function () {
    const doc = { a: 'b' }
    const existing = { _rev: '_rev' }
    expect(override(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev' })
  })
  it('should override _rev', function () {
    const doc = { a: 'b', _rev: '!_rev' }
    const existing = { _rev: '_rev' }
    expect(override(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev' })
  })
})
