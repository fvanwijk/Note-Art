import {Note, piano} from '.'

/**
 * Represents a musical pattern.
 */
export class MusicalPattern {
    /**
     * @param {String/Note} tonic
     * @param {Array} pattern
     *@constructor
     */
    constructor(tonic, pattern) {
        if (tonic instanceof Note) {
            this.tonic = tonic
        } else {
            this.tonic = new Note({note: tonic})
        }
        this.pattern = pattern
        this._notes  = []
        for (let j of pattern)
            this._notes.push(this.tonic.getInterval(j))
        this._notes.push(this.tonic.getInterval(12))
    }

    /**
     * returns array that contains all the notes in the pattern.
     */
    get notes() {
        return this._notes
    }

    /**
     * returns a string of all the notes in the pattern
     */
    toString() {
        let str = ''
        for (let i = 0; i < this.notes.length - 1; ++i) str += this.notes[i] + ', '
        str += this.notes[this.notes.length - 1]
        return str
    }

    /**
     * returns the interval inside the pattern
     * for example - if the pattern is C Major scale,
     * than getInterval(1) wiil return D.
     * @param {number} interval
     */
    getInterval(interval) {
        let counter = 0
        for (let i = 0; i < interval; i++)
            counter += this.pattern[i]
        return this.tonic.getInterval(counter)
    }

    /**
     * load all the sound files of the notes in the pattern.
     */
    loadSound() {
        for (let n of this.notes)
            n.loadSound()
    }

    /**
     * play all the notes in the pattern one after the other.
     */
    play() {
        let self = this
        for (let i = 0; i < this.notes.length; i++) {
            setTimeout(function timer() {
                self.notes[i].play()
            }, i * 500)
        }
    }
}
