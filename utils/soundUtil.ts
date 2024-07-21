import * as  TONE from "tone"

export class SoundUtil {
  synth: TONE.Synth
  constructor() {
    this.synth = new TONE.Synth().toDestination();
  }

  playNote(note: string) {
    this.synth.triggerAttackRelease(note, "8n");
  }
}
