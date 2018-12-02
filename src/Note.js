import path from "path"
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
 * Represents a single musical note.
 * @class
 */
export class Note {
    /**
     * @param {Object} attributes Object that contains some or all of the following keys:
     * {String} note Musical Note
     * {number} octave Note Octave
     * {String} duration Note duration
     * {String} instrument Piano/Guitar/etc...
     * @constructor
     */
    constructor(attributes = {}) {
        const note = attributes.note ? firstToUpper(attributes.note) : "A"
        this.attributes = []
        this.attributes[Note.NOTE] = !notes["#"].includes(note) && !notes.b.includes(note) ? "A" : note
        this.attributes[Note.OCTAVE] =
            attributes.octave >= 0 && attributes.octave <= 7 ? attributes.octave : 3
        this.attributes[Note.DURATION] = attributes.duration || "q"
        this.attributes[Note.INSTRUMENT] = attributes.instrument || "Piano"
        this.attributes[Note.LANG] = circle_of_fourths.includes(this.note) ? "b" : "#"
        this.attributes[Note.INDEX] = notes[this.lang].indexOf(this.note)
        this.attributes[Note.FREQUENCY] = this.getFrequency()
        Note.setSound(this)
    }

    static get NOTE() {
        return 0
    }

    static get OCTAVE() {
        return 1
    }

    static get DURATION() {
        return 2
    }

    static get INSTRUMENT() {
        return 3
    }

    static get LANG() {
        return 4
    }

    static get INDEX() {
        return 5
    }

    static get FREQUENCY() {
        return 6
    }

    // gets a note and creates it's active Howl player in the notes hash-table so we can play it
    static setSound(note) {
        const key =
            note.instrument +
            notes["b"][notes[note.lang].indexOf(note.note)] +
            note.octave
        if (!sounds.has(key)) {
            const filePath =
                "https://note-art.azurewebsites.net/" +
                note.instrument +
                "/" +
                "FF_" +
                notes["b"][notes[note.lang].indexOf(note.note)] +
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
     * returns the note alphabet representation as a string.
     * @type {String}
     * @readonly
     */
    get note() {
        return this.attributes[Note.NOTE]
    }

    /**
     * get octave of note.
     * @type {Number}
     * @readonly
     */
    get octave() {
        return this.attributes[Note.OCTAVE]
    }

    /**
     * get the duration of a note
     * @type {String}
     * @readonly
     */
    get duration() {
        return this.attributes[Note.DURATION]
    }

    get instrument() {
        return this.attributes[Note.INSTRUMENT]
    }

    // whether the note is a part of circle of fourths or fifths.
    get lang() {
        return this.attributes[Note.LANG]
    }

    // set whether note is in '#' or 'b' family
    set lang(l) {
        this.attributes[Note.LANG] = l == "#" || l == "b" ? l : this._lang
    }

    // returns the index of the note from the 12 notes (C, Db, etc...)
    get index() {
        return this.attributes[Note.INDEX]
    }

    get frequency() {
        return this.attributes[Note.FREQUENCY]
    }

    /**
     * get the frequancy of a note.
     * @type {Number}
     * @private
     */
    getFrequency() {
        let octave_interval = this.octave - 4 //calculate octave difference
        return Math.pow(semitone, this.index - 9 + octave_interval * 12) * 440
    }

    /**
     * returns a clone of the note(new instance).
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
     * gets a number as interval and returns a new instance of a note
     * which is constructed by the musical interval formula.
     * for example, if the note is a 'C' in octave 3,
     * calling the function with the number 4(which is a major third) will return
     * a Note instance with the musical note 'E' in octave 3 with the same instrument.
     * @param {number} interval Musical Interval
     */
    getInterval(interval) {
        if (interval >= 0) {
            const oct_diff = (this.index + interval) / 12
            return new Note({
                note: notes[this.lang][(this.index + interval) % 12],
                octave: this.octave + parseInt(oct_diff),
                duration: this.duration,
                instrument: this.instrument
            })
        }
        const oct_diff =
            this.index + interval < 0 ? Math.floor((this.index + interval) / 12) : 0
        return new Note({
            note: notes[this.lang][Math.abs((this.index + (12 + (interval % 12))) % 12)],
            octave: parseInt(this.octave) + parseInt(oct_diff),
            duration: this.duration,
            instrument: this.instrument
        })
    }

    // getMajorChord() {
    //     return new Chord(this, this.getInterval(4), this.getInterval(7))
    // }
    getMajorScale() {
        let scale = [this.note]
        for (let i of major_scale) {
            scale.push(this.getInterval(i))
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
        if (
            sounds.get(
                this.instrument +
                notes["b"][notes[this.lang].indexOf(this.note)] +
                this.octave
            ) instanceof Howl
        ) {
            sounds
                .get(
                    this.instrument +
                    notes["b"][notes[this.lang].indexOf(this.note)] +
                    this.octave
                )
                .play()
            console.log(this.note, this.octave, this.frequency)
        } else {
            console.log(
                "Cant find audio file"
            )
        }
    }
}