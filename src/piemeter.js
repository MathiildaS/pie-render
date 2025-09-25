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

  createPie(canvas, baseValue) {
    this.#pieCanvas = new DrawPie(canvas)
    this.#inputConverter = new ConvertInput(baseValue)
    this.#pieBoundaries = new PieBoundaries()
    this.#pieStyle = new StylePie()

    const startAngle = this.#inputConverter.startAngle
    const remainingPercent = this.#inputConverter.remainingPercent
    const remainingPieColour = this.#pieStyle.getPieStyle(remainingPercent, this.#pieBoundaries)

    this.#pieCanvas.createPie(this.#pieStyle.sliceColour)

    if (startAngle < 2 * Math.PI) {
      this.#pieCanvas.createSlice({
        sliceStartAngle: startAngle,
        sliceEndAngle: 2 * Math.PI,
        sliceColour: remainingPieColour,
      })
    }
  }

  removeSlice() {}

  addPieBoundaries() {}

  addPieColour() {}

  addSliceColour() {}

  addPieBoundariesColours() {}
}
