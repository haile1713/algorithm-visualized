import p5 from "p5"
import * as  TONE from "tone"
import { BubbleSort } from "./algorithms/bubbleSort"
import * as letters from "./public/asset/letters.json"


const app = document.getElementById("app") as HTMLDivElement

const sketch = (p: p5) => {
  let bubbleSort: BubbleSort
  let iterator: Iterator<{ arr: number[], index: number, swaped: boolean }>
  let nextIteration: IteratorResult<{ arr: number[], index: number, swaped: boolean }>
  let lastValue: number[]
  let synth: TONE.Synth

  const drawArray = (arr: number[], swapIndex: number, swaped = false) => {
    if (!swaped && swapIndex != -1) {
      synth.triggerAttackRelease("C4", "16n")
    }
    else if (swapIndex == 0) {
      synth.triggerAttackRelease("A8", "4n")
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
      const text: string = letters.Amharic[arr[i]]
      const fontSize = 1000 / (arr.length * text.length)

      p.textSize(fontSize)
      p.fill(255)
      p.text(text, i * xWidth + xWidth / 2, p.height - yHeght - 10)
    }
  }

  const createArray = (): number[] => {
    // Copy the letters array
    let arr: number[] = [...Array(letters.Amharic.length).keys()];

    // Shuffle the array using Fisher-Yates shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }
  p.setup = () => {
    p.createCanvas(app.clientWidth, app.clientHeight)
    p.background(0)
    synth = new TONE.Synth().toDestination();
    bubbleSort = new BubbleSort()
    iterator = bubbleSort.sort(createArray())
    nextIteration = iterator.next()
    drawArray(nextIteration.value.arr, nextIteration.value.index)
    p.frameRate(2)
  }
  p.draw = () => {
    if (!nextIteration.done) {
      p.background(0)
      drawArray(nextIteration.value.arr, nextIteration.value.index, nextIteration.value.swaped)
      lastValue = nextIteration.value.arr
      nextIteration = iterator.next()
    } else {
      p.background(0)
      drawArray(lastValue, -1)
    }

  }
  p.windowResized = () => {
    p.resizeCanvas(app.clientWidth, app.clientHeight)
    if (nextIteration) {
      if (!nextIteration.done) {
        p.background(0)
        drawArray(nextIteration.value.arr, nextIteration.value.index)
      }
    }
  }
}

new p5(sketch, app)
