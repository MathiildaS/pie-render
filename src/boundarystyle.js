/**
 * This class handles the visual appearance of the pie for when reaching a boundary.
 * It connects the state of the pie to a colour.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class BoundaryStyle {
  #okColour = "#66d675"
  #warningColour = "#ffff00"
  #dangerColour = "#ff0000"

  /**
   * Gets the colour of the pie for when the state is 'ok'.
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
    this.colourValidation(hexColour)
    this.#okColour = hexColour
  }

  /**
   * Gets the warning colour.
   */
  get warningColour() {
    return this.#warningColour
  }

  /**
   * Sets the warning colour for when the pie is in a warning state.
   * @param {string} hexColour - The colour value.
   */
  set warningColour(hexColour) {
    this.colourValidation(hexColour)
    this.#warningColour = hexColour
  }

  /**
   * Gets the danger colour.
   */
  get dangerColour() {
    return this.#dangerColour
  }

  /**
   * Sets the danger colour for when the pie is in a danger state.
   * @param {string} hexColour - The colour value.
   */
  set dangerColour(hexColour) {
    this.colourValidation(hexColour)
    this.#dangerColour = hexColour
  }

  /**
   * Gets the style of the pie based on the current value and boundaries.
   *
   * @param {number} remainingPercentValue - The remaining percentage value of the pie.
   * @param {PieBoundaries} pieBoundaries - The PieBoundaries instance containing values of pie boundaries.
   * @returns {string} pieColour - The colour of the remaining pie.
   */
  getRemainingColour(remainingPercentValue, pieBoundaries) {
    let pieState = pieBoundaries.getBoundaries(remainingPercentValue)
    let pieColour = this.#okColour

    if (pieState === "danger") {
      pieColour = this.#dangerColour
    } else if (pieState === "warning") {
      pieColour = this.#warningColour
    }

    return pieColour
  }

    colourValidation(colour) {
    const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
    if (typeof colour !== "string") {
      throw new Error("The value must be a string")
    } else if (!hex.test(colour.trim())) {
      throw new Error("Use a valid hex colour of the type #RGB, #RGBA, #RRGGBB, #RRGGBBAA")
    }
  }
}
