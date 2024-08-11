import p5 from "p5"
import { BubbleSort } from "./algorithms/bubbleSort"
import * as letters from "./public/asset/letters.json"
import { drawArray, createArrayForLetters } from "./utils/arrayUtil"
import { SoundUtil } from "./utils/soundUtil"
import { Sort } from "./utils/sortAlgorithmsFactory"

const app = document.getElementById("app") as HTMLDivElement
const sound = new SoundUtil()


const sketch = (p: p5) => {
  let bubbleSort: BubbleSort
  let iterator: Iterator<{ arr: number[], index: number, swaped: boolean }>
  let nextIteration: IteratorResult<{ arr: number[], index: number, swaped: boolean }>
  let lastValue: number[]
  let isMutted = true
  let sortingAlgorithm: p5.Element


  p.setup = () => {
    p.createCanvas(app.clientWidth, app.clientHeight)
    p.background(0)
    sortingAlgorithm = p.createSelect()
    sortingAlgorithm.position(p.width - 100, 0)
    sortingAlgorithm.size(100)
    sortingAlgorithm.option("BubbleSort")
    sortingAlgorithm.option("QuickSort")
    sortingAlgorithm.option("MergeSort")
    sortingAlgorithm.option("InsertionSort")
    sortingAlgorithm.selected("BubbleSort")

    const restart = p.createButton("restart")
    restart.mousePressed(() => {
      bubbleSort = Sort.SortWith(sortingAlgorithm.selected())
      iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic)) // create array of numbers from the letters
      nextIteration = iterator.next()
    })
    restart.position(0, 25)
    restart.size(100)
    restart.style("border-radius", "8px")
    restart.mouseOver(() => {
      restart.style("background-color", "#00f")
    })
    restart.mouseOut(() => {
      restart.style("background-color", "#fff")
    })

    const mute = p.createButton("mute")
    mute.position(0, 0)
    mute.size(100)
    mute.style("background-color", "#f00") // default muted
    mute.style("border-radius", "8px")
    mute.mousePressed(() => {
      isMutted = !isMutted
      if (isMutted) {
        sound.mute()
        mute.style("background-color", "#f00")
      }
      else {
        sound.unmute()
        mute.style("background-color", "#fff")
      }
    })
    bubbleSort = Sort.SortWith(sortingAlgorithm.selected())
    iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic)) // create array of numbers from the letters
    nextIteration = iterator.next()
    drawArray({ p, arr: nextIteration.value.arr, swapIndex: nextIteration.value.index, swaped: false, letters: letters.Amharic, sound }) // draw num as a bar hieght
    p.frameRate(4)
  }
  p.draw = () => {
    // console.log(sortingAlgorithm.changed())
    sound.isMutted = isMutted
    if (!nextIteration.done) {
      p.background(0)
      drawArray({
        p,
        arr: nextIteration.value.arr,
        swapIndex: nextIteration.value.index,
        swaped: nextIteration.value.swaped,
        letters: letters.Amharic,
        sound
      })
      lastValue = nextIteration.value.arr
      nextIteration = iterator.next()
    } else {
      p.background(0)
      drawArray({
        p,
        arr: lastValue,
        swapIndex: -1,
        swaped: false,
        letters: letters.Amharic,
        sound
      })
    }

  }
  p.windowResized = () => {
    p.resizeCanvas(app.clientWidth, app.clientHeight)
    if (nextIteration) {
      if (!nextIteration.done) {
        p.background(0)
        drawArray({
          p,
          arr: nextIteration.value.arr,
          swapIndex: nextIteration.value.index,
          swaped: nextIteration.value.swaped,
          letters: letters.Amharic,
          sound
        })
      }
    }
  }
}

new p5(sketch, app)
