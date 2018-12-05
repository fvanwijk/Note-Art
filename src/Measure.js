import {
    Note,
    Chord,
    note_durations
} from '.'
import {
    isArray,
} from 'util'
import {
    getMinDuration
} from './Addons'

/**
 * Measure - represents a single measure as part of a musical piece.
 * @class
 */
export class Measure {
    /**
     * Creates a Measure instance
     * @param {Array} data An array which contains notes or chords
     * @param {Number} max_duration Max duration of the measure(decided by time signature)
     */
    constructor(max_duration = 0) {
        this.attributes = []
        this.attributes[Measure.NOTES] = []
        this.attributes[Measure.MAX_DURATION] = max_duration
        this.attributes[Measure.DURATION] = 0
    }

    static get NOTES() {
        return 0
    }

    static get DURATION() {
        return 1
    }

    static get MAX_DURATION() {
        return 2
    }
    /**
     * Array of all the notes in the measure
     */
    get notes() {
        return this.attributes[Measure.NOTES]
    }

    /**
     * Assign new notes to measure
     */
    set notes(notes) {
        this.attributes[Measure.NOTES] = notes
    }

    /**
     * Returns a new array with the same notes.
     */
    getData() {
        const notes = []
        this.notes.forEach(i => notes.push(i))
        return notes
    }

    /**
     * get the duration
     */
    get duration() {
        return this.attributes[Measure.DURATION]
    }

    /**
     * set the duration
     */
    set duration(duration) {
        this.attributes[Measure.DURATION] = duration
    }

    get max_duration() {
        return this.attributes[Measure.MAX_DURATION]
    }

    isFull() {
        return this.duration == this.max_duration
    }

    /**
     * Change notes somewhere inside a measure
     * @param {Number} index The index where the notes will be changed
     * @param {Array/Note} new_notes Notes to change to
     */
    mutate(i, new_notes) {
        const new_data = JSON.parse(JSON.stringify(this.notes))
        new_data[i] = new_notes
        const new_measure = new Measure(this.max_duration)
        new_measure.pushNotes(new_data)
        return new_measure
    }

    get duration_left() {
        return this.max_duration - this.duration
    }

    /**
     * Push notes to a measure
     * @param {Array} notes array of notes
     */
    push(notes = []) {
        let verified_notes = []
        notes.forEach((note) => {
            if (note.duration <= this.duration_left || this.max_duration === 0)
                verified_notes.push(note)
        })
        this.notes.push(verified_notes)
        this.duration += getMinDuration(verified_notes)
    }

    /**
     * Add notes to the end of the measure
     * @param {Array} note_arrays array of arrays of notes
     */
    pushNotes(note_arrays) {
        note_arrays.forEach(note_array => this.push(note_array))
    }

    updateDuration() {
        let valid = 0
        this.notes.some((notes) => {
            if (this.duration <= this.max_duration || this.max_duration === 0) {
                valid++
            } else
                return true
        })
        this.notes = this.notes.slice(0, valid)
    }

    transpose(interval) {
        const new_notes = this.notes.map(n => n.map(note => note.interval(parseInt(interval))))
        const new_measure = new Measure(this.max_duration)
        new_measure.pushNotes(new_notes)
        return new_measure
    }

    toString() {
        let string = 'Measure: { '
        for (const i of this.notes)
            if (i instanceof Note || i instanceof Chord) {
                string += i.toString() + ', '
            } else {
                string += '[ '
                for (const j of i)
                    string += j + ', '
                string += '] '
            }
        string += '} '
        return string
    }
}