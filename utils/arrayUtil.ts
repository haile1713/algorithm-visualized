import p5 from "p5"
import { SoundUtil } from "./soundUtil"

type param = {
  p: p5
  arr: number[]
  swapIndex: number
  swaped: boolean
  json: { style: { color: string, bg_color: string }, letters: string[] } | null
  sound: SoundUtil
  font: p5.Font
}
const Notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export const drawArray = ({ p, arr, swapIndex, swaped, json, sound, font }: param) => {
  if (!swaped && swapIndex != -1) {
    sound.playNote("C5")
  }
  else if (swaped && swapIndex != -1) {
    const note = `${Notes[swapIndex % Notes.length]}4`
    sound.playNote(note)
  }

  for (let i = 0; i < arr.length; i++) {
    const xWidth = (p.width / (arr.length + 1))
    const muliplier = 500 / Math.max(...arr)
    const yHeght = (arr[i] + 1) * muliplier
    if (i == swapIndex)
      p.fill("red")
    if (i == swapIndex + 1)
      p.fill("blue")
    p.rect(i * xWidth + xWidth / 2, p.height, 10, -yHeght) // bar representing the array
    p.fill(json?.style.bg_color || "#444")
    p.rect(i * xWidth + xWidth / 2, 0, 2, p.height - yHeght) //  bar on top of the array
    const text: string = json?.letters ? json.letters[arr[i]] : `${arr[i]}`
    const fontSize = 1000 / (arr.length * text.length)

    p.textSize(fontSize)
    p.textFont(font)
    p.fill(json?.style.color || "white")
    p.text(text, i * xWidth + xWidth / 2, p.height - yHeght - 10)
  }
}

export const createArrayForLetters = (letters: string[]): number[] => {
  let arr: number[] = [...Array(letters.length).keys()];
  // Shuffle the array using Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}

export const createRandArray = (n: number, upto = 100): number[] => {
  let arr: number[] = []
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * upto))
  }
  return arr
}
