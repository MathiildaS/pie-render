/**
 * This class manages the warning and danger boundaries for the pie chart.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class PieBoundaries {
  #warning
  #danger

  /**
   * Creates an instance of the PieBoundaries class with default values.
   */
  constructor() {
    this.#warning = 50
    this.#danger = 20
  }

  /**
   * Gets the warning boundary value.
   */
  get warning() {
    return this.#warning
  }

  /**
   * Validates and sets the warning boundary value.
   */
  set warning(value) {
    if (value <= 0 || isNaN(value)) {
    throw new Error("The given boundary must be a number larger than zero")
    }

    this.#warning = value
  }

  /**
   * Gets the danger boundary value.
   */
  get danger() {
    return this.#danger
  }

  /**
   * Sets the danger boundary value.
   */
  set danger(value) {
    if (value <= 0 || isNaN(value)) {
    throw new Error("The given boundary must be a number larger than zero")
    }
    this.#danger = value
  }

  /**
   * Determines the state of the pie based on the remaining percentage and the set boundaries.
   *
   * @param {number} remainingPercent - The remaining percentage of the pie.
   * @return {string} - The state of the pie.
   */
  getBoundaries(remainingPercent) {
    if (remainingPercent <= this.#danger) {
      return 'danger'
    } else if (remainingPercent <= this.#warning) {
      return 'warning'
    } else {
      return 'ok'
    }
  }
}