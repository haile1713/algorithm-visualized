export type sortingAlgorithms = "Bubble Sort" | "Insertion Sort" | "Selection Sort" | "Merge Sort" | "Quick Sort" | "Heap Sort"
export interface SortAlgorithm {
  // * sort(array: number[]): Iterator<{ arr: number[], index: number, swaped: boolean }>
  (arr: number[]): Iterator<{ arr: number[], index: { i: number, j: number }, swaped: boolean }>
}
export type ITERATOR = Iterator<{ arr: number[], index: { i: number, j: number, k?: number }, swaped: boolean, numComp: number }>
export type ITERATOR_RESULT = IteratorResult<{ arr: number[], index: { i: number, j: number }, swaped: boolean, numComp: number }>
