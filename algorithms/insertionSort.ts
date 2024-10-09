import { ITERATOR } from "../utils/types"
export class InsertionSort {

  *sort(arr: number[]): ITERATOR {
    if (arr.length < 2)// already sorted case
      return { arr, index: -1, swaped: false }
    let counter = 0
    for (let i = 1; i < arr.length; i++) {
      const currentCard = arr[i]
      let currentIndex = i
      for (let j = i - 1; j >= 0; j--) { // check sorted
        counter++
        if (arr[j] > currentCard) {
          this.swap(arr, j, currentIndex)
          currentIndex = j  // it swaped with j
          yield { arr, index: { i: i, j, k: j - 1 }, swaped: true, numComp: counter }
        }
        else { // it is in the right spot 
          yield { arr, index: { i: i, j, k: j - 1 }, swaped: false, numComp: counter }
          break
        }
      }
    }
    yield { arr, index: { i: -1, j: -1 }, swaped: false, numComp: counter }
  }

  swap(arr: number[], i: number, j: number) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
