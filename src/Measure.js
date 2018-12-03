import {
    Note,
    Chord,
    note_durations
} from '.'
import {
    isArray,
} from 'util'

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
    constructor(data = [], max_duration = 0) {
        this.attributes = []
        this.attributes[Measure.NOTES] = data
        this.attributes[Measure.MAX_DURATION] = max_duration
        this.attributes[Measure.DURATION] = this.updateDuration()
    }

    static get NOTES(){return 0}

    static get DURATION(){return 1}

    static get MAX_DURATION(){return 2}
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
        this.notes.forEach(i =>  notes.push(i))
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

    get max_duration(){return this.attributes[Measure.MAX_DURATION]}

    isFull(){
        return this.duration == this.max_duration
    }

    /**
     * Change notes somewhere inside a measure
     * @param {Number} index The index where the notes will be changed
     * @param {Array/Note} new_notes Notes to change to
     */
    mutate(i, new_notes) {
        const newData = JSON.parse(JSON.stringify(this.notes))
        newData[i] = new_notes
        return new Measure(newData)
    }

    /**
     * Add notes to the end of the measure
     * @param {Note/Chord} new_notes
     */
    addNotes(new_notes) {
        this.notes.push(new_notes)
    }

    updateDuration() {
        let duration = 0
        let valid = 0
        this.notes.some((notes) => {
            if (notes instanceof Note || notes instanceof Chord)
                duration += note_durations[notes.duration]
            else {
                let min_duration = notes[0].duration
                notes.forEach((note) => {
                    min_duration = min_duration < note_durations[note.duration] ? min_duration : note_durations[note.duration]
                })
                duration += min_duration
            }
            if (duration <= this.max_duration || this.max_duration === 0) {
                valid++
            } else
                return true
        })
        this.notes = this.notes.slice(0, valid)
        return duration
    }

    transpose(interval) {
        // console.log(this.notes)
        const newData = this.notes.map((n) => {
            if (n instanceof Note) {
                console.log(n, n.toString(), interval, n.interval(interval).toString())
                // console.log(piano.note('c5e').interval(-1))
                return n.interval(interval)
            } else if (n instanceof Chord)
                return n.tranpose(interval)
            else if (isArray(n))
                return n.map(note => note.interval(interval))
        })
        // console.log(newData)
        return new Measure(newData)
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