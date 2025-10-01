/**
 * @file A module for the PieCanvas class. Draws a full circle on an HTML canvas element in a default or custom colour.
 * One or several slices in a default or custom colour can be painted on top of the circle to create the illusion of a pie chart.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 1.0.0
 */

export class PieCanvas {
  #canvas
  #ctx
  #xCoord
  #yCoord
  #radius
  #margin = 15
  #colourOfCircle = "#8ab864"
  #sliceStartAngle = 0
  #sliceEndAngle = 0
  #sliceColour = "#ffffff"
  #remainingValue = 100
  #fontSize = 35
  #fontColour = "#8ab864"

  /**
   * Initializes a new instance of the PieCanvas class, the canvas element and the 2D rendering context of it
   *
   * @param {HTMLCanvasElement} canvasElement - The canvas element to draw on.
   * @throws {Error} If a HTMLCanvasElement is not provided.
   */
  constructor(canvasElement) {
    if (!(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error("You must provide a valid HTMLCanvasElement")
    }
    this.#canvas = canvasElement
    this.#ctx = canvasElement.getContext("2d")
  }

  /**
   * Calculates the coordinates of the center of the HTML canvas element.
   * Calculates the radius with 15px margin from the frame of the canvas.
   */
  #centerOfCanvas() {
    this.#xCoord = this.#canvas.width / 2
    this.#yCoord = this.#canvas.height / 2
    this.#radius = Math.min(this.#canvas.width, this.#canvas.height) / 2 - this.#margin
  }

  /**
   * Clears the canvas before drawing the circle on it. Draws the circle at the center of the canvas.
   * Fills the circle with default or custom colour.
   */
  drawCircle() {
    this.#clearCanvas()
    this.#centerOfCanvas()

    const firstAngle = 0
    const lastAngle = 2 * Math.PI

    this.#ctx.save()
    this.#ctx.beginPath()
    this.#ctx.shadowColor = "#00000065"
    this.#ctx.shadowBlur = 10
    this.#ctx.shadowOffsetX = 0
    this.#ctx.shadowOffsetY = 2

    this.#ctx.arc(this.#xCoord, this.#yCoord, this.#radius, firstAngle, lastAngle)

    this.#ctx.closePath()
    this.#ctx.strokeStyle = "#050505ff"
    this.#ctx.lineWidth = 3
    this.#ctx.fillStyle = this.#colourOfCircle
    this.#ctx.fill()
    this.#ctx.stroke()
    this.#ctx.restore()
  }

  /**
   * Draws a slice on the canvas.
   */
  drawSlice() {
    this.#centerOfCanvas()

    this.#ctx.beginPath()
    this.#ctx.moveTo(this.#xCoord, this.#yCoord)
    this.#ctx.arc(this.#xCoord, this.#yCoord, this.#radius, this.#sliceStartAngle, this.#sliceEndAngle)
    this.#ctx.closePath()

    this.#ctx.fillStyle = this.#sliceColour
    this.#ctx.fill()
    this.#ctx.strokeStyle = this.#sliceColour
    this.#ctx.lineWidth = 1
    this.#ctx.stroke()
  }

  /**
   * Draws text on the canvas.
   */
  displayTextOnCanvas() {
    this.#ctx.font = `${this.#fontSize}px Georgia`
    this.#ctx.textAlign = "left"
    this.#ctx.textBaseline = "top"
    this.#ctx.fillStyle = this.#fontColour
    this.#ctx.fillText(`${this.#remainingValue}%`, 10, 10)
    this.#ctx.strokeStyle = "#000000"
    this.#ctx.lineWidth = 2
    this.#ctx.strokeText(`${this.#remainingValue}%`, 10, 10)
  }

  /**
   * Returns the colour of the pie.
   */
  get colourOfCircle() {
    return this.#colourOfCircle
  }

  /**
   * Sets the colour to fill the circle.
   *
   * @param {string} hexColour - The colour value.
   */
  set colourOfCircle(hexColour) {
    this.#colourValidation(hexColour)
    this.#colourOfCircle = hexColour
  }

  /**
   * Returns the start angle of created slice.
   */
  get sliceStartAngle() {
    return this.#sliceStartAngle
  }

  /**
   * Sets the value of where to begin a slice.
   *
   * @param {number} startAngleValueInRadians - The value of the start angle of a slice.
   */
  set sliceStartAngle(startAngleValueInRadians) {
    this.#numberValidation(startAngleValueInRadians)
    this.#sliceStartAngle = startAngleValueInRadians
  }

  /**
   * Returns the end angle of created slice.
   */
  get sliceEndAngle() {
    return this.#sliceEndAngle
  }

  /**
   * Sets the value of where to end a slice.
   *
   * @param {number} endAngleValueInRadians - The value of the end angle of a slice.
   */
  set sliceEndAngle(endAngleValueInRadians) {
    this.#numberValidation(endAngleValueInRadians)
    this.#sliceEndAngle = endAngleValueInRadians
  }

  /**
   * Returns the colour of a slice.
   */
  get sliceColour() {
    return this.#sliceColour
  }

  /**
   * Sets the colour to fill a slice.
   *
   * @param {string} hexColour - The colour value.
   */
  set sliceColour(hexColour) {
    this.#colourValidation(hexColour)
    this.#sliceColour = hexColour
  }

  /**
   * Returns the number that will be transformed to text on the canvas.
   */
  get remainingValue() {
    return this.#remainingValue
  }

  /**
   * Sets the number that will be transformed to text on the canvas.
   *
   * @param {number} valueInPercent - The number to transform to text.
   */
  set remainingValue(valueInPercent) {
    this.#numberValidation(valueInPercent)
    this.#remainingValue = valueInPercent
  }

  /**
   * Returns the size of the text on the canvas.
   */
  get fontSize() {
    return this.#fontSize
  }

  /**
   * Sets the font size of the text on the canvas.
   *
   * @param {number} fontSizeInPx - The number of the size.
   */
  set fontSize(fontSizeInPx) {
    this.#numberValidation(fontSizeInPx)
    this.#fontSize = fontSizeInPx
  }

  /**
   * Returns the colour of the text on the canvas.
   */
  get fontColour() {
    return this.#fontColour
  }

  /**
   * Sets the font colour of the text on the canvas.
   *
   * @param {string} hexColour - The colour value.
   */
  set fontColour(hexColour) {
    this.#colourValidation(hexColour)
    this.#fontColour = hexColour
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
      throw new Error("Use a valid hex colour of the type #RGB, #RGBA, #RRGGBB, #RRGGBBAA")
    }
  }

  /**
   * Validates that the input is of the type 'number', neither positive Infinity, negative Infinity or NaN.
   * The number must be equal to or larger than zero.
   *
   * @param {number} number - The number to validate.
   * @throws {Error} If the input is not of the type number, positive Infinity, negative Infinity, NaN or less than zero.
   */
  #numberValidation(number) {
    if (typeof number !== "number" || !Number.isFinite(number)) {
      throw new Error("The value must be a number")
    }
    if (number < 0) {
      throw new Error("The value can not be less than zero")
    }
  }

  /**
   * Clears the canvas.
   */
  #clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }
}
