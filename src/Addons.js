import {note_durations} from '.'

function firstToUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function getMinDuration(notes = []) {
    let min_duration
    notes.forEach((note) => {
        min_duration = min_duration < note_durations[note.duration] ? min_duration : note_durations[note.duration]
    })
    return min_duration
}

const twoDigitFormat = (num) => Number.parseFloat(num).toFixed(2)

export {
    firstToUpper,
    getMinDuration,
    twoDigitFormat
}