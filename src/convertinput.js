/**
 * This module provides a class to convert input values into percentages and angles for pie chart slices.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class ConvertInput {
  #baseValue
  #inputValue
  #startAngle = 0

  /**
   * This constructor initializes the class with a base value and validates it.
   *
   * @param {number} baseValue - The value that represents 100%.
   */
  constructor(baseValue) {
    this.#baseValue = baseValue

    if (this.#baseValue <= 0 || isNaN(this.#baseValue)) {
      throw new Error("The given base value must be a number larger than zero")
    }
  }

  /**
   * This method converts an input value to a percentage based on the base value.
   *
   * @param {number} inputValue - The value to be converted to percentage.
   * @returns {number} percentValue - The value converted to percentage.
   */
  #convertToPercent(inputValue) {
    this.#inputValue = inputValue
    const percentValue = (this.#inputValue / this.#baseValue) * 100
    return percentValue
  }

  /**
   * This method converts a percentage value to an angle in radians.
   *
   * @param {number} percentValue - The value in percentage to be converted to angle.
   * @returns {number} angleValue - The value converted to angle in radians.
   */
  #convertToAngle(percentValue) {
    const angleValue = (percentValue / 100) * 2 * Math.PI
    return angleValue
  }

  /**
   * This method calculates the start and end angles for a slice based on the given percentage value.
   * Handles cases where the end angle exceeds the maximum angle.
   *
   * @param {number} percentValue - The value in percentage to be converted to slice angles.
   * @returns { sliceStartAngle: number, endAngle: number } - The start and end angles of the slice.
   */
  #calculateSliceAngles(percentValue) {
    const sliceAngle = this.#convertToAngle(percentValue)
    const sliceStartAngle = this.#startAngle
    let endAngle = sliceStartAngle + sliceAngle

    if (endAngle > 2 * Math.PI) {
      endAngle = 2 * Math.PI
    }

    this.#startAngle = endAngle
    return { sliceStartAngle, endAngle }
  }

  /**
   * This method adds a new input value and calculates the corresponding slice angles.
   * Validates the input value to ensure it is a number larger than zero.
   *
   * @param {number} inputValue - The value to be added.
   * @returns { sliceStartAngle: number, endAngle: number, percentValue: number } - The start and end angles of the slice, along with the percentage value.
   */
  addInput(inputValue) {
    if (isNaN(inputValue) || inputValue < 0) {
      throw new Error("The given input value must be a number larger than zero")
    }

    this.#inputValue = inputValue
    const percentValue = this.#convertToPercent(inputValue)
    const { sliceStartAngle, endAngle } = this.#calculateSliceAngles(percentValue)

    return { sliceStartAngle, endAngle, percentValue }
  }
}
