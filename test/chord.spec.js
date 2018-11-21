import {expect}             from 'chai'
import {Chord, Note, Piano} from '../src'

const piano = new Piano()
const c     = new Note('c')
describe('Chord class', () => {
    describe('checks different ctor inputs', () => {
        it('calls ctor with Note type objects', () => {
            expect(new Chord({root: piano.note('c3q'),third: piano.note('e3q'),fifth: piano.note('g3q')}).isChord).to.be.true
        })
        it('calls ctor with strings', () => {
            expect(new Chord({root: 'c',third: 'e',fifth: 'g',note4: ''}).isChord).to.be.true
        })
    })
})
