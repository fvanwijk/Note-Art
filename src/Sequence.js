import {
    Measure
} from "./Measure";

export class Sequence {
    constructor() {
        this.attributes = []
        this.attributes[Sequence.MEASURES] = []
        this.attributes[Sequence.DURATION] = 0
    }

    static get MEASURES() {
        return 0
    }

    static get DURATION() {
        return 1
    }

    get measures() {
        return this.attributes[Sequence.MEASURES]
    }

    set measures(data) {
        this.attributes[Sequence.MEASURES] = data
    }

    /**
     * get the duration
     */
    get duration() {
        return this.attributes[Sequence.DURATION]
    }

    /**
     * set the duration
     */
    set duration(duration) {
        this.attributes[Sequence.DURATION] = duration
    }

    getData() {
        const data = []
        this.measures.forEach((i) => {
            i.notes.forEach(j => data.push(j))
        })
        return data
    }

    /**
     * Push measure to sequence
     * @param {Measure} measure 
     */
    push(measure) {
        if (measure instanceof Measure)
            this.measures.push(measure)
    }

    /**
     * Pushes a group of measures
     * @param {Array} measures array if measures
     */
    pushMeasures(measures) {
        measures.forEach(measure => this.measures.push(measure))
    }

    transpose(interval) {
        const newMeasures = this.measures.map(m => m.transpose(interval))
        return new Sequence(newMeasures)
    }

    toString() {
        let string = 'Sequence: { '
        this.measures.forEach((i) => {
            string += i.toString() + ', '
        })
        string += '}'
        return string
    }
}