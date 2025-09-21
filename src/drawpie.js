/**
 * This module exports the DrawPie class that is used to draw a circular pie chart on a canvas element.
 * The class provides methods to create the pie chart and its slices.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class DrawPie {
  #canvas
  #ctx

  /**
   * Creates an instance of the DrawPie class.
   * Initializes the canvas and its 2D rendering context.
   *
   * @param {HTMLCanvasElement} canvasEl - The canvas element to draw on.
   */
  constructor(canvasEl) {
    this.#canvas = canvasEl
    this.#ctx = canvasEl.getContext("2d")
  }

  /**
   * Draws a filled circle on the canvas.
   * The circle is always centered in the canvas.
   */
  createPie() {
    this.#ctx.beginPath();

    const centerXCoord = this.#canvas.width / 2
    const centerYCoord = this.#canvas.height / 2

    const canvasRadie = (Math.min(this.#canvas.width, this.#canvas.height) / 2) - 10
    const firstAngle = 0
    const lastAngle = 2 * Math.PI

    this.#ctx.arc(
      centerXCoord,
      centerYCoord,
      canvasRadie,
      firstAngle,
      lastAngle
    )

    this.#ctx.closePath()
    this.#ctx.strokeStyle = "#000000"
    this.#ctx.fillStyle = "#d4d4d4ff"
    this.#ctx.fill()
    this.#ctx.stroke()
  }

  /**
   * Draws a slice of the pie chart on the canvas based on the provided parameters.
   *
   * @param {Object} - The parameters for the slice.
   * @param {number} sliceStartAngle - The starting angle of the slice.
   * @param {number} sliceEndAngle - The ending angle of the slice.
   */
  createSlice({sliceStartAngle, sliceEndAngle}) {
    this.#ctx.beginPath()

    const centerXCoord = this.#canvas.width / 2
    const centerYCoord = this.#canvas.height / 2
    const canvasRadie = (Math.min(this.#canvas.width, this.#canvas.height) / 2) - 10

    this.#ctx.moveTo(centerXCoord, centerYCoord)
    this.#ctx.arc(
      centerXCoord,
      centerYCoord,
      canvasRadie,
      sliceStartAngle,
      sliceEndAngle
    )
    this.#ctx.closePath()
    this.#ctx.fillStyle = "#ff0000ff"
    this.#ctx.fill()
    this.#ctx.stroke()
  }
}
