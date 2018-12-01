// var chunks = []
// var ac = new AudioContext()
// var dest = ac.createMediaStreamDestination()
// var mediaRecorder = new MediaRecorder(dest.stream)


// function start(){
//     mediaRecorder.start()
// }
// function stop(){
//     mediaRecorder.stop()
// }

// mediaRecorder.ondataavailable = function (evt) {
//     // push each chunk (blobs) in an array
//     chunks.push(evt.data)
//     console.log('yay')
// }

// function getFile(){
//     var blob = new Blob(chunks, {
//         'type': 'audio/ogg codecs=opus'
//     })
//     return URL.createObjectURL(blob)
// }

// export {start, stop, getFile, mediaRecorder, chunks}