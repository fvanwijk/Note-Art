import {Note, Rhythm, Sequence, Measure, Chord, note_durations} from '.'
import {
    isArray,
}                                                               from 'util'

export class Piece {
    constructor(BPM, time_signature, data) {
        this._BPM            = BPM
        this._time_signature = time_signature
        this.rhythm          = Rhythm.getRhythm(BPM, time_signature)
        if (data) {
            this._data = data
        } else {
            this._data = []
        }
        this.init()
    }

    init() {
        this.duration      = 0
        this.playable_data = new Array()
        for (const i of this.data) {
            if (i instanceof Measure || i instanceof Sequence) {
                for (const j of i.getData()) {
                    this.playable_data.push(j)
                    this.duration += note_durations[j.duration]
                }
            } else {
                this.playable_data.push(i)
                this.duration += note_durations[i.duration]
            }
        }
        this.length = this.calculateLength()
    }

    get data() {
        return this._data
    }

    set data(data) {
        this._data = data
        this.init()
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

    get BPM() {
        return this._BPM
    }

    set BPM(BPM) {
        this._BPM = BPM
        this.rhythm.updateBPM(BPM)
        this.length = this.calculateLength()
    }

    calculateLength() {
        this.length = 0
        this.playable_data.forEach(data => {
            if (data instanceof Note || data instanceof Chord) {
                this.length += 60 / this.BPM * note_durations[data.duration] * this.rhythm.beats_per_measure
            } else if (isArray(data)) {
                let min_duration = note_durations[data.duration]
                data.forEach((note) => {
                    min_duration = min_duration < note_durations[note.duration] ? min_duration : note_durations[note.duration]
                })
                this.length += 60 / this.BPM * min_duration * this.rhythm.beats_per_measure
            }
        })
        return this.length
    }

    play() {
        this.rhythm.addNotes(this.playable_data)
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
}

export default Piece
