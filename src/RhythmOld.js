import {Note, Chord, note_durations} from '.'

import {
    isArray,
}                                    from 'util'

var rhythm

// for cross browser compatibility
const AudioContext = window.AudioContext || window.webkitAudioContext   //web audio api instance
const audioCtx     = new AudioContext()
let min_interval   = 1 / 16 //the interval at which the schedualer will be called and data will be able to be played.
let next_interval  = 0.0 //the time at which the next interval will be called updating with currentTime
let next_note_time = 0.0 // when the next note is due.
function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (next_interval < audioCtx.currentTime + rhythm.scheduleAheadTime) {
        rhythm.nextNote()
    }
    rhythm.timerID = setTimeout(scheduler, rhythm.lookahead)
}

/**
 * Creates a rhythm instance which holds bpm and time signature information.
 * @class
 */
export class Rhythm {
    constructor(bpm, time_signature) {
        this.data        = null // the Sounds that will be played
        this.dataKeeper  = null  //will hold the music to reload it when it reaches the end
        this.reload_data = false    //variable to dictate whether data needs to be reloaded or not

        this.metronome_sound = new Howl({
            src: ['/static/Media/Metronome/1.wav'],
        })

        this.metronome = false  //metronome playing or not

        this.timerID           = null     //the timerID of the setInterval
        this.lookahead         = 60 / this.bpm * min_interval // How frequently to call scheduling function (in
                                                              // milliseconds)
        this.scheduleAheadTime = 0.1 // How far ahead to schedule audio (sec)

        this.current_beat  = 1    //current beat
        this.notesInQueue  = []
        this.next_note     = 1
        this.lastNoteDrawn = 3

        this.bpm               = bpm
        this.beats_per_measure = time_signature[0]
        this.beat_duration     = time_signature[1]
        this.isPlaying         = false
        this.beat_check        = 0

        this.loop = true
    }

    static getRhythm() {
        if (rhythm) {
            return rhythm
        }
        rhythm = new Rhythm(60, [4, 4])
        return rhythm
    }

    scheduleNote() {
        // push the note on the queue, even if we're not playing.
        if (this.data.length) {
            if (this.data[0]) {
                this.scheduleNoteHelper(this.data[0])
                this.data.splice(0, 1)
            }
        } else {
            this.reload_data = true
        }
    }

    scheduleNoteHelper(data) {
        if (data instanceof Note || data instanceof Chord) {
            this.next_note = this.data.length ? note_durations[data.duration] : null
            console.log(data.toString())
            data.play()
        } else if (isArray(data)) {
            let min_duration       = note_durations[data.duration],
                playNow            = [],
                curr_notes_playing = ''
            for (const n of data) {
                min_duration = min_duration < note_durations[n.duration] ? min_duration : note_durations[n.duration]
                playNow.push(n)
                curr_notes_playing += n.toString() + ' '
            }
            for (const n of playNow)
                n.play()
            console.log(curr_notes_playing)
            this.next_note = this.data.length ? min_duration : null
        }

    }

    nextNote() {
        var secondsPerBeat = 60 / this.bpm // tempo
        next_interval += secondsPerBeat * min_interval

        // Advance the beat number, wrap to zero
        this.beat_check += secondsPerBeat * min_interval
        if (this.beat_check >= secondsPerBeat) {
            if (this.metronome) {
                this.metronome_sound.play()
            }
            this.beat_check = 0
            this.current_beat++
            if (this.current_beat === this.beats_per_measure + 1) {
                this.current_beat = 1
            }
        }
        if (next_note_time <= audioCtx.currentTime) {
            this.scheduleNote()
            next_note_time += secondsPerBeat * this.next_note * this.beats_per_measure // Add beat duration to last
                                                                                       // beat time
        }
    }

    draw() {
        let drawNote       = rhythm.lastNoteDrawn
        rhythm.currentTime = audioCtx.currentTime

        // while (rhythm.notesInQueue.length && rhythm.notesInQueue[0].time < rhythm.currentTime) {
        //     drawNote = rhythm.notesInQueue[0].note
        //     rhythm.notesInQueue.splice(0, 1) // remove note from queue
        // }

        // We only need to draw if the note has moved.
        if (rhythm.lastNoteDrawn != drawNote) {

            rhythm.lastNoteDrawn = drawNote
        }
        // set up to draw again
        requestAnimationFrame(rhythm.draw)
    }

    getBeat() {
        return this.current_beat
    }

    toggle() {
        rhythm          = this
        this.start_time = audioCtx.currentTime
        if (this.reload_data) {
            this.reload_data = false
            this.data        = this.dataKeeper
        }
        this.isPlaying = !this.isPlaying
        if (this.isPlaying) { // start playing

            // check if context is in suspended state (autoplay policy)
            if (audioCtx.state === 'suspended') {
                audioCtx.resume()
            }
            this.current_beat = 0
            this.next_note    = audioCtx.currentTime
            next_note_time    = audioCtx.currentTime
            scheduler() // kick off scheduling
            requestAnimationFrame(this.draw) // start the drawing loop.
        } else {
            clearTimeout(this.timerID)
        }
    }

    addNotes(data) {
        this.data       = data
        this.dataKeeper = JSON.parse(JSON.stringify(data))
    }

    toggleMetronome() {
        if (rhythm) {
            rhythm.metronome = !rhythm.metronome
        }
    }
}
