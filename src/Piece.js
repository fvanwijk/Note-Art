import { Rhythm, Sequence, Measure, } from '.'
import { getMinDuration, twoDigitFormat } from './Addons';

export class Piece {
    constructor(bpm = 100, time_signature = [4, 4]) {
        this.attributes = []
        this.attributes[Piece.RHYTHM] = new Rhythm(bpm, time_signature)
        this.attributes[Piece.DATA] = []
        this.attributes[Piece.CURRENT_MEASURE] = 0
        this.attributes[Piece.LISTS_OF_NOTES_LIST] = []
        this.attributes[Piece.DURATION] = 0
    }

    static get RHYTHM() {
        return 0
    }

    static get DATA() {
        return 1
    }

    static get LISTS_OF_NOTES_LIST() {
        return 2
    }

    static get DURATION() {
        return 3
    }

    static get CURRENT_MEASURE() {
        return 4
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
        return twoDigitFormat(this.attributes[Piece.DURATION])
    }

    set duration(dur) {
        this.attributes[Piece.DURATION] = dur
    }

    get time_signature() {
        return this.rhythm.time_signature
    }

    get bpm() {
        return this.attributes[Piece.RHYTHM].bpm
    }

    set bpm(bpm) {
        this.rhythm.updateBPM(bpm)
        this.duration = this.calculateDuration()
    }

    get time_signature() {
        return this.attributes[Piece.RHYTHM].time_signature
    }

    get ListsOfNotesList() {
        return this.attributes[Piece.LISTS_OF_NOTES_LIST]
    }

    set ListsOfNotesList(list) {
        this.attributes[Piece.LISTS_OF_NOTES_LIST] = list
    }

    get current_measure() {
        return this.attributes[Piece.CURRENT_MEASURE]
    }

    set current_measure(curr) {
        this.attributes[Piece.CURRENT_MEASURE] = curr
    }

    pushMeasure(measure) {
        if (measure instanceof Measure) {
            this.data.push(measure)
            measure.notes.forEach((notes) => {
                this.ListsOfNotesList.push(notes)
                this.duration += 60 / this.bpm * getMinDuration(notes) * this.rhythm.beats_per_measure
            })
        }
    }

    pushMeasures(measure_list) {
        measure_list.forEach(measure => this.pushMeasure(measure))
    }

    pushSequence(sequence) {
        sequence.measures.forEach(measure => this.pushMeasure(measure))
    }

    pushSequences(sequences) {
        sequences.forEach((sequence) => {
            sequence.measures.forEach(measure => this.pushMeasure(measure))
        })
    }

    pushMandS(data) {
        data.forEach((d) => {
            if (d instanceof Measure)
                this.pushMeasure(d)
            else if (d instanceof Sequence)
                this.pushSequence(d)
        })
    }

    popMeasure() {
        this.data.splice(this.data.length - 1, 1)
    }

    removeMeasure(measure_index) {
        this.data.splice(measure_index, 1)
    }

    calculateDuration() {
        let duration = 0
        this.ListsOfNotesList.forEach(data => duration += 60 / this.bpm * getMinDuration(data) * this.rhythm.beats_per_measure)
        return duration
    }

    play() {
        this.rhythm.addMeasures(this.data)
        this.rhythm.toggle()
    }

    isPlaying() {
        return this.rhythm.isPlaying()
    }

    toString() {
        let string = 'Piece: { '
        for (let i of this.data)
            string += i.toString() + ', '
        string += '} '
        return string
    }

    transpose(interval) {
        console.log(this.data)
        const newData = this.data.map(i => i.transpose(interval))
        console.log(this.bpm, this.rhythm.time_signature)
        const new_piece = new Piece(this.bpm, this.time_signature)
        new_piece.pushMeasures(newData)
        return new_piece
    }
}