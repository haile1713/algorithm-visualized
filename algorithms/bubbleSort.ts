export class BubbleSort {

  *sort(arr: number[]): Iterator<{ arr: number[], index: number, swaped: boolean }> {
    if (arr.length < 2)// already sorted case
      yield { arr, index: -1, swaped: false }
    let swaped = false
    let counter = 0
    let i = 0

    while (!swaped) {
      swaped = true
      for (let j = 0; j < arr.length - i; j++) {
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j + 1, j)
          swaped = false
        }
        yield { arr, index: j, swaped }
        counter++
      }
      i++
    }
  }

  swap(arr: number[], i: number, j: number) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
