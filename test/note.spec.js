import {expect}      from 'chai'
import {Note, Piano} from './../src'

const piano = new Piano()
const c = new Note({note:'c'})

describe('Note Object', () => {
    it('checks properties', () => {
        expect(c.note).to.eql('C')
        expect(c.octave).to.eql(3)
        expect(c.lang).to.eql('b')
        expect(c.duration).to.eql('q')
        expect(c.lang).to.eql('b')
        expect(c.index).to.eql(0)
        expect(c.toString()).to.eql('C3')
        expect(c.isEqual(new Note({note:'c'}))).to.true
    })

    describe('checks intervals', () => {
        it('checks the note C', function () {
            const c_stub = {
                '-13': piano.note('b1q'),
                '-12': piano.note('c2q'),
                '-11': piano.note('db2q'),
                '-1':  piano.note('b2q'),
                '0':   piano.note('c3q'),
                '1':   piano.note('db3q'),
                '11':  piano.note('b3q'),
                '12':  piano.note('c4q'),
                '13':  piano.note('db4q'),
            }
            expect(c.getInterval(-13)).to.eql(c_stub['-13'])
            expect(c.getInterval(-12)).to.eql(c_stub['-12'])
            expect(c.getInterval(-11)).to.eql(c_stub['-11'])
            expect(c.getInterval(-1)).to.eql(c_stub['-1'])
            expect(c.getInterval(0)).to.eql(c_stub['0'])
            expect(c.getInterval(1)).to.eql(c_stub['1'])
            expect(c.getInterval(11)).to.eql(c_stub['11'])
            expect(c.getInterval(12)).to.eql(c_stub['12'])
            expect(c.getInterval(13)).to.eql(c_stub['13'])
        })
        it('checks the note Db', function () {
            const db      = new Note({note:'db'})
            const db_stub = {
                '-13': piano.note('c2q'),
                '-12': piano.note('db2q'),
                '-11': piano.note('d2q'),
                '-1':  piano.note('c3q'),
                '0':   piano.note('db3q'),
                '1':   piano.note('d3q'),
                '11':  piano.note('c4q'),
                '12':  piano.note('db4q'),
                '13':  piano.note('d4q'),
            }
            expect(db.getInterval(-13)).to.eql(db_stub['-13'])
            expect(db.getInterval(-12)).to.eql(db_stub['-12'])
            expect(db.getInterval(-11)).to.eql(db_stub['-11'])
            expect(db.getInterval(-1)).to.eql(db_stub['-1'])
            expect(db.getInterval(0)).to.eql(db_stub['0'])
            expect(db.getInterval(1)).to.eql(db_stub['1'])
            expect(db.getInterval(11)).to.eql(db_stub['11'])
            expect(db.getInterval(12)).to.eql(db_stub['12'])
            expect(db.getInterval(13)).to.eql(db_stub['13'])
        })

        it('checks the note cs', function () {
            const cs      = new Note({note:'c#'})
            const cs_stub = {
                '-13': piano.note('c2q'),
                '-12': piano.note('c#2q'),
                '-11': piano.note('d2q'),
                '-1':  piano.note('c3q'),
                '0':   piano.note('c#3q'),
                '1':   piano.note('d3q'),
                '11':  piano.note('c4q'),
                '12':  piano.note('c#4q'),
                '13':  piano.note('d4q'),
            }
            expect(cs.getInterval(-13)).to.eql(cs_stub['-13'])
            expect(cs.getInterval(-12)).to.eql(cs_stub['-12'])
            expect(cs.getInterval(-11)).to.eql(cs_stub['-11'])
            expect(cs.getInterval(-1)).to.eql(cs_stub['-1'])
            expect(cs.getInterval(0)).to.eql(cs_stub['0'])
            expect(cs.getInterval(1)).to.eql(cs_stub['1'])
            expect(cs.getInterval(11)).to.eql(cs_stub['11'])
            expect(cs.getInterval(12)).to.eql(cs_stub['12'])
            expect(cs.getInterval(13)).to.eql(cs_stub['13'])
        })

        it('checks the note g', function () {
            const g      = new Note({note:'g'})
            const g_stub = {
                '-13': piano.note('f#2q'),
                '-12': piano.note('g2q'),
                '-11': piano.note('g#2q'),
                '-1':  piano.note('f#3q'),
                '0':   piano.note('g3q'),
                '1':   piano.note('g#3q'),
                '11':  piano.note('f#4q'),
                '12':  piano.note('g4q'),
                '13':  piano.note('g#4q'),
            }
            expect(g.getInterval(-13)).to.eql(g_stub['-13'])
            expect(g.getInterval(-12)).to.eql(g_stub['-12'])
            expect(g.getInterval(-11)).to.eql(g_stub['-11'])
            expect(g.getInterval(-1)).to.eql(g_stub['-1'])
            expect(g.getInterval(0)).to.eql(g_stub['0'])
            expect(g.getInterval(1)).to.eql(g_stub['1'])
            expect(g.getInterval(11)).to.eql(g_stub['11'])
            expect(g.getInterval(12)).to.eql(g_stub['12'])
            expect(g.getInterval(13)).to.eql(g_stub['13'])
        })

        it('checks the note b', function () {
            const b      = new Note({note:'b'})
            const b_stub = {
                '-13': piano.note('a#2q'),
                '-12': piano.note('b2q'),
                '-11': piano.note('c3q'),
                '-1':  piano.note('a#3q'),
                '0':   piano.note('b3q'),
                '1':   piano.note('c4q'),
                '11':  piano.note('a#4q'),
                '12':  piano.note('b4q'),
                '13':  piano.note('c5q'),
            }
            expect(b.getInterval(-13)).to.eql(b_stub['-13'])
            expect(b.getInterval(-12)).to.eql(b_stub['-12'])
            expect(b.getInterval(-11)).to.eql(b_stub['-11'])
            expect(b.getInterval(-1)).to.eql(b_stub['-1'])
            expect(b.getInterval(0)).to.eql(b_stub['0'])
            expect(b.getInterval(1)).to.eql(b_stub['1'])
            expect(b.getInterval(11)).to.eql(b_stub['11'])
            expect(b.getInterval(12)).to.eql(b_stub['12'])
            expect(b.getInterval(13)).to.eql(b_stub['13'])
            expect(piano.note('b4e').getInterval(1).getInterval(-1)).to.eql(piano.note('b4e'))
            expect(piano.note('b4e').getInterval(1)).to.eql(piano.note('C5e'))
            expect(new Note({note: 'c',octave: 5,duration: 'e'}).getInterval(-1)).to.eql(new Note({note: 'b',octave: 4,duration: 'e'}))
        })
    })
})
