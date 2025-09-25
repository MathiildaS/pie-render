import { DrawPie } from "../../src/drawpie.js"
import { ConvertInput } from "../../src/convertinput.js"
import { StylePie } from "../../src/stylepie.js"
import { PieBoundaries } from "../../src/pieboundaries.js"

const canvas = document.getElementById("myCanvas")
const drawPie = new DrawPie(canvas)
const stylePie = new StylePie()
const pieBoundaries = new PieBoundaries()

const base = 2000
const convertValues = new ConvertInput(base)

let totalAdded = 0

function drawCanvas() {
  const inputSlice = convertValues.startAngle
  const consumedAngle = Math.min(2 * Math.PI, (totalAdded / base) * 2 * Math.PI)
  const remainingColor = stylePie.getPieStyle(remainingPercent, pieBoundaries)

  drawPie.createPie(stylePie.sliceStyle)

  if (consumedAngle < 2 * Math.PI) {
    drawPie.createSlice({ consumedAngle, 2 * Math.PI, remainingColor })
  }
}

function add(value) {
  convertValues.addInput(value)
  totalAdded += value
  repaint()
}

repaint()

add(50)

console.log(stylePie.pieColour)
console.log(stylePie.warningColor)
console.log(stylePie.dangerColor)
console.log(pieBoundaries.warning)
console.log(pieBoundaries.danger)


//stylePie.pieColour = "#000000"    
//stylePie.sliceStyle = "#ffffff"    
//stylePie.warningColor = "#b65c9fff"
//stylePie.dangerColor = "#ffff00"

pieBoundaries.warning = 80
pieBoundaries.danger = 70

console.log(stylePie.pieColour)
console.log(stylePie.warningColor)
console.log(stylePie.dangerColor)
console.log(pieBoundaries.warning)
console.log(pieBoundaries.danger)

repaint()

add(100)