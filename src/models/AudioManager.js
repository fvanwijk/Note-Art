import { MusicTheoryStructures as mts} from '../resources/MusicTheoryStructures'
import Tone                                         from 'tone'

/**
 * @classdesc A singleton class which handles all file requests,
 * uses <a href="https://tonejs.github.io/">ToneJS</a>.
 * @class
 */
export class AudioManager {
    /**
     * @return {Tone.Players}
     */
    static getAudioMap() {
        return new Tone.Players()
    }

    /**
     * Resumes audio context.
     */
    static resumeContext() {
        Tone.context.resume()
    }

    /**
     * Connects audio node to master.
     * @param audioContext
     */
    static toMaster(audioContext) {
        audioContext.toMaster()
    }
}
