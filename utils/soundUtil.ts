
export class SoundUtil {
  isMutted = false
  action: HTMLAudioElement
  ding: HTMLAudioElement
  players: AudioContext[]
  index = 0
  constructor() {
    this.action = new Audio('../public/asset/se_game_attack1.wav')
    this.ding = new Audio('../public/asset/se_game_fixa.wav')
    this.players = new Array(5).fill(0).map(x => new (window.AudioContext || window.webkitAudioContext)())
  }

  playNote(freq: number) {
    if (!this.isMutted) {
      // Create a new AudioContext
      const duration = 0.1; // Duration in
      const player = this.players[this.index]

      const oscillator = player.createOscillator();
      oscillator.frequency.setValueAtTime(freq, player.currentTime);
      oscillator.type = 'sine';

      // Create a GainNode to control the volume
      // const volumeControl = player.createGain();
      // volumeControl.gain.setValueAtTime(0.1, player.currentTime);
      //
      // oscillator.connect(volumeControl);

      oscillator.connect(player.destination);
      oscillator.start();

      oscillator.stop(player.currentTime + duration);
      this.index += 1
      if (this.index == this.players.length)
        this.index = 0
    }
  }
  mute() {
    // this.players.forEach(player => player.close())
    this.isMutted = true
  }
  unmute() {
    // this.players = new Array(5).fill(0).map(x => new (window.AudioContext || window.webkitAudioContext))
    this.isMutted = false
  }


}

