import p5 from "p5"
import { SoundUtil } from "./soundUtil"
const sound = new SoundUtil()

export const drawArray = (p: p5, arr: number[], swapIndex: number, swaped = false, letters: string[] | null = null) => {
  if (!swaped && swapIndex != -1) {
    sound.playNote("C4")
  }
  else if (swaped && swapIndex != -1) {
    sound.playNote("F4")
  }
  else if (swapIndex == 0) {
    sound.playNote("F4")
  }
  for (let i = 0; i < arr.length; i++) {
    const xWidth = (p.width / (arr.length + 1))
    const muliplier = 500 / Math.max(...arr)
    const yHeght = arr[i] * muliplier
    if (swapIndex == i)
      p.fill("red")
    if (i == swapIndex + 1)
      p.fill("blue")
    p.rect(i * xWidth + xWidth / 2, p.height, 10, -yHeght)
    p.fill(100)
    p.rect(i * xWidth + xWidth / 2, 0, 2, p.height - yHeght)
    const text: string = letters ? letters[i] : `${arr[i]}`
    const fontSize = 1000 / (arr.length * text.length)

    p.textSize(fontSize)
    p.fill(255)
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
  return arr;
}

export const createRandArray = (n: number, upto = 100): number[] => {
  let arr: number[] = []
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * upto))
  }
  return arr
}
