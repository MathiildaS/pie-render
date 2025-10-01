/**
 * @file A module for the BoundaryStyle class. Handles the visual appearance of the pie for when reaching a boundary.
 * It connects the state of the pie to a colour.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

import { PieBoundaries } from "./pieboundaries.js"

export class BoundaryStyle {
  #pieBoundaries
  #okColour = "#66d675"
  #warningColour = "#ffff00"
  #dangerColour = "#ff0000"

  /**
   * Initializes a new BoundaryStyle with a PieBoundaries instance.
   */
  constructor() {
    this.#pieBoundaries = new PieBoundaries()
  }

  /**
   * Returns the colour of the pie for when the state is 'ok'.
   */
  get okColour() {
    return this.#okColour
  }

  /**
   * Sets the colour of the pie for when the state is 'ok'.
   *
   * @param {string} hexColour - The colour value.
   */
  set okColour(hexColour) {
    this.#colourValidation(hexColour)
    this.#okColour = hexColour
  }

  /**
   * Returns the colour of the pie for when the state is 'warning'.
   */
  get warningColour() {
    return this.#warningColour
  }

  /**
   * Sets the warning colour for when the pie is in a warning state.
   *
   * @param {string} hexColour - The colour value.
   */
  set warningColour(hexColour) {
    this.#colourValidation(hexColour)
    this.#warningColour = hexColour
  }

  /**
   * Returns the colour of the pie for when the state is 'danger'.
   */
  get dangerColour() {
    return this.#dangerColour
  }

  /**
   * Sets the danger colour for when the pie is in a danger state.
   *
   * @param {string} hexColour - The colour value.
   */
  set dangerColour(hexColour) {
    this.#colourValidation(hexColour)
    this.#dangerColour = hexColour
  }

  /**
   * Gets the colour of the pie based on remaining percent of base value.
   *
   * @param {number} remainingPercentValue - The remaining percentage value of the pie.
   * @returns {string} The colour to set the pie.
   */
  getRemainingPieColour(remainingPercentValue) {
    let pieState = this.#pieBoundaries.getStateOfPie(remainingPercentValue)
    let pieColour = this.#okColour

    if (pieState === "danger") {
      pieColour = this.#dangerColour
    } else if (pieState === "warning") {
      pieColour = this.#warningColour
    }

    return pieColour
  }

  /**
   * Validates that the input is of the type 'string' and that the colour is written
   * as a hex colour, for example #000000.
   *
   * @param {string} colour - The colour to validate.
   */
  #colourValidation(colour) {
    const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
    if (typeof colour !== "string") {
      throw new Error("The value must be a string")
    }
    if (!hex.test(colour.trim())) {
      throw new Error(
        "Use a valid hex colour of the type #RGB, #RGBA, #RRGGBB, #RRGGBBAA"
      )
    }
  }
}
