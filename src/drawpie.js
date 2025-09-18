/**
 * This class handles the drawing of a circle in canvas.
 *
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class DrawPie {
  #canvas
  #ctx

  constructor(canvasEl) {
    this.#canvas = canvasEl
    this.#ctx = canvasEl.getContext("2d")
  }

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

  createSlice(startAngle, endAngle) {
    this.#ctx.beginPath();
  }
}
