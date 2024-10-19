import p5 from "p5"
import { BubbleSort } from "./algorithms/bubbleSort"
import * as json from "./public/asset/letters.json"
import { drawArray, createArrayForLetters } from "./utils/arrayUtil"
import { SoundUtil } from "./utils/soundUtil"
import { Sort } from "./utils/sortAlgorithmsFactory"
import { ITERATOR, ITERATOR_RESULT } from "./utils/types"

const app = document.getElementById("app") as HTMLDivElement


const sketch = (p: p5) => {
  let sortAlgorithms: BubbleSort
  let iterator: ITERATOR
  let nextIteration: ITERATOR_RESULT
  let lastValue: number[]
  let isMutted = true

  const select = p.select("#select")
  const slider = p.select("#slider")
  const scale = p.select("#scale") //musical
  const slider_label = p.select("#slider-label")
  const numCompDiv = p.select('#num-comp')
  const numSwapDiv = p.select('#num-swap')
  let intoDone = false
  let into_font: any
  let main_font: any
  let numSwap = 0;
  let letters = json.Amharic
  if (
    !slider || !select
    || !slider_label
    || !numCompDiv || !numSwapDiv
    || !scale
  ) return

  const sortingAlgorithm = p.createSelect(select)
  const musicalScale = p.createSelect(scale)
  const sound = new SoundUtil(scale.value().toString())
  p.preload = () => {
    // "./public/asset/fonts/AbyssinicaSIL-R.ttf"
    into_font = p.loadFont("/asset/fonts/yigezubisratgothic.ttf")
    main_font = p.loadFont("/asset/fonts/AbyssinicaSIL-R.ttf")
    // main_font = p.loadFont("/asset/fonts/jiret.ttf")
  }

  const intro = async () => {
    return new Promise<void>((resolve) => {
      const intro_Sort = Sort.SortWith(sortingAlgorithm.selected())
      const num_array = json.nehemiah.letters.map((_, i) => i).reverse()
      const restart = p.select("#restart")
      const mute = p.select("#mute")
      const muteCheckbox = p.select("#muteCheckbox")
      if (!restart || !mute || !muteCheckbox) return // if any ui has not been found return

      // defalut values
      muteCheckbox.checked(false)
      slider.value(3)
      slider_label.html("Speed: " + slider.value())
      p.frameRate(+slider.value())

      mute.mousePressed(() => {
        isMutted = !isMutted
        isMutted ? sound.mute() : sound.unmute()
      })
      restart.mousePressed(() => {
        sortAlgorithms = Sort.SortWith(sortingAlgorithm.selected())
        iterator = sortAlgorithms.sort(createArrayForLetters(letters.letters)) // create array of numbers from the letters
        nextIteration = iterator.next()
        numSwap = 0
      })
      slider.changed(() => {
        p.frameRate(+slider.value()) // the plus symbol is to convert string to number
        slider_label.html("Speed: " + slider.value())
        if (slider.value() == 0)
          slider_label.html("Speed = 0, paused")
      })


      let intro_iterator = intro_Sort.sort(num_array)
      let intro_nextIteration = intro_iterator.next()

      const id = setInterval(() => {
        p.background(25)
        if (intro_nextIteration.done) { // if it finished drawing
          drawArray({
            p,
            arr: lastValue,
            swapIndex: { i: -1, j: -1 },
            swaped: false,
            json: json.nehemiah,
            sound,
            font: main_font
          })
          clearInterval(id)
          setTimeout(() => {
            p.clear()
            resolve()
          }, 0)
          return

        }
        drawArray({
          p,
          arr: intro_nextIteration.value.arr,
          swapIndex: intro_nextIteration.value.index,
          swaped: intro_nextIteration.value.swaped,
          json: json.nehemiah,
          sound,
          font: main_font
        })
        lastValue = intro_nextIteration.value.arr
        intro_nextIteration = intro_iterator.next()
      }, 400)

    })
  }

  p.setup = async () => {
    const cvs = p.createCanvas(app.clientWidth, app.clientHeight)
    cvs.style("z-index", "1000")

    await intro()

    sortAlgorithms = Sort.SortWith(sortingAlgorithm.selected()) // returns sorting algorithm class
    const letters_num = createArrayForLetters(letters.letters) // create array of numbers from the letters

    iterator = sortAlgorithms.sort(letters_num) // sorts and returns iterator
    nextIteration = iterator.next()

    drawArray({ p, arr: nextIteration.value.arr, swapIndex: nextIteration.value.index, swaped: false, json: letters, sound, font: main_font }) // draw num as a bar hieght


    intoDone = true
  }
  p.draw = () => {
    if (!intoDone) return
    p.clear() // clear canvas

    musicalScale.changed(() => {
      const selected = musicalScale.selected()
      sound.setScale(selected)
      console.log(selected)
    })

    sortingAlgorithm.changed(() => {
      sortAlgorithms = Sort.SortWith(sortingAlgorithm.selected())
      iterator = sortAlgorithms.sort(createArrayForLetters(letters.letters)) // create array of numbers from the letters
      nextIteration = iterator.next()
      // reset
      numSwap = 0
      numCompDiv.html("0")
      numSwapDiv.html("0")
    })
    if (nextIteration.done) { // if it finished drawing
      drawArray({
        p,
        arr: lastValue,
        swapIndex: { i: -1, j: -1 },
        swaped: false,
        json: letters,
        sound,
        font: main_font,
      })
      return
    }
    drawArray({ // if finished drawing show the last value it got(sorted)
      p,
      arr: nextIteration.value.arr,
      swapIndex: nextIteration.value.index,
      swaped: nextIteration.value.swaped,
      json: letters,
      sound,
      font: main_font,
    })
    // show stat
    numCompDiv.html(`${nextIteration.value.numComp}`)
    if (nextIteration.value.swaped)
      numSwap++
    numSwapDiv.html(`${numSwap}`)
    lastValue = nextIteration.value.arr
    nextIteration = iterator.next()
  }
  p.windowResized = () => {
    if (!nextIteration || nextIteration.done) { // if it finished drawing resize canvas then quit
      p.resizeCanvas(app.clientWidth, app.clientHeight)
      return
    }

    const prevMuteState = sound.isMutted
    sound.mute()
    p.background(0)
    drawArray({
      p,
      arr: nextIteration.value.arr,
      swapIndex: nextIteration.value.index,
      swaped: nextIteration.value.swaped,
      json: letters,
      sound,
      font: main_font,
    })
    p.resizeCanvas(app.clientWidth, app.clientHeight)
    if (!prevMuteState) // if previouly has sound
      sound.unmute()
  }
}

new p5(sketch, app)
