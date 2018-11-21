import {Note, Chord, DiatonicScale} from '.'

/**
 * represents a Musical Key that is based on a specific Diatonic Scale.,
 * @extends DiatonicScale
 */
export class Key extends DiatonicScale {
    constructor(tonic, pattern) {
        super(tonic, pattern)
    }

    addChordProgression(chords) {

    }
}

export default Key
