import {app} from '../'
import {Note} from '../models/Note'
import {firstToUpper} from '../addons/GlobalFunctions'
import {notesInRange, validateRawNote} from '../utilities/MusicalAddons'
import {MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'


/**
 * @abstract
 * Has all the methods any instrument will need.
 */
export class Instrument {
    /**
     * Creates a map for the instruments notes, uses Tone's Players class to play.
     */
    constructor() {
        this.notes = new Map()
        this.players = app.get('audio-manager').getAudioMap()
    }

    /**
     * The server to load the audio files for the instrument from,
     * can be overridden.
     * @return {string}
     */
    static get server() {
        return 'http://localhost:8000/'
    }

    /**
     * Should be called from any child class's constructor.
     * Initializes all the notes and audio players for the instrument.
     * @param base
     * @param range
     */
    init(base, range) {
        Object.entries(notesInRange(base, range)).forEach(([key, {pitchClass, octave}]) => {
            const note = new Note(pitchClass, octave)
            this.notes.set(key, note)
            this.setPlayer(key, note)
        })
    }

    /**
     * Trnasforms notes of type '#' to 'b'.
     * @param pitchClass
     * @param classSet
     * @private
     * @returns {String}
     */
    static normalizeSet(pitchClass, classSet) {
        if (classSet === '#') {
            const index = mts.sharpClassNotes.indexOf(pitchClass)
            pitchClass = mts.flatClassNotes[index]
        }
        const index = mts.flatClassNotes.indexOf(pitchClass)
        return mts.flatClassNotes[index]
    }

    /**
     * Calculates a specific note's key.
     * @param {Note} note
     */
    static getKey({pitchClass, octave, classSet}) {
        return `${Instrument.normalizeSet(pitchClass, classSet)}${octave}`
    }

    /**
     * Turns a string representing a note to upper case.
     * @param noteStr
     * @return {String}
     */
    static normalizeNoteStr(noteStr) {
        return firstToUpper(noteStr)
    }

    /**
     * Generates player for some audio.
     * @param {String} fileName
     */
    generatePath(fileName) {
        throw new Error('Not implemented for this instrument yet')
    }

    /**
     * Add a player for a note.
     * @param key
     * @param {Note} note
     */
    setPlayer(key, note) {
        this.players.set(key, this.generatePath(note))
        app.get('audio-manager').toMaster(this.players.get(key))
    }

    /**
     * Get a note's player.
     * @param {String} note
     * @returns {Tone.Player}
     */
    getPlayer(note) {
        return this.players.get(Instrument.getKey(this.notes.get(note)))
    }

    /**
     * Gets a string consisting of:
     * 1. The pitch CLASS
     * 2. The octave
     * @param {String} note
     * @returns {Note}
     * @example
     * const C = someInstrument.note('c3') // C is now a Note object
     * console.log(C.interval(2))         // D3
     */
    note(note) {
        return this.notes.get(Instrument.normalizeNoteStr(note))
    }

    /**
     * Whether an instrument has a note.
     * @param {string} note
     * @return {boolean}
     */
    hasNote(note) {
        validateRawNote(note)
        return this.notes.has(Instrument.normalizeNoteStr(note))
    }

    /**
     * Play sound, optionally for a duration.
     * @param {string} note
     * @param {string} [duration=false]
     */
    play(note, duration = false) {
        if (this.hasNote(note)) {
            this.getPlayer(Instrument.normalizeNoteStr(note)).start()
            if (duration) {
                this.getPlayer(Instrument.normalizeNoteStr(note)).stop(`+${duration}`)
            }
        }
    }

    /**
     * Syncs a note to the transport with a duration.
     * @param {string} note
     * @param {string} duration
     */
    syncAndPlay(note, duration) {
        if (this.hasNote(note)) {
            this.getPlayer(Instrument.normalizeNoteStr(note)).sync().start().stop(duration)
        }
    }
}
