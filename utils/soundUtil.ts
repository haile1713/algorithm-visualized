import * as TONE from "tone"
export class SoundUtil {
  isMutted = true
  index = 0
  music: TONE.Player
  envelops: Array<TONE.AmplitudeEnvelope>
  counter = 0
  constructor() {
    this.music = new TONE.Player("/Algorithms-visualized/asset/Tsehay_demekech.mp3").toDestination()
    this.envelops = Array.from({ length: 10 }, () => {
      const env = new TONE.AmplitudeEnvelope({
        attack: 0.1,
        decay: 0.2,
        sustain: 0.3,
        release: 0.5,
      }).toDestination()
      const filter = new TONE.Filter(300, "highpass").toDestination();
      env.connect(filter)
      return env
    })
  }
  playNote(note: string) {
    if (!this.isMutted) {
      const env = this.envelops[this.counter % 10]
      const osc = new TONE.Oscillator().connect(env).start().stop("+0.1");
      osc.frequency.value = note;
      env.triggerAttackRelease("+0.1", 0.1);

      this.counter++
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

