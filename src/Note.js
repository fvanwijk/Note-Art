import path from 'path'
import {
    firstToUpper, notes,
    circle_of_fourths,
    semitone,
}           from '.'
import {
    Howl,
}           from 'howler'

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
        const note      = attributes.note ? firstToUpper(attributes.note) : 'A'
        this._note      = !notes['#'].includes(note) && !notes.b.includes(note) ? 'A' : note
        this._octave    = attributes.octave >= 0 && attributes.octave <= 7 ? attributes.octave : 3
        this._duration  = attributes.duration || 'q'
        this._lang      = circle_of_fourths.includes(this.note) ? 'b' : '#'
        this._index     = notes[this.lang].indexOf(this.note)
        this.instrument = attributes.instrument || 'Piano'
        Note.setSound(this)
    }

    // gets a note and creates it's active Howl player in the notes hash-table so we can play it
    static setSound(note) {
        const key = note.instrument + notes['b'][notes[note.lang].indexOf(note.note)] + note._octave
        if (!sounds.has(key)) {
            const filePath = '/static/Media/' + note.instrument + '/' + 'FF_' + notes['b'][notes[note.lang].indexOf(note.note)] + note._octave + '.mp3'
            sounds.set(key, new Howl({
                src: [filePath],
            }))
        }
    }

    /**
     * returns the note alphabet representation as a string.
     * @type {String}
     * @readonly
     */
    get note() {
        return this._note
    }

    /**
     * get octave of note.
     * @type {Number}
     * @readonly
     */
    get octave() {
        return this._octave
    }

    /**
     * get the duration of a note
     * @type {String}
     * @readonly
     */
    get duration() {
        return this._duration
    }

    /**
     * get the frequancy of a note.
     * @type {Number}
     * @readonly
     */
    get frequency() {
        let octave_interval = this._octave - 4 //calculate octave difference
        return Math.pow(semitone, this.index - 9 + octave_interval * 12) * 440
    }

    // whether the note is a part of circle of fourths or fifths.
    get lang() {
        return this._lang
    }

    // set whether note is in '#' or 'b' family
    set lang(l) {
        this._lang = (l == '#' || l == 'b') ? l : this._lang
    }

    // returns the index of the note from the 12 notes (C, Db, etc...)
    get index() {
        return this._index
    }

    /**
     * returns a clone of the note(new instance).
     */
    clone() {
        return (new Note({note: this.note, octave: this.octave, duration: this.duration, instrument: this.instrument}))
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
                note:       notes[this.lang][(this.index + interval) % 12],
                octave:     this.octave + parseInt(oct_diff),
                duration:   this.duration,
                instrument: this.instrument,
            })
        }
        const oct_diff = this.index + interval < 0 ? Math.floor((this.index + interval) / 12) : 0
        return new Note({
            note:       notes[this.lang][Math.abs((this.index + (12 + (interval % 12))) % 12)],
            octave:     parseInt(this.octave) + parseInt(oct_diff),
            duration:   this.duration,
            instrument: this.instrument,
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
        return '{Note: ' + this.note + ', Octave: ' + this._octave + '}'
    }

    /**
     * Play the note.
     */
    play() {
        if (sounds.get(this.instrument + notes['b'][notes[this.lang].indexOf(this.note)] + this._octave) instanceof Howl) {
            sounds.get(this.instrument + notes['b'][notes[this.lang].indexOf(this.note)] + this._octave).play()
        } else {
            console.log('Sound not loaded! please make sure you load with x.loadSound()')
        }
    }
}
