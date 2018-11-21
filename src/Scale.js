import {Note, Chord, MusicalPattern} from '.'

/**
 * represents a Diatonic Scale(a scale that consists of 7 notes),
 * @extends MusicalPattern
 */
export class DiatonicScale extends MusicalPattern {
    /**
     *
     * @param {Note/String} tonic Root of the Scale
     * @param {Array} pattern Intervals for the other notes(from the tonic).
     */
    constructor(tonic, pattern) {
        super(tonic, pattern)
        this.chords = []
        this.show   = false
        for (let i in this.notes.slice(0, 7))
            this.chords.push(new Chord({
                root:  this.notes[i],
                third: this.notes[(parseInt(i) + 2) % 7],
                fifth: this.notes[(parseInt(i) + 4) % 7],
            }))
    }

    /**
     * returns the x chord of the scale.
     * @param {number} chord Chord Number
     */
    getChord(chord) {
        return this.chords[chord - 1] != undefined ? this.chords[chord - 1] : null
    }

    /**
     * returns array with all the chords in the scale.
     */
    getChords() {
        return this.chords
    }
}
