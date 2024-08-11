import { BubbleSort } from '../algorithms/bubbleSort';
import { sortingAlgorithms } from './types';
export class Sort {
  static SortWith(sortingAlgoithm: sortingAlgorithms) {
    switch (sortingAlgoithm) {
      case "BubbleSort": {
        return new BubbleSort()
      }
    }
  }
}
