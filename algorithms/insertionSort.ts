export class InsertionSort {

  *sort(arr: number[]): Iterator<{ arr: number[], index: number, swaped: boolean }> {
    if (arr.length < 2)// already sorted case
      return { arr, index: -1, swaped: false }
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i]
      const swaped = false
      for (let j = i - 1; j >= 0; j--) { // check  in reverse
        if (key < arr[j]) {
          this.swap(arr, i, j)
          yield { arr, index: i, swaped }
        }
        else {
          yield { arr, index: i, swaped: false }
        }
      }
    }

    // while (swaped) {
    //   swaped = false
    //   for (let j = 0; j < arr.length - i; j++) {
    //     if (arr[j] > arr[j + 1]) {
    //       this.swap(arr, j + 1, j)
    //       swaped = true
    //     }
    //     else {
    //       yield { arr, index: j, swaped: false }
    //     }
    //     yield { arr, index: j, swaped }
    //     counter++
    //   }
    //   i++
    // }
  }

  swap(arr: number[], i: number, j: number) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
