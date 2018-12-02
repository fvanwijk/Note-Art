import {
    Note,
    Rhythm,
    Sequence,
    Measure,
    Chord,
    note_durations
} from '.'
import {
    isArray,
} from 'util'

export class Piece {
    constructor(bpm = 100, time_signature = [4, 4], data = []) {
        this.attributes = []
        this.attributes[Piece.RHYTHM] = new Rhythm(bpm, time_signature)
        this.attributes[Piece.DATA] = data
        this.attributes[Piece.NOTES] = this.init()
        this.attributes[Piece.DURATION] = this.calculateDuration()
    }

    static get RHYTHM() {
        return 0
    }

    static get DATA() {
        return 1
    }

    static get NOTES() {
        return 2
    }

    static get DURATION() {
        return 3
    }


    init() {
        let notes = []
        this.data.forEach((i) => {
            if (i instanceof Measure || i instanceof Sequence) {
                i.getData().forEach((j) => {
                    notes.push(j)
                })
            } else {
                notes.push(i)
            }
        })
        return notes
    }

    get rhythm() {
        return this.attributes[Piece.RHYTHM]
    }

    get data() {
        return this.attributes[Piece.DATA]
    }

    set data(data) {
        this.attributes[Piece.DATA] = data
        this.notes = this.init()
    }

    /**
     * get the duration
     */
    get duration() {
        return this.attributes[Piece.DURATION]
    }

    get time_signature() {
        return this.rhythm.time_signature
    }

    get bpm() {
        return this.attributes[Piece.RHYTHM].bpm
    }

    set bpm(bpm) {
        this.rhythm.updateBPM(bpm)
        this.attributes[Piece.DURATION] = this.calculateDuration()
    }

    get notes() {
        return this.attributes[Piece.NOTES]
    }

    calculateDuration() {
        let duration = 0
        this.notes.forEach(data => {
            if (data instanceof Note || data instanceof Chord) {
                duration += 60 / this.bpm * note_durations[data.duration] * this.rhythm.beats_per_measure
            } else if (isArray(data)) {
                let min_duration = note_durations[data.duration]
                data.forEach((note) => {
                    min_duration = min_duration < note_durations[note.duration] ? min_duration : note_durations[note.duration]
                })
                duration += 60 / this.bpm * min_duration * this.rhythm.beats_per_measure
            }
        })
        return duration
    }

    play() {
        this.rhythm.addNotes(this.notes)
        this.rhythm.toggle()
    }

    pushToData(new_data) {
        this.data.push(new_data)
    }

    toString() {
        let string = 'Piece: { '
        for (let i of this.data)
            string += i.toString() + ', '
        string += '} '
        return string
    }

    transpose(interval) {
        const newData = this.data.map(i => i.transpose(interval))
        return new Piece(this.bpm, this.time_signature, newData)
    }
}