export type sortingAlgorithms = "Bubble Sort" | "Insertion Sort" | "Selection Sort" | "Merge Sort" | "Quick Sort" | "Heap Sort"
export interface SortAlgorithm {
  // * sort(array: number[]): Iterator<{ arr: number[], index: number, swaped: boolean }>
  (arr: number[]): Iterator<{ arr: number[], index: number, swaped: boolean }>
}
