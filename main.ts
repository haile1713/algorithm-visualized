import p5 from "p5"
import { BubbleSort } from "./algorithms/bubbleSort"
import * as letters from "./public/asset/letters.json"
import { drawArray, createArrayForLetters } from "./utils/arrayUtil"

const app = document.getElementById("app") as HTMLDivElement

const sketch = (p: p5) => {
  let bubbleSort: BubbleSort
  let iterator: Iterator<{ arr: number[], index: number, swaped: boolean }>
  let nextIteration: IteratorResult<{ arr: number[], index: number, swaped: boolean }>
  let lastValue: number[]


  p.setup = () => {
    p.createCanvas(app.clientWidth, app.clientHeight)
    p.background(0)
    bubbleSort = new BubbleSort()
    iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic))
    nextIteration = iterator.next()
    drawArray(p, nextIteration.value.arr, nextIteration.value.index, false, letters.Amharic)
    p.frameRate(20)
  }
  p.draw = () => {
    if (!nextIteration.done) {
      p.background(0)
      drawArray(p, nextIteration.value.arr, nextIteration.value.index, nextIteration.value.swaped, letters.Amharic)
      lastValue = nextIteration.value.arr
      nextIteration = iterator.next()
    } else {
      p.background(0)
      drawArray(p, lastValue, -1, false, letters.Amharic)
    }

  }
  p.windowResized = () => {
    p.resizeCanvas(app.clientWidth, app.clientHeight)
    if (nextIteration) {
      if (!nextIteration.done) {
        p.background(0)
        drawArray(p, nextIteration.value.arr, nextIteration.value.index, nextIteration.value.swaped, letters.Amharic)
      }
    }
  }
}

new p5(sketch, app)
