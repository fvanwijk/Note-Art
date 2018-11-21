import {Note, Rhythm, Chord, note_durations} from '.'
import {
    isArray,
}                                            from 'util'

/**
 * Measure - represents a single measure as part of a musical piece.
 * @class
 */
export class Measure {
    /**
     *
     * @param {Array} data An array which contains notes or chords
     */
    constructor(data = [], max_duration = 0) {
        this._data        = data
        this.max_duration = max_duration
        this._duration    = 0
        this.updateDuration()
    }

    /**
     * Array of all the notes in the measure
     */
    get data() {
        return this._data
    }

    /**
     * Assign new notes to measure
     */
    set data(data) {
        this._data = data
    }

    /**
     * Returns a new array with the same notes.
     */
    getData() {
        const data = new Array()
        for (const i of this.data)
            data.push(i)
        return data
    }

    /**
     * get the duration
     */
    get duration() {
        return this._duration
    }

    /**
     * set the duration
     */
    set duration(duration) {
        this._duration = duration
    }

    /**
     * Change notes somewhere inside a measure
     * @param {Number} index The index where the notes will be changed
     * @param {Array/Note} new_notes Notes to change to
     */
    mutate(i, new_notes) {
        const newData = JSON.parse(JSON.stringify(this.data))
        newData[i]    = new_notes
        return new Measure(newData)
    }

    /**
     * Add data to the end of the measure
     * @param {Note/Chord} new_notes
     */
    addNotes(new_notes) {
        this.data.push(new_notes)
    }

    updateDuration() {
        this.duration = 0
        let valid     = 0
        for (const notes of this.data) {
            if (notes instanceof Note || notes instanceof Chord) {
                this.duration += note_durations[notes.duration]
            } else if (isArray(notes)) {
                let min_duration = notes[0].duration
                notes.forEach((note) => {
                    min_duration = min_duration < note_durations[note.duration] ? min_duration : note_durations[note.duration]
                })
                this.duration += min_duration
            }
            if (this.duration <= this.max_duration || this.max_duration === 0) {
                valid++
            } else {
                break
            }
        }
        this.data = this.data.slice(0, valid)
    }

    toString() {
        let string = 'Measure: { '
        for (const i of this.data)
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

export default Measure
