export class Sequence {
    constructor(data = []) {
        this.attributes = []
        this.attributes[Sequence.MEASURES] = data
        this.attributes[Sequence.DURATION] = 0
        this.data.forEach(meas => {
            this.duration += meas.duration
        })
    }

    static get MEASURES() {
        return 0
    }

    static get DURATION() {
        return 1
    }

    get data() {
        return this.attributes[Sequence.MEASURES]
    }

    set data(data) {
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
        this.data.forEach((i) => {
            i.notes.forEach(j => data.push(j))
        })
        return data
    }

    addMeasure(measure) {
        this.data.push(measure)
    }

    transpose(interval) {
        const newMeasures = this.data.map(m => m.transpose(interval))
        return new Sequence(newMeasures)
    }

    toString() {
        let string = 'Sequence: { '
        this.data.forEach((i) => {
            string += i.toString() + ', '
        })
        string += '}'
        return string
    }
}