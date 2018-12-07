import {
    expect
} from "chai"
import {
    Chord,
    Note,
    Piano,
    Measure,
    all_diatonic_scales
} from "../src"

const piano = new Piano()

describe('omg', ()=>{
    console.log(all_diatonic_scales)
})

// describe.skip("Measure class", () => {
//     const meas = new Measure([
//         piano.note("c4q"),
//         piano.note("g4q"),
//         piano.note("f4q"),
//         piano.note("g4q"),
//         piano.note("f4q")
//     ], 1)
//     it('Checks instance', () => {
//         expect(meas).to.be.instanceOf(Measure)
//     })
//     it('Checks a measure cant contain a number of notes that exceeds its max duration', () => {
//         const stub = [
//             piano.note("c4q"),
//             piano.note("g4q"),
//             piano.note("f4q"),
//             piano.note("g4q")
//         ]
//         expect(meas.data).to.eql(stub)
//     })
//     describe('Checks properties', () => {
//         it('data', () => {

//         })
//     })
//     describe('Transpose Method', () => {
//         const ms_test = new Measure([
//                 piano.note('e5e'),
//                 piano.note('d#5e'),
//                 piano.note('f5e'),
//                 piano.note('b4e'),
//                 piano.note('d5e'),
//                 piano.note('c5e'),
//             ]),
//             stub = new Measure([
//                 piano.note('f5e'),
//                 piano.note('e5e'),
//                 piano.note('gb5e'),
//                 piano.note('c5e'),
//                 piano.note('d#5e'),
//                 piano.note('db5e'),
//             ])

//         expect(ms_test.transpose(1)).to.eql(stub)
//         expect(ms_test.transpose(1).transpose(-1)).to.eql(ms_test)
//     })
// })