---
title: AudioManager
---

# AudioManager

<a name="AudioManager"></a>

## AudioManager
A singleton class which handles all file requests,
uses <a href="https://tonejs.github.io/">ToneJS</a>.

**Kind**: global class  

* [AudioManager](#AudioManager)
    * [.getAudioMap()](#AudioManager.getAudioMap) ⇒ <code>Tone.Players</code>
    * [.resumeContext()](#AudioManager.resumeContext)
    * [.toMaster(audioContext)](#AudioManager.toMaster)

<a name="AudioManager.getAudioMap"></a>

### AudioManager.getAudioMap() ⇒ <code>Tone.Players</code>
**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  
<a name="AudioManager.resumeContext"></a>

### AudioManager.resumeContext()
Resumes audio context.

**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  
<a name="AudioManager.toMaster"></a>

### AudioManager.toMaster(audioContext)
Connects audio node to master.

**Kind**: static method of [<code>AudioManager</code>](#AudioManager)  

| Param |
| --- |
| audioContext | 

