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
}