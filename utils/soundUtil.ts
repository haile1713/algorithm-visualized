import * as TONE from "tone"
export class SoundUtil {
  isMutted = true
  index = 0
  music: TONE.Player
  envelops: Array<TONE.AmplitudeEnvelope>
  numTones = 5
  oscAmt = 10; // Number of oscillators
  freqX = [4000 * 2]; // Starting frequency (first element)
  lowestFreq = 50; // Lowest output frequency
  highestFreq = 16000; // Highest output frequency
  gainVal = 0.02; // Gain value for oscillators
  Notes = ["C", "D", "E", "F", "G", "A", "B"];

  numLayers = 10; // Number of layers
  baseFrequency = 440; // Base frequency (A4)
  duration = 2000; // Duration for each layer in ms
  fadeDuration = 500; // Fade duration in ms
  tones: TONE.Synth[] = [];


  counter = 0
  constructor() {
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

  }

  async playShepardTones() {
    const numLayers = 7; // Number of layers
    const baseFrequency = 440; // Base frequency
    const duration = 200; // Duration for each note
    const fadeDuration = 100; // Fade duration
    // Start the Tone.js context
    await TONE.start();
    const now = TONE.now();

    for (let i = 0; i < numLayers; i++) {
      const frequency = baseFrequency * Math.pow(2, i / 12);
      const synth = new TONE.Synth().toDestination();

      synth.volume.value = -12; // Initial volume
      synth.triggerAttack(frequency, now + i * (duration / 1000)); // Play note
      synth.triggerRelease(now + i * (duration / 1000) + (duration / 1000)); // Release note

      // Optional: Add fade out effect
      synth.volume.linearRampToValueAtTime(-Infinity, now + i * (duration / 1000) + (duration / 1000) + fadeDuration / 1000);
    }
  }
  createTones() {
    for (let i = 0; i < this.numLayers; i++) {
      const frequency = this.baseFrequency * Math.pow(2, i / 12); // Calculate frequency
      const synth = new TONE.Synth({
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0,
          decay: 0.1,
          sustain: 1,
          release: 0.5
        }
      }).toDestination();

      this.tones.push(synth);
    }
  }
  // Play the Shepard tone
  async playShepardTone() {
    await TONE.start(); // Start Tone.js context
    this.createTones(); // Initialize tones

    const now = TONE.now();

    this.tones.forEach((synth, index) => {
      const frequency = this.baseFrequency * Math.pow(2, index / 12);
      synth.triggerAttack(frequency, now + index * (this.duration / 1000)); // Play note
      synth.triggerRelease(now + index * (this.duration / 1000) + (this.duration / 1000)); // Release note

      // Fade out the synth volume
      synth.volume.linearRampToValueAtTime(-Infinity, now + index * (this.duration / 1000) + (this.duration / 1000) + this.fadeDuration / 1000);
    });
  }

  // Function to play Shepard Tone notes
  playNote(note: string, noteIndex: number = 0, fade: number | null = null) {
    const envelope = this.envelops[(this.counter % this.envelops.length)];
    const osc = new TONE.Oscillator({ type: "sine", frequency: note })

    // Convert note to frequency and start the oscillator
    osc.connect(envelope).start();

    // Apply envelope settings
    envelope.triggerAttackRelease("0.5");  // Adjust the duration of the envelope
    if (noteIndex == 0) return
    if (fade)
      osc.volume.value = fade


    // Stop and clean up the oscillator
    osc.stop("+0.5");
    osc.onstop = () => osc.dispose(); // Dispose of the oscillator after stopping
    this.counter++
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
    this.playShepardTone()
  }
}
