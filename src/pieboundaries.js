/**
 * @file A module for the PieBoundaries class. This class manages the warning and danger boundaries for the pie.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class PieBoundaries {
  #warningBoundary = 50
  #dangerBoundary = 20

  /**
   * Returns the warning boundary value.
   */
  get warningInPercent() {
    return this.#warningBoundary
  }

  /**
   * Validates and sets the warning boundary value.
   */
  set warningInPercent(number) {
    this.#boundaryValidation(number)
    if (number <= this.#dangerBoundary) {
      throw new Error("The warning boundary can not be less than or equal to the danger boundary")
    }
    this.#warningBoundary = number
  }

  /**
   * Gets the danger boundary value.
   */
  get dangerInPercent() {
    return this.#dangerBoundary
  }

  /**
   * Sets the danger boundary value.
   */
  set dangerInPercent(number) {
    this.#boundaryValidation(number)
    if (number >= this.#warningBoundary) {
      throw new Error("The danger boundary can not be larger than or equal to the warning boundary")
    }
    this.#dangerBoundary = number
  }

  /**
   * Determines the state of the pie based on the remaining percentage and the set boundaries.
   *
   * @param {number} remainingPercent - The remaining percentage of the pie.
   * @return {string} - The state of the pie.
   */
  getStateOfPie(remainingPercent) {
    this.#percentageValidation(remainingPercent)
    if (remainingPercent <= this.#dangerBoundary) {
      return "danger"
    } else if (remainingPercent <= this.#warningBoundary) {
      return "warning"
    } else {
      return "ok"
    }
  }

  /**
   * Validates that the input is of the type 'number', neither positive Infinity, negative Infinity or NaN.
   * The number must be larger than zero.
   *
   * @param {number} number - The number to validate.
   * @throws {Error} If the input is not of the type number, positive Infinity, negative Infinity, NaN, zero or less than zero.
   */
  #boundaryValidation(number) {
    if (typeof number !== "number" || !Number.isFinite(number)) {
      throw new Error("The value must be a number, not positive Infinity, not negative Infinity or NaN.")
    }
    if (number <= 0) {
      throw new Error("The boundary must be larger than zero")
    }
    if (number > 100) {
      throw new Error("The boundary can not be larger than 100%")
    }
  }

  /**
   * Validates that the input is of the type 'number', neither positive Infinity, negative Infinity or NaN.
   * The number must be larger than zero.
   *
   * @param {number} number - The number to validate.
   * @throws {Error} If the input is not of the type number, positive Infinity, negative Infinity, NaN or less than zero.
   */
  #percentageValidation(number) {
    if (typeof number !== "number" || !Number.isFinite(number)) {
      throw new Error("The value must be a number, not positive Infinity, not negative Infinity or NaN.")
    }
    if (number < 0) {
      throw new Error("The number can not be less than zero.")
    }
    if (number > 100) {
      throw new Error("The number can not be larger than 100%")
    }
  }
}
