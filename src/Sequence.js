export class Sequence {
    constructor(data = []) {
        this._data = data
        this._duration = 0
        this.data.forEach(meas => {
            this._duration += meas.duration
        })
    }

    get data() {
        return this._data
    }

    set data(data) {
        this._data = data
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

    getData() {
        const data = []
        this.data.forEach((i) => {
            i.data.forEach(j => data.push(j))
        })
        return data
    }

    length() {
        return this.data.length
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