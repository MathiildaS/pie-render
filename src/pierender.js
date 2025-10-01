/**
 * @file A module for the PieRender class. Responsible for drawing a pie on a canvas element with methods to create the circle, its slices and change its appearance.
 * It integrates functionalities from the PieCanvas, InputConverter, PieBoundaries and BoundaryStyle classes.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 1.0.0
 */

import { PieCanvas } from "./piecanvas.js"
import { InputConverter } from "./inputconverter.js"
import { PieBoundaries } from "./pieboundaries.js"
import { BoundaryStyle } from "./boundarystyle.js"

export class PieRender {
  #pieCanvas
  #inputConverter
  #pieBoundaries
  #boundaryStyle
  #displayText = false
  #createdSlices = []

  /**
   * Initializes a new instance of the PieRender class. Draws the initial pie with provided base value that represents 100%.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {number} baseValue - The base value representing 100% and 2π (360 degrees).
   */
  constructor(canvas, baseValue) {
    this.#pieCanvas = new PieCanvas(canvas)
    this.#inputConverter = new InputConverter(baseValue)
    this.#pieBoundaries = new PieBoundaries()
    this.#boundaryStyle = new BoundaryStyle(this.#pieBoundaries)
    this._drawPie()
  }

  /**
   * Takes a value, converts it to percent, to angles and then draws it on the canvas.
   * Stores the values of the created slice.
   *
   * @param {number} inputValue - The input value from the user.
   */
  createSlice(inputValue) {
    try {
      this.#inputConverter.addInput(inputValue)
      this.#storeCreatedSlice()
      this._drawPie()
    } catch (error) {
      console.error("An error occured when creating the slice: " + error.message)
    }
  }

  /**
   * Sets the boundaries in percent for when the pie will change its state.
   *
   * @param {number} warningpercent - The percent value for when the state will change from "ok" to "warning".
   * @param {number} dangerpercent - The percent value for when the state will change from "warning" to "danger".
   */
  setPieBoundaries(warningPercent, dangerPercent) {
    try {
      if (warningPercent !== undefined && warningPercent !== null) {
        this.#pieBoundaries.warningBoundaryInPercent = warningPercent
      }
      if (dangerPercent !== undefined && dangerPercent !== null) {
        this.#pieBoundaries.dangerBoundaryInPercent = dangerPercent
      }
      this._drawPie()
    } catch (error) {
      console.error("An error occured when setting the values of the boundaries:" + error.message)
    }
  }

  /**
   * Sets the base colour of the pie.
   *
   * @param {string} hexColour - The colour of the pie in a hex colour code.
   */
  setPieColour(hexColour) {
    try {
      this.#boundaryStyle.okColour = hexColour
      this._drawPie()
    } catch (error) {
      console.error("An error occured when setting the colour of the pie: " + error.message)
    }
  }

  /**
   * Sets the colour of a created slice that will be represented as a "removed" piece of the pie.
   *
   * @param {string} hexColour - The colour of the created slice in a hex colour code.
   */
  setSliceColour(hexColour) {
    try {
      this.#pieCanvas.sliceColour = hexColour
      this._drawPie()
    } catch (error) {
      console.error("An error occured when setting the colour of the slice: " + error.message
      )
    }
  }

  /**
   * Sets the colours for the 'warning' and 'danger' state of the pie.
   *
   * @param {string} warningColour - The colour of the remaining pie when reaching "warning" in a hex colour code.
   * @param {string} dangerColour - The colour of the remaining pie when reaching "danger" in a hex colour code.
   */
  setStateColours(warningColour, dangerColour) {
    try {
      this.#boundaryStyle.warningColour = warningColour
      this.#boundaryStyle.dangerColour = dangerColour
      this._drawPie()
    } catch (error) {
      console.error("An error occured when setting the colours of the boundaries: " + error.message)
    }
  }

  /**
   * Determines whether to display text on canvas or not.
   *
   * @param {boolean} display - true to display or false.
   */
  displayPercentText(display = false) {
    if (display) {
      this.#displayText = true
      this._drawPie()
    } else {
      this.#displayText = false
      this._drawPie()
    }
  }

  /**
   * Sets the colour of the text on the canvas. 
   *
   * @param {string} hexColour - The colour of the font in hex colour code.
   */
  setFontColour(hexColour) {
    try {
      this.#pieCanvas.fontColour = hexColour
      this._drawPie()
    } catch (error) {
      console.error("An error occured when setting the colour of the text: " + error.message)
    }
  }

  /**
   * Sets the size of the text drawn on the canvas.
   *
   * @param {number} fontSize - The size of the text in px.
   */
  setFontSize(fontSize) {
    try {
      this.#pieCanvas.fontSize = fontSize
      this._drawPie()
    } catch (error) {
      console.error("An error occured when setting the size of the text: " + error.message)
    }
  }

  /**
   * Returns the current state of the pie.
   *
   * @returns {Object} - An object with current colour settings, pie boundaries, angles and remaining values.
   */
  getCurrentStateOfPie() {
    return {
      baseValue: this.#inputConverter.baseValue,
      totalAddedInputValues: this.#inputConverter.totalAddedInputValues,
      remainingPercent: this.#inputConverter.remainingPercent,
      remainingValue: this.#inputConverter.remainingBaseValue,
      stateOfPie: this.#pieBoundaries.getStateOfPie(this.#inputConverter.remainingPercent),
      currentColourOfPie: this.#boundaryStyle.getRemainingPieColour(this.#inputConverter.remainingPercent),
      sliceColour: this.#pieCanvas.sliceColour,
      warningBoundaryPercent: this.#pieBoundaries.warningBoundaryInPercent,
      dangerBoundaryPercent: this.#pieBoundaries.dangerBoundaryInPercent,
      okBoundaryColour: this.#boundaryStyle.okColour,
      warningBoundaryColour: this.#boundaryStyle.warningColour,
      dangerBoundaryColour: this.#boundaryStyle.dangerColour,
      displayText: this.#displayText,
      fontColour: this.#pieCanvas.fontColour,
      fontSize: this.#pieCanvas.fontSize,
    }
  }

  /**
   * Draws the pie with its base, all created slices and text and is being called after any change of state.
   * The colour is determined by the remaining percent and current boundaries.
   */
  _drawPie() {
    try {
      const remainingPercent = this.#inputConverter.remainingPercent
      this.#pieCanvas.colourOfCircle = this.#boundaryStyle.getRemainingPieColour(remainingPercent)
      this.#pieCanvas.drawCircle()
      this.#drawSlice()

      if (this.#displayText) {
        this.#setRemainingPercentText()
      }
    } catch (error) {
      console.error("An error occured when drawing the pie on the canvas: " + error.message)
    }
  }

  /**
   * Draws all stored slices on the canvas.
   */
  #drawSlice() {
    this.#createdSlices.forEach(({ sliceColour, sliceStartAngle, sliceEndAngle }) => {
        const colourToUse = sliceColour ?? this.#pieCanvas.sliceColour
        this.#pieCanvas.sliceColour = colourToUse
        this.#pieCanvas.sliceStartAngle = sliceStartAngle
        this.#pieCanvas.sliceEndAngle = sliceEndAngle
        this.#pieCanvas.drawSlice()
      }
    )
  }

  /**
   * Collects a created slice and stores it.
   */
  #storeCreatedSlice() {
    const pieSlice = {
      sliceStartAngle: this.#inputConverter.sliceStartAngle,
      sliceEndAngle: this.#inputConverter.sliceEndAngle,
      sliceColour: undefined,
    }
    this.#createdSlices.push(pieSlice)
  }

  /**
   * Sets the text value on canvas to the remaining percent value.
   */
  #setRemainingPercentText() {
    try {
      this.#pieCanvas.remainingValue = this.#inputConverter.remainingPercent
      this.#pieCanvas.displayTextOnCanvas()
    } catch (error) {
      console.error("An error occured when drawing the text on canvas: " + error.message)
    }
  }
}
