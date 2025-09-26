/**
 * This module is responsible for drawing a pie on a canvas element with methods to create the circular pie, its slices and style it.
 * It integrates functionalities from DrawPie, ConvertInput, PieBoundaries and StylePie classes.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 1.0.0
 */

import { DrawPie } from "./drawpie.js"
import { ConvertInput } from "./convertinput.js"
import { PieBoundaries } from "./pieboundaries.js"
import { StylePie } from "./stylepie.js"

export class PieMeter {
  #pieCanvas
  #inputConverter
  #pieBoundaries
  #pieStyle

  /**
   * Draws the initial pie that represents 100%.
   * 
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {number} baseValue - The base value converted to 100% and 2π (360 degrees).
   */
  createPie(canvas, baseValue) {
    this.#pieCanvas = new DrawPie(canvas)
    this.#inputConverter = new ConvertInput(baseValue)
    this.#pieBoundaries = new PieBoundaries()
    this.#pieStyle = new StylePie()

this.#drawPie()
  }

  /**
   * Add a value, convert it to percentage and angles and repaint the pie.
   * 
   * @param {number} inputValue - The input value from the user.
   */
  createSlice(inputValue) {
    this.#inputConverter.addInput(inputValue)
this.#drawPie()
  }

  /**
   * Set the boundaries in percentage for when the pie will change state.
   * Repaint the pie.
   * 
   * @param {number} warningBoundary - The boundary for when the state will change from "ok" to "warning".
   * @param {number} dangerBoundary - The boundary for when the state will change from "warning" to "danger".
   */
  addPieBoundaries(warningBoundary, dangerBoundary) {
    this.#pieBoundaries.warning = warningBoundary
    this.#pieBoundaries.danger = dangerBoundary
this.#drawPie()
  }

  /**
   * Set colour of the pie. Repaint the pie.
   * 
   * @param {string} colour - The colour of the pie.
   */
  addPieColour(colour) {
    this.#pieStyle.pieColour = colour
this.#drawPie()
  }

  /**
   * Set colour for the slice that will be represented as a "removed" piece of the pie.
   * Repaint the pie.
   * 
   * @param {string} colour - The colour of the created slice.
   */
  addSliceColour(colour) {
    this.#pieStyle.sliceColour = colour
    this.#drawPie()    
  }

  /**
   * Set colours for the boundaries. Repaint the pie.
   * 
   * @param {string} warningColour - The colour of the remaining pie when reaching "warning".
   * @param {string} dangerColour - The colour of the remaining pie when reaching "danger".
   */
  addPieBoundariesColours(warningColour, dangerColour) {
    this.#pieStyle.warningColour = warningColour
    this.#pieStyle.dangerColour = dangerColour
    this.#drawPie()
  }

  /**
   * Collects and return the current settings and state of the pie.
   * Repaint the pie.
   *
   * @returns {Object} - An object with current colour settings, pie boundaries and values.
   */
  getPieInfo() {
    return {
  pieColour: this.#pieStyle.pieColour,
  sliceColour: this.#pieStyle.sliceColour,
  warningBoundary: this.#pieBoundaries.warning,
  dangerBoundary: this.#pieBoundaries.danger, 
  warningBoundaryColour: this.#pieStyle.warningColour,
  dangerBoundaryColour: this.#pieStyle.dangerColour,
  remainingPercent: this.#inputConverter.remainingPercent
    }
  }

  /**
   * This method draws the pie and its remaining slice based on the current state of the pie meter.
   * It reads the start angle in radians and remaining percentage from the ConvertInput instance,
   * setting the colour for the remaining pie using the StylePie instance and 
   * uses the DrawPie instance to render the pie and its slices on the canvas.
   */
  #drawPie() {
    const startAngle = this.#inputConverter.startAngle
    const remainingPercent = this.#inputConverter.remainingPercent
    const remainingPieColour = this.#pieStyle.getPieStyle(remainingPercent, this.#pieBoundaries)

    this.#pieCanvas.createPie(this.#pieStyle.sliceColour)

    // Draw the arc starting at startAngle to 2π (360 degrees) with remaining colour.
    if (startAngle < 2 * Math.PI) {
      this.#pieCanvas.createSlice({
        sliceStartAngle: startAngle,
        sliceEndAngle: 2 * Math.PI,
        sliceColour: remainingPieColour,
      })
    }
  }
}
