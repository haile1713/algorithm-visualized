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
  const slider = p.select("#slider")
  if (!slider || !select) return

  const sortingAlgorithm = p.createSelect(select)


  p.setup = () => {
    p.createCanvas(app.clientWidth, app.clientHeight)


    const restart = p.select("#restart")
    const mute = p.select("#mute")
    const muteCheckbox = p.select("#muteCheckbox")
    if (!restart || !mute || !muteCheckbox) return // if any ui has not been found return

    // defalut values
    muteCheckbox.checked(false)
    slider.value(3)
    p.frameRate(+slider.value())

    sound.homeTheme()

    restart.mousePressed(() => {
      bubbleSort = Sort.SortWith(sortingAlgorithm.selected())
      iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic)) // create array of numbers from the letters
      nextIteration = iterator.next()
    })

    mute.mousePressed(() => {
      isMutted = !isMutted
      isMutted ? sound.mute() : sound.unmute()
    })

    bubbleSort = Sort.SortWith(sortingAlgorithm.selected()) // retunrs sorting algorithm class
    const letters_num = createArrayForLetters(letters.Amharic) // create array of numbers from the letters

    iterator = bubbleSort.sort(letters_num) // sorts and returns iterator
    nextIteration = iterator.next()

    drawArray({ p, arr: nextIteration.value.arr, swapIndex: nextIteration.value.index, swaped: false, letters: letters.Amharic, sound }) // draw num as a bar hieght

    slider.changed(() => {
      p.frameRate(+slider.value()) // the plus symbol is to convert string to number
    })
  }
  p.draw = () => {
    p.clear() // clear canvas

    sortingAlgorithm.changed(() => {
      bubbleSort = Sort.SortWith(sortingAlgorithm.selected())
      iterator = bubbleSort.sort(createArrayForLetters(letters.Amharic)) // create array of numbers from the letters
      nextIteration = iterator.next()
    })
    if (nextIteration.done) { // if it finished drawing
      drawArray({
        p,
        arr: lastValue,
        swapIndex: -1,
        swaped: false,
        letters: letters.Amharic,
        sound
      })
      return
    }
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
  }
  p.windowResized = () => {
    const prevMuteState = sound.isMutted
    sound.mute()
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
    p.resizeCanvas(app.clientWidth, app.clientHeight)
    if (!prevMuteState) // if previouly has sound
      sound.unmute()
  }
}

new p5(sketch, app)
