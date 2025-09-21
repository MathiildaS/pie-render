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
   * Determines the state of the pie based on the current percentage value.
   *
   * @param {number} percentValue - The current value in percentage.
   * @return {string} - The state of the pie: 'ok', 'warning' or 'danger'.
   */
  getBoundaries(percentValue) {
    if (percentValue >= this.#danger) {
      return 'danger'
    } else if (percentValue >= this.#warning) {
      return 'warning'
    } else {
      return 'ok'
    }
  }
}