import p5 from "p5"
import { BubbleSort } from "./algorithms/bubbleSort"

const app = document.getElementById("app") as HTMLDivElement

const sketch = (p: p5) => {
  let bubbleSort: BubbleSort
  let iterator: Iterator<{ arr: number[], index: number, swaped: boolean }>
  let nextIteration: IteratorResult<{ arr: number[], index: number, swaped: boolean }>
  let lastValue: number[]

  const drawArray = (arr: number[], swapIndex: number, swaped = false) => {
    for (let i = 0; i < arr.length; i++) {
      const xWidth = (p.width / (arr.length + 1))
      const muliplier = 500 / Math.max(...arr)
      const yHeght = arr[i] * muliplier
      if (swapIndex == i)
        p.fill("red")
      if (i == swapIndex + 1)
        p.fill("blue")
      p.rect(i * xWidth + xWidth / 2, p.height, 10, -yHeght)
      const text: string = `${arr[i]}`
      const fontSize = 1000 / (arr.length * text.length / 2)
      p.textSize(fontSize)
      p.fill(255)
      p.text(text, i * xWidth + xWidth / 2, p.height - yHeght - 10)
    }
  }

  const createArray = (): number[] => {
    let arr: number[] = []
    for (let i = 0; i < 50; i++) {
      arr.push(Math.floor(Math.random() * 45))
    }
    return arr
  }
  p.setup = () => {
    p.createCanvas(app.clientWidth, app.clientHeight)
    p.background(0)
    bubbleSort = new BubbleSort()
    iterator = bubbleSort.sort(createArray())
    nextIteration = iterator.next()
    drawArray(nextIteration.value.arr, nextIteration.value.index)
  }
  p.draw = () => {
    if (!nextIteration.done) {
      p.background(0)
      drawArray(nextIteration.value.arr, nextIteration.value.index)
      lastValue = nextIteration.value.arr
      nextIteration = iterator.next() || nextIteration
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
