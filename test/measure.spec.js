import {
    expect
} from "chai"
import {
    Chord,
    Note,
    Piano,
    Measure
} from "../src"

const piano = new Piano()

describe("Measure class", () => {
    const meas = new Measure([
        piano.note("c4q"),
        piano.note("g4q"),
        piano.note("f4q"),
        piano.note("g4q"),
        piano.note("f4q")
    ], 1)
    it('Checks instance', () => {
        expect(meas).to.be.instanceOf(Measure)
    })
    it('Checks a measure cant contain more notes than its max duration', () => {
        const stub = [
            piano.note("c4q"),
            piano.note("g4q"),
            piano.note("f4q"),
            piano.note("g4q")
        ]
        expect(meas.data).to.eql(stub)
    })
    describe('Checks properties', () => {
        it('data', () => {

        })
    })
})