import { describe, it, expect, test } from "vitest";
import { SelectionSort } from "../algorithms/selectionSort";
import { ITERATOR } from "../utils/types"

const iteratorToArr = (iterator: ITERATOR) => {
  let result = iterator.next()
  let finalArr: number[] = result.value.arr
  while (!result.done) {
    finalArr = result.value.arr;
    result = iterator.next()
  }
  return finalArr
}
describe("Selection Sort", () => {

  it("sort empty array", () => {
    const testSelectionSort = new SelectionSort()
    const sortedArr = iteratorToArr(testSelectionSort.sort([]))
    expect(sortedArr).toStrictEqual([])
  })

  it("if one item passed", () => {
    const testSelectionSort = new SelectionSort()
    const itemToTest = 1
    const sortedArr = iteratorToArr(testSelectionSort.sort([itemToTest]))
    expect(sortedArr).toStrictEqual([itemToTest])
  })
  it("sort array", () => {
    const testSelectionSort = new SelectionSort()
    const sortedArr = iteratorToArr(testSelectionSort.sort([3, 2, 1]))
    expect(sortedArr).toStrictEqual([1, 2, 3])
  })

  it("sort array 2", () => {
    const testSelectionSort = new SelectionSort()
    const sortedArr = iteratorToArr(testSelectionSort.sort([3, 5, 6, 2, 1]))
    expect(sortedArr).toStrictEqual([1, 2, 3, 5, 6])
  })

})
