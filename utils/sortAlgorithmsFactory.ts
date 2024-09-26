import { BubbleSort } from '../algorithms/bubbleSort';
import { InsertionSort } from '../algorithms/insertionSort'
import { SelectionSort } from '../algorithms/selectionSort'
import { sortingAlgorithms } from './types';
export class Sort {
  static SortWith(sortingAlgoithm: sortingAlgorithms) {
    switch (sortingAlgoithm) {
      case "Bubble Sort": {
        return new BubbleSort()
      }
      case "Insertion Sort": {
        return new InsertionSort()
      }
      case "Selection Sort": {
        return new SelectionSort()
      }
      case "Heap Sort": {
        return new BubbleSort()
      }
      case "Merge Sort": {
        return new BubbleSort()
      }
      case "Quick Sort": {
        return new BubbleSort()
      }
    }
  }
}
