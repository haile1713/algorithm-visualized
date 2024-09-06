import { BubbleSort } from '../algorithms/bubbleSort';
import { sortingAlgorithms } from './types';
export class Sort {
  static SortWith(sortingAlgoithm: sortingAlgorithms) {
    switch (sortingAlgoithm) {
      case "Bubble Sort": {
        return new BubbleSort()
      }
      case "Insertion Sort": {
        return new BubbleSort()
      }
      case "Selection Sort": {
        return new BubbleSort()
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
