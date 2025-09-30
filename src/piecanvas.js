/**
 * This class draws a full circle on an HTML canvas element in a default or custom colour.
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
  #remainingValueText = 100
  #fontSize = 35
  #fontColour = "#8ab864"

  /**
   * Initializes a new instance of the PieCanvas class, the canvas element and the 2D rendering context of it
   *
   * @param {HTMLCanvasElement} canvasElement - The canvas element to draw the circle and slices on.
   */
  constructor(canvasElement) {
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
  createCircle() {
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
  createSlice() {
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
    this.#ctx.fillText(`${this.#remainingValueText}%`, 10, 10)
    this.#ctx.strokeStyle = "#000000"
    this.#ctx.lineWidth = 2
    this.#ctx.strokeText(`${this.#remainingValueText}%`, 10, 10)
  }

  get colourOfCircle() {
    return this.#colourOfCircle
  }

  set colourOfCircle(hexColour) {
    this.colourValidation(hexColour)
    this.#colourOfCircle = hexColour
  }

  get sliceStartAngle() {
    return this.#sliceStartAngle
  }

  set sliceStartAngle(startAngleValueInRadians) {
    this.numberValidation(startAngleValueInRadians)
    this.#sliceStartAngle = startAngleValueInRadians
  }

  get sliceEndAngle() {
    return this.#sliceEndAngle
  }

  set sliceEndAngle(endAngleValueInRadians) {
    this.numberValidation(endAngleValueInRadians)
    this.#sliceEndAngle = endAngleValueInRadians
  }

  get sliceColour() {
    return this.#sliceColour
  }

  set sliceColour(hexColour) {
    this.colourValidation(hexColour)
    this.#sliceColour = hexColour
  }

  get remainingValueText() {
    return this.#remainingValueText
  }

  set remainingValueText(valueInPercent) {
    this.numberValidation(valueInPercent)
    this.#remainingValueText = valueInPercent
  }

  get fontSize() {
    return this.#fontSize
  }

  set fontSize(fontSizeValue) {
    this.numberValidation(fontSizeValue)
    this.#fontSize = fontSizeValue
  }

  get fontColour() {
    return this.#fontColour
  }

  set fontColour(hexValue) {
    this.colourValidation(hexValue)
    this.#fontColour = hexValue
  }

  colourValidation(colour) {
    const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i
    if (typeof colour !== "string") {
      throw new Error("The value must be a string")
    } else if (!hex.test(colour.trim())) {
      throw new Error("Use a valid hex colour of the type #RGB, #RGBA, #RRGGBB, #RRGGBBAA")
    }
  }

  numberValidation(number) {
    if (typeof number !== "number" || !Number.isFinite(number)) {
      throw new Error("The value must be a number")
    } else if (number < 0) {
      throw new Error("The value must be larger than zero")
    }
  }

  /**
   * Clears the canvas.
   */
  #clearCanvas() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }
}
