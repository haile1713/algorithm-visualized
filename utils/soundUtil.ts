import * as TONE from "tone"
export class SoundUtil {
  isMutted = true
  music: TONE.Player
  envelops: Array<TONE.AmplitudeEnvelope>
  Notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  Bati = ["C", "E", "F#", "G", "B"];
  Anchihoye = ["C", "C#", "F", "F#", "A"];
  Ambasel = ["C", "C#", "F", "G", "G#"];
  Tezeta = ["C", "D", "E", "G", "A"];
  TezetaMinor = ["C", "C#", "D#", "G", "G#"];
  scale: string[]

  counter = 0
  constructor(scale: string) {
    this.music = new TONE.Player("/Algorithms-visualized/asset/Tsehay_demekech.mp3").toDestination()
    this.envelops = Array.from({ length: 10 }, () => {
      const env = new TONE.AmplitudeEnvelope({
        attack: 0.05,
        decay: 0.1,
        sustain: 0.2,
        release: 0.3,
      }).toDestination()
      return env
    })
    this.setScale(scale)
  }
  setScale(scale: string) {
    switch (scale) {
      case "አንቺሆዬ":
        this.scale = this.Anchihoye
        console.log(this.scale, scale)
        break

      case "ትዠታ":
        this.scale = this.Tezeta
        console.log(this.scale, scale)
        break
      case "ባቲ":
        this.scale = this.Bati
        console.log(this.scale, scale)
        break
      case "አምባሰል":
        this.scale = this.Ambasel
        console.log(this.scale, scale)
        break
      case "ትዝታ ማይነር":
        this.scale = this.TezetaMinor
        console.log(this.scale, scale)
        break
      default:
        this.scale = this.Notes
    }
  }

  playNotes(swaped = false) {
    if (this.isMutted) return
    const noteIndex = this.counter % this.scale.length
    const note = this.scale[noteIndex]
    swaped ? this.playNoteTri(`${note}4`) : this.playNoteSine(`${note}6`)
  }
  playNoteTri(note: string) {
    const envelope = this.envelops[(this.counter % this.envelops.length)];
    const osc = new TONE.Oscillator({ type: "triangle", frequency: note })
    // osc.volume.value = -10

    osc.connect(envelope).start();

    envelope.triggerAttackRelease("0.3");

    osc.stop("+0.4");
    osc.onstop = () => osc.dispose();
    this.counter++
  }
  playNoteSine(note: string) {
    const envelope = this.envelops[(this.counter % this.envelops.length)];
    const osc = new TONE.Oscillator({ type: "sine", frequency: note })
    // osc.volume.value = 10

    osc.connect(envelope).start();

    envelope.triggerAttackRelease("0.3");

    osc.stop("+0.4");
    osc.onstop = () => osc.dispose();
    this.counter++
  }

  playNoteSaw(note: string) {
    const envelope = this.envelops[(this.counter % this.envelops.length)];
    const osc = new TONE.Oscillator({ type: "sawtooth", frequency: note })
    osc.volume.value = -15

    osc.connect(envelope).start();

    envelope.triggerAttackRelease("0.5");

    osc.stop("+0.5");
    osc.onstop = () => osc.dispose();
    this.counter++
  }

  homeTheme() {
    if (!this.isMutted) {
      TONE.loaded().then(() => {
        this.music.start()
        const filter = new TONE.Filter(300, "lowpass").toDestination();
        this.music.connect(filter)
        this.music.volume.value = -20
        this.music.loop = true
      })
    }
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
