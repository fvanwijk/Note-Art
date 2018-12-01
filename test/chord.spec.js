import {
    expect
} from 'chai'
import {
    Chord,
    Note,
    Piano
} from '../src'

const piano = new Piano()
const c = new Note('c')
const Cmaj = new Chord({
    root: piano.note('c3q'),
    third: piano.note('e3q'),
    fifth: piano.note('g3q'),
    note4: piano.note('bb3q')
})
describe('Chord class', () => {
    describe('checks different ctor inputs', () => {
        it('calls ctor with Note type objects', () => {
            expect(new Chord({
                root: piano.note('c3q'),
                third: piano.note('e3q'),
                fifth: piano.note('g3q')
            }).isChord).to.be.true
        })
        it('calls ctor with strings', () => {
            expect(new Chord({
                root: 'c',
                third: 'e',
                fifth: 'g',
                note4: ''
            }).isChord).to.be.true
        })
    })
    it('Checks properties', () => {
        describe('Root', () => {
            expect(Cmaj.root.note).to.eql('C')
            expect(Cmaj.root.octave).to.eql(3)
        })
        describe('third', () => {
            expect(Cmaj.third.note).to.eql('E')
            expect(Cmaj.third.octave).to.eql(3)
        })
        describe('fifth', () => {
            expect(Cmaj.fifth.note).to.eql('G')
            expect(Cmaj.fifth.octave).to.eql(3)
        })
        describe('note4', () => {
            expect(Cmaj.note4.note).to.eql('Bb')
            expect(Cmaj.note4.octave).to.eql(3)
        })
        describe('Type and symbol', () => {
            expect(Cmaj.type).to.eql('Seventh')
            expect(Cmaj.symbol).to.eql('7')
            expect(Cmaj.chordName).to.eql('C7')
        })
        describe('Duration', () => {
            expect(Cmaj.duration).to.eql('q')
        })
    })
    describe('Checks methods', () => {
        it('toString', () => {
            expect(Cmaj.toString()).to.eql('C7 {C3, E3, G3, Bb3}')
        })
        it('New duration', () => {
            expect(Cmaj.newDuration('e').duration).to.eql('e')
        })
        it('Transpose', () => {
            expect(Cmaj.tranpose(1)).to.eql(new Chord({
                root: piano.note('db3q'),
                third: piano.note('F3q'),
                fifth: piano.note('g#3q'),
                note4: piano.note('B3q')
            }))
        })
    })
})