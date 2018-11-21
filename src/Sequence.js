export class Sequence {
    constructor(measures = []) {
        this._measures = measures
        this._duration = 0
        this._measures.forEach(meas => {
            this._duration += meas.duration
        })
    }

    get measures() {
        return this._measures
    }

    set measures(measures) {
        this._measures = measures
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
        const data = new Array()
        for (const i of this.measures)
            for (const j of i.data)
                data.push(j)
        return data
    }

    length() {
        return this._measures.length
    }

    addMeasure(measure) {
        this.measures.push(measure)
    }

    toString() {
        let string = 'Sequence: { '
        for (let i of this.measures)
            string += i.toString() + ', '
        string += '} '
        return string
    }
}
