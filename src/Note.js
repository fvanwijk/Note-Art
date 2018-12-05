import {
    firstToUpper,
    notes,
    circle_of_fourths,
    semitone
} from "."
import {
    Howl
} from "howler"

const sounds = new Map()

/**
 * @class
 * @classdesc Represents a single musical note.
 * @example
 * const n = new Note({note: 'c', octave: 3, duration: 'q', instrument: 'Piano'})
 */
export class Note {
    /**
     * @param {Object} attributes Object that contains some or all of the following keys:
     * {String} note Musical Note
     * {number} octave Note Octave
     * {String} duration Note duration
     * {String} instrument Piano/Guitar/etc...
     */
    constructor(attributes = {}) {
        const note = attributes.note ? firstToUpper(attributes.note) : "A"
        this.attributes = []
        this.attributes[Note.NOTE] = !notes["#"].includes(note) && !notes.b.includes(note) ? "A" : note
        this.attributes[Note.OCTAVE] =
            attributes.octave >= 0 && attributes.octave <= 7 ? attributes.octave : 3
        this.attributes[Note.DURATION] = attributes.duration || "q"
        this.attributes[Note.INSTRUMENT] = attributes.instrument ? firstToUpper(attributes.instrument) : "Piano"
        this.attributes[Note.FAMILY] = circle_of_fourths.includes(this.note) ? "b" : "#"
        this.attributes[Note.INDEX] = notes[this.family].indexOf(this.note)
        this.attributes[Note.FREQUENCY] = this.calculateFrequency()
        Note.setSound(this)
    }

    /**
     * Index of note in attributes
     * @type    {Number}
     * @readonly
     */
    static get NOTE() {
        return 0
    }

    /**
     * Index of octave in attributes
     * @type    {Number}
     * @readonly
     */
    static get OCTAVE() {
        return 1
    }

    /**
     * Index of duration in attributes
     * @type    {Number}
     * @readonly
     */
    static get DURATION() {
        return 2
    }

    /**
     * Index of instrument in attributes
     * @type    {Number}
     * @readonly
     */
    static get INSTRUMENT() {
        return 3
    }

    /**
     * Index of family in attributes
     * @type    {Number}
     * @readonly
     */
    static get FAMILY() {
        return 4
    }

    /**
     * Index of note index in attributes
     * @type    {Number}
     * @readonly
     */
    static get INDEX() {
        return 5
    }

    /**
     * Index of frequency in attributes
     * @type    {Number}
     * @readonly
     */
    static get FREQUENCY() {
        return 6
    }

    /**
     * Gets a note and creates it's active Howl player in the notes hash-table so we can play it
     * @param {Note} note
     * @private
     */
    static setSound(note) {
        const key =
            note.instrument +
            notes["b"][notes[note.family].indexOf(note.note)] +
            note.octave
        if (!sounds.has(key)) {
            const filePath =
                "https://note-art.azurewebsites.net/" +
                note.instrument +
                "/" +
                "FF_" +
                notes["b"][notes[note.family].indexOf(note.note)] +
                note.octave +
                ".mp3"
            sounds.set(
                key,
                new Howl({
                    src: [filePath]
                })
            )
        }
    }

    /**
     * Returns the note alphabet representation as a string.
     * @type {String}
     * @readonly
     */
    get note() {
        return this.attributes[Note.NOTE]
    }

    /**
     * Get octave of note.
     * @type {Number}
     * @readonly
     */
    get octave() {
        return this.attributes[Note.OCTAVE]
    }

    /**
     * Get the duration of a note
     * @type {String}
     * @readonly
     */
    get duration() {
        return this.attributes[Note.DURATION]
    }

    /**
     * Get the instrument that plays the note
     * @type {String}
     * @readonly
     */
    get instrument() {
        return this.attributes[Note.INSTRUMENT]
    }

    /**
     * Get the family of notes the note belnogs to - sharps or flats
     * @type {String}
     * @readonly
     */
    get family() {
        return this.attributes[Note.FAMILY]
    }

    /**
     * Set the notes family in case needed.
     * @type {String}
     */
    set family(l) {
        this.attributes[Note.family] = l == "#" || l == "b" ? l : this.family
    }

    /**
     * Get the index of the note from the 12 notes (C, Db, etc...).
     * @type {String}
     * @readonly
     */
    get index() {
        return this.attributes[Note.INDEX]
    }

    /**
     * Get the frequency of the note.
     * @type {String}
     * @readonly
     */
    get frequency() {
        return this.attributes[Note.FREQUENCY]
    }

    /**
     * Calculate the frequancy of a note.
     * @type {Number}
     * @private
     */
    calculateFrequency() {
        let octave_interval = this.octave - 4 //calculate octave difference
        return Math.pow(semitone, this.index - 9 + octave_interval * 12) * 440
    }

    /**
     * returns a clone of the note(new instance).
     * @type {Note}
     */
    clone() {
        return new Note({
            note: this.note,
            octave: this.octave,
            duration: this.duration,
            instrument: this.instrument
        })
    }

    /**
     * returns a clone of the note(new instance).
     * @type {Note}
     */
    changeDuration(duration) {
        return new Note({note: this.note, octave: this.octave, instrument: this.instrument, duration: duration})
    }

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
        if (interval >= 0) {
            const oct_diff = (this.index + interval) / 12
            return new Note({
                note: notes[this.family][(this.index + interval) % 12],
                octave: this.octave + parseInt(oct_diff),
                duration: this.duration,
                instrument: this.instrument
            })
        }
        const oct_diff =
            this.index + interval < 0 ? Math.floor((this.index + interval) / 12) : 0
        return new Note({
            note: notes[this.family][Math.abs((this.index + (12 + (interval % 12))) % 12)],
            octave: parseInt(this.octave) + parseInt(oct_diff),
            duration: this.duration,
            instrument: this.instrument
        })
    }

    /**
     * ALias for interval()
     * @param {Number} interval 
     */
    transpose(interval) {
        return this.interval(interval)
    }

    // getMajorChord() {
    //     return new Chord(this, this.interval(4), this.interval(7))
    // }
    getMajorScale() {
        let scale = [this.note]
        for (let i of major_scale) {
            scale.push(this.interval(i))
        }
        return toString(scale)
    }

    /**
     * Returns the note name and octave.
     * @example
     * 'C3'
     */
    toString() {
        return this.note + this.octave
    }

    /**
     * Check if 2 notes are equal in letter and octave.
     * @param {Note} note
     */
    isEqual(note) {
        if (this.note === note.note && this.octave === note.octave) {
            return true
        }
        return false
    }

    /**
     * Returns string of the note fields formatted as an object.
     */
    print() {
        return "{Note: " + this.note + ", Octave: " + this.octave + "}"
    }

    /**
     * Play the note.
     */
    play() {
        if (sounds.get(
                this.instrument +
                notes["b"][notes[this.family].indexOf(this.note)] +
                this.octave
            ) instanceof Howl) {
            sounds.get(
                this.instrument +
                notes["b"][notes[this.family].indexOf(this.note)] +
                this.octave
            ).play()
            // console.log(this.note, this.octave, this.frequency)
        } else {
            console.log(
                "Cant find audio file"
            )
        }
    }
}