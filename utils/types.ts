export type sortingAlgorithms = "BubbleSort" | "InsertionSort" | "SelectionSort" | "MergeSort" | "QuickSort" | "HeapSort"
export interface SortAlgorithm {
  // * sort(array: number[]): Iterator<{ arr: number[], index: number, swaped: boolean }>
  (arr: number[]): Iterator<{ arr: number[], index: number, swaped: boolean }>
}
