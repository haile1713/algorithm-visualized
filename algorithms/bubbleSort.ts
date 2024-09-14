import { ITERATOR } from "../utils/types"
export class BubbleSort {

  *sort(arr: number[]): ITERATOR {
    if (arr.length < 2)// already sorted case
      return { arr, index: -1, swaped: false }
    let swaped = true
    let i = 1
    let numComp = 0

    while (swaped) {
      swaped = false
      for (let j = 0; j < arr.length - i; j++) {
        numComp++
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j + 1, j)
          swaped = true
        }
        else {
          yield {
            arr, index: { i: j, j: j + 1 }, swaped: false, numComp
          }
          continue
        }
        yield {
          arr, index: { i: j, j: j + 1 }, swaped, numComp
        }
      }
      i += 1
    }
    yield { arr: [...arr], index: { i: -1, j: -1 }, swaped: false, numComp };
  }

  swap(arr: number[], i: number, j: number) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
