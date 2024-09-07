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
  const select = p.select("#select")
  if (!select) return
  const slider = p.select("#slider")
  if (!slider) return

  const sortingAlgorithm = p.createSelect(select)


  p.setup = () => {
    p.createCanvas(app.clientWidth, app.clientHeight)


    const restart = p.select("#restart")
    if (!restart) return

    restart.mousePressed(() => {
      bubbleSort = Sort.SortWith(sortingAlgorithm.selected())
      iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic)) // create array of numbers from the letters
      nextIteration = iterator.next()
    })
    const mute = p.select("#mute")
    const muteCheckbox = p.select("#muteCheckbox")
    if (!mute || !muteCheckbox) return

    // defalut values
    muteCheckbox.checked(false)
    slider.value(3)

    mute.mousePressed(() => {
      isMutted = !isMutted
      if (isMutted) {
        sound.mute()
      }
      else {
        sound.unmute()
      }
    })
    bubbleSort = Sort.SortWith(sortingAlgorithm.selected())
    iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic)) // create array of numbers from the letters
    nextIteration = iterator.next()
    drawArray({ p, arr: nextIteration.value.arr, swapIndex: nextIteration.value.index, swaped: false, letters: letters.Amharic, sound }) // draw num as a bar hieght
    // sound.homeTheme()
    p.frameRate(+slider.value())
    console.log(+slider.value())
    slider.changed(() => {
      console.log(+slider.value())
      p.frameRate(+slider.value())
    })
  }
  p.draw = () => {
    // p.frameRate(slider.value())
    sortingAlgorithm.changed(() => {
      bubbleSort = Sort.SortWith(sortingAlgorithm.selected())
      iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic)) // create array of numbers from the letters
      nextIteration = iterator.next()
    })
    sound.isMutted = isMutted
    p.clear()
    if (!nextIteration.done) {
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
