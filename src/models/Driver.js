import Tone from 'tone'
import {MusicTheoryStructures as mts} from '../'

export class Driver {
    constructor(piece, instruments) {
        this.piece = piece
        this.instruments = instruments
    }

    init() {
        this.transport = Tone.Transport
        this.transport.bpm.value = this.piece.bpm
        this.transport.timeSignature = this.piece.timeSignature
        this.transport.loop = true
        return this
    }

    get state() {
        return this.transport.state
    }

    scheduleVoices() {
        for (let i = 0; i < this.piece.voices.length; ++i) {
            this.scheduleMeasures(i)
        }
    }

    scheduleMeasures(voiceIndex) {
        this.piece.getVoice(voiceIndex).forEach((measure, measureIndex) => {
            this.scheduleNotes(measureIndex, voiceIndex)
        })
    }

    scheduleNotes(measureIndex, voiceIndex) {
        let setTime = 0
        this.piece.voices[voiceIndex][measureIndex].notes.forEach((data) => {
            data.notes.forEach((note) => {
                this.transport.scheduleOnce(time => {
                    this.instruments[voiceIndex].syncAndPlay(note, data.duration)
                }, `${measureIndex}:0:${setTime}`)
            })
            setTime += mts.noteDurations()[data.duration] / 4
        })
    }

    play(startTime = 0) {
        this.transport.loopEnd = this.piece.voices[0].length + 'm'
        if (this.transport.state === 'stopped') {
            this.transport.start('+0.2')
        } else {
            this.transport.stop()
        }
    }
}
