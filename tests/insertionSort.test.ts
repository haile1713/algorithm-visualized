import { describe, it, expect, test } from "vitest";
import { InsertionSort } from "../algorithms/insertionSort";
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
describe("BubbleSort", () => {

  it("sort empty array", () => {
    const testInsertionSort = new InsertionSort()
    const sortedArr = iteratorToArr(testInsertionSort.sort([]))
    expect(sortedArr).toStrictEqual([])
  })

  it("if one item passed", () => {
    const testInsertionSort = new InsertionSort()
    const itemToTest = 1
    const sortedArr = iteratorToArr(testInsertionSort.sort([itemToTest]))
    expect(sortedArr).toStrictEqual([itemToTest])
  })
  it("sort array", () => {
    const testInsertionSort = new InsertionSort()
    const sortedArr = iteratorToArr(testInsertionSort.sort([3, 2, 1]))
    expect(sortedArr).toStrictEqual([1, 2, 3])
  })

  it("sort array 2", () => {
    const testInsertionSort = new InsertionSort()
    const sortedArr = iteratorToArr(testInsertionSort.sort([3, 5, 6, 2, 1]))
    expect(sortedArr).toStrictEqual([1, 2, 3, 5, 6])
  })

})
