import {expect} from 'chai'
import {DiatonicScale, Note, Piano} from '../src'

const piano = new Piano()
const c = new Note({note: 'c'})
const m = new DiatonicScale(c, [0,2,4,5,7,9,11])
const stub = [piano.note('c3q'),piano.note('d3q'),piano.note('e3q'),
piano.note('f3q'),piano.note('g3q'),piano.note('a3q'),
piano.note('b3q'), piano.note('c4q')]
describe('scale generations', () => {
    it('checks members', () => {
        expect(m.notes).to.eql(stub)
    })
})
