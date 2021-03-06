import {PianoOctaveRule}              from '../validation/PianoOctaveRule'
import {PitchClass}                   from './PitchClass'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import {InvalidInput}                 from '../Exceptions'
import {realNumberFromFreq}           from '../utilities/ScientificFuncs'
import {noteToObject}                 from '../'

/**
 * @class
 * @classdesc Represents an abstract musical note.
 * @param pitchClass
 * @param octave
 * @example
 * const n = new Note('c', 3)
 */
export class Note extends PitchClass {
    constructor(pitchClass, octave) {
        super(pitchClass)
        PianoOctaveRule.validatePossible(octave)
        this.attributes.octave = octave
    }

    /**
     * Builds a Note instance from string representing a note.
     * @param {string} noteString
     * @return {Note}
     */
    static builder(noteString) {
        const {pitchClass, octave} = noteToObject(noteString)
        return new Note(pitchClass, octave)
    }

    /**
     * Generates a new pitch from frequency.
     * @param frequency
     * @returns {Note}
     */
    static fromFrequency(frequency) {
        const n          = realNumberFromFreq(frequency)
        const pitchClass = mts.sharpClassNotes[n % 12]
        const octave     = Math.floor(n / 12 - 1)

        return new Note(pitchClass, octave)
    }

    /**
     * Returns the octave of the note.
     * @type {String}
     */
    get octave() { return this.attributes.octave }

    /**
     * Gets interval size (Number) and returns a new instance of a note
     * which is calculated by the musical interval formula.
     * @example
     * let c = new Note({note:'c', octave:3}) //create a C3 note.
     * let interval = c.interval(4) //calling the function with the number 4(which is a major third).
     * console.log(interval.toStrring()) //should output 'E3'.
     * console.log(interval.constructor.name) //should output Note.
     * @param {number} interval Musical Interval
     */
    interval(interval) {
        const pitchClass = super.interval(interval).pitchClass
        let octDiff      = Math.floor((this.classIndex + interval) / 12)
        if (interval < 0) {
            octDiff    = this.classIndex + interval < 0 ? octDiff : 0
        }
        return new Note(pitchClass, this.octave + octDiff)
    }

    /**
     * Alias for interval()
     * @param {Number} interval
     */
    transpose(interval) {
        return this.interval(interval)
    }

    /**
     * Returns a string of the pitch class and octave of the Note.
     * @returns {string}
     */
    get raw() {
        return `${super.toString()}${this.octave}`
    }

    /**
     * Returns a string of the pitch class and octave of the Note.
     * @returns {string}
     */
    toString() {
        return `${super.toString()}${this.octave}`
    }
}
