import chai from 'chai'
import 'mocha'
import { assign } from '../../src/merge/assign'

const expect = chai.expect
describe('override', function () {
  it('should return new document', function () {
    const doc = { a: 'b' } as any
    expect(assign(doc)).to.be.deep.equals(doc)
  })
  it('should set _rev based on existing', function () {
    const doc = { a: 'b' } as any
    const existing = { _rev: '_rev' } as any
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev' })
  })
  it('should override _rev', function () {
    const doc = { a: 'b', _rev: '!_rev' } as any
    const existing = { _rev: '_rev' } as any
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev' })
  })
  it('should copy existing properties', function () {
    const doc = { a: 'b' } as any
    const existing = { _rev: '_rev', c: 'd' } as any
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev', c: 'd' })
  })
  it('should override _rev', function () {
    const doc = { a: 'b', _rev: '!_rev', c: 'e' } as any
    const existing = { _rev: '_rev', c: 'd' } as any
    expect(assign(doc, existing)).to.be.deep.equals({ a: 'b', _rev: '_rev', c: 'e' })
  })
})
