import { describe, it, expect, test } from "vitest";
import { BubbleSort } from "../algorithms/bubbleSort";

const iteratorToArr = (iterator: Iterator<{ arr: number[], index: number }>) => {
  let result = iterator.next()
  while (!iterator.next().done) {
    result = iterator.next()
  }
  return result.value.arr // return the last value(sorted arr)
}
describe("BubbleSort", () => {

  it("sort empty array", () => {
    const testBubbleSort = new BubbleSort()
    const sortedArr = iteratorToArr(testBubbleSort.sort([]))
    expect(sortedArr).toStrictEqual([])
  })

  it("if one item passed", () => {
    const testBubbleSort = new BubbleSort()
    const itemToTest = 1
    const sortedArr = iteratorToArr(testBubbleSort.sort([itemToTest]))
    expect(sortedArr).toStrictEqual([itemToTest])
  })
  it("sort array", () => {
    const testBubbleSort = new BubbleSort()
    const sortedArr = iteratorToArr(testBubbleSort.sort([3, 2, 1]))
    expect(sortedArr).toStrictEqual([1, 2, 3])
  })

  it("sort array 2", () => {
    const testBubbleSort = new BubbleSort()
    const sortedArr = iteratorToArr(testBubbleSort.sort([3, 5, 6, 2, 1]))
    expect(sortedArr).toStrictEqual([1, 2, 3, 5, 6])
  })

})
