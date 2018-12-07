import { Note, notes } from '.'
import { Howl } from 'howler'

let self = null

/**
 * A hash table for holding all the note sounds and playing them efficiently.
 * @class
 */
export class NotesHash {
    constructor() {
        this.sounds = new Map()
    }

    static getNotesHash() {
        if (!self)
            self = new NotesHash()
        return self
    }

    getKey(note) {
        const { octave, instrument } = note
        return `${instrument}${this.fileNoteLetter(note)}${octave}`
    }

    fileNoteLetter(note){return notes["b"][notes[note.family].indexOf(note.note)]}

    /**
     * add a specific note sound to be played in the future.
     * @param {string} instrument Piano/Guitar
     * @param {string} note Musical Note
     * @param {number} octave According to the instrument.
     */
    set(note) {
        const key = this.getKey(note)
        console.log(key)
        if (!this.sounds.has(key)) {
            const filePath = `https://note-art.azurewebsites.net/${note.instrument}/FF_${this.fileNoteLetter(note)}${note.octave}.mp3`
            this.sounds.set(key, new Howl({ src: [filePath] }))
        }
    }

    /**
     * retrieve a note sound from the note sound hash table.
     * @param {Note} note Note Instance.
     */
    get(note) {
        return this.sounds.get(this.getKey(note))
    }
}