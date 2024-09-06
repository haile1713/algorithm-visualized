import * as TONE from "tone"
export class SoundUtil {
  isMutted = true
  index = 0
  music: TONE.Player
  constructor() {
    this.music = new TONE.Player("/Algorithms-visualized/asset/Tsehay_demekech.mp3").toDestination()
  }
  playNote(note: string) {
    if (!this.isMutted) {
      const env = new TONE.AmplitudeEnvelope({
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 0.5,
      }).toDestination();
      const osc = new TONE.Oscillator().connect(env).start();
      osc.frequency.value = note;
      // osc.volume.value = -10
      const filter = new TONE.Filter(300, "highpass").toDestination();
      env.connect(filter)
      env.triggerAttackRelease("+0.1", 0.1);
    }
  }
  homeTheme() {
    // if (!this.isMutted) {
    TONE.loaded().then(() => {
      this.music.start()
      const filter = new TONE.Filter(300, "lowpass").toDestination();
      this.music.connect(filter)
      this.music.volume.value = -20
      this.music.loop = true
    })
    // }
  }
  mute() {
    this.isMutted = true
    this.music.mute = true
  }
  unmute() {
    TONE.start()
    this.isMutted = false
    this.music.mute = false
  }


}

