const expect = require('chai').expect
const assign = require('../src/assign')
describe('override', function () {
  it('should return new document', function () {
    const doc = { a: 'b' }
    expect(assign(doc)).to.be.deep.equals(doc)
  })
  it('should set _rev based on existing', function () {
    const doc = { a: 'b' }
    const existing = { _rev: '_rev' }
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev' })
  })
  it('should override _rev', function () {
    const doc = { a: 'b', _rev: '!_rev' }
    const existing = { _rev: '_rev' }
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev' })
  })
  it('should copy existing properties', function () {
    const doc = { a: 'b' }
    const existing = { _rev: '_rev', c: 'd' }
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev', c: 'd' })
  })
  it('should override _rev', function () {
    const doc = { a: 'b', _rev: '!_rev', c: 'e' }
    const existing = { _rev: '_rev', c: 'd' }
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev', c: 'e' })
  })
})
