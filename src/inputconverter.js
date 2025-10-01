/**
 * @file A module for the class InputConverter. Convert input values into percentages and angles that can be used to create slices of the pie.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class InputConverter {
  #baseValue
  #inputValue = 0
  #startAngle = 0
  #sliceArcAngle = 0
  #sliceStartAngle = 0
  #sliceEndAngle = 0
  #totalAddedInputValues = 0
  #inputInPercent = 0
  #remainingBaseValue
  #remainingPercent = 100

  /**
   * Initializes the InputConverter with a validated base value.
   *
   * @param {number} baseValue - The provided base value.
   */
  constructor(baseValue) {
    this.#numberValidation(baseValue)
    this.#baseValue = baseValue
  }

  /**
   * Returns the base value.
   */
  get baseValue() {
    return this.#baseValue
  }

  /**
   * Converts an input value to a percentage value based on the base value and collects it.
   */
  #convertToPercent() {
    const percentValue = (this.#inputValue / this.#baseValue) * 100
    this.#inputInPercent = percentValue
  }

  /**
   * Converts a percentage value to an arc angle in radians and collects it.
   * 100% = 2π. If #inputInPercent = 50, #sliceArcAngle = π
   */
  #convertToAngle() {
    const angleValue = (this.#inputInPercent / 100) * 2 * Math.PI
    this.#sliceArcAngle = angleValue
  }

  /**
   * Calculates the start and end angles (arc) for an input value that will represent a slice and collects them.
   * Updates the start angle and collects it.
   * Handles cases where the end angle exceeds the maximum angle.
   */
  #calculateSliceAngles() {
    this.#convertToPercent()
    this.#convertToAngle()

    this.#sliceStartAngle = this.#startAngle
    this.#sliceEndAngle = this.#sliceStartAngle + this.#sliceArcAngle

    if (this.#sliceEndAngle > 2 * Math.PI) {
      this.#sliceEndAngle = 2 * Math.PI
    }

    this.#startAngle = this.#sliceEndAngle
  }

  /**
   * Validates the input value. Adds it to the total amount of input values,
   * converts it to percentage and arc angles. Calculates the remaining percentage and value
   * of the base value.
   *
   * @param {number} inputValue - The value to be added.
   */
  addInput(inputValue) {
    this.#numberValidation(inputValue)
    this.#calculateAddedInputValues(inputValue)

    this.#inputValue = inputValue
    this.#calculateSliceAngles()
    this.#calculateRemainingPercent()
    this.#calculateRemainingBaseValue()
  }

  /**
   * Adds the input value and collects the total.
   * Validates the total.
   *
   * @param {number} inputValue - The value to be added to the total.
   * @throws {Error} If the total added values exceed the base value.
   */
  #calculateAddedInputValues(inputValue) {
    const addNewValue = this.#totalAddedInputValues + inputValue
    if (addNewValue > this.#baseValue) {
      throw new Error("The total added value cannot exceed the base value")
    }
    this.#totalAddedInputValues = addNewValue
  }

  /**
   * Calculates the remaining percentage value based on the total added input values and base value and collects it.
   * Clamp to zero.
   */
  #calculateRemainingPercent() {
    this.#remainingPercent = Math.max(
      0,
      100 - (this.#totalAddedInputValues / this.#baseValue) * 100
    )
  }

  /**
   * Calculates the remaining value based on subtraction of the total amount of input values from base value.
   * Clamp to zero.
   */
  #calculateRemainingBaseValue() {
    this.#remainingBaseValue = Math.max(
      0,
      this.#baseValue - this.#totalAddedInputValues
    )
  }

  /**
   * Returns the current input value.
   */
  get inputValue() {
    return this.#inputValue
  }

  /**
   * Returns the remaining percentage value of the base value.
   */
  get remainingPercent() {
    return this.#remainingPercent
  }

  /**
   * Returns the radians for the start of the next arc/slice.
   */
  get startAngle() {
    return this.#startAngle
  }

  /**
   * Returns the arc angle radians of the current slice.
   */
  get sliceArcAngle() {
    return this.#sliceArcAngle
  }

  /**
   * Returns the start angle of the current slice.
   */
  get sliceStartAngle() {
    return this.#sliceStartAngle
  }

  /**
   * Returns the end angle of the current slice.
   */
  get sliceEndAngle() {
    return this.#sliceEndAngle
  }

  /**
   * Returns the total of all added input values.
   */
  get totalAddedInputValues() {
    return this.#totalAddedInputValues
  }

  /**
   * Returns the remaining value of the base value.
   */
  get remainingBaseValue() {
    return this.#remainingBaseValue
  }

  /**
   * Validates that the input is of the type 'number', neither positive Infinity, negative Infinity or NaN.
   * The number must be larger than zero.
   *
   * @param {number} number - The number to validate.
   * @throws {Error} If the input is not of the type number, positive Infinity, negative Infinity, NaN, zero or less than zero.
   */
  #numberValidation(number) {
    if (typeof number !== "number" || !Number.isFinite(number)) {
      throw new Error(
        "The value must be a number, not positive Infinity, not negative Infinity or NaN."
      )
    }
    if (number <= 0) {
      throw new Error("The value must be larger than zero.")
    }
  }
}
