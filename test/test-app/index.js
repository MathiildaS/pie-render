import { DrawPie } from "../../src/drawpie.js"
import { ConvertInput } from "../../src/convertinput.js"
import { StylePie } from "../../src/stylepie.js"
import { PieBoundaries } from "../../src/pieboundaries.js"
import { PieMeter } from "../../src/piemeter.js"

/** //------------TEST DrawPie-------------
// Draw the initial pie by collecting the canvas element and create an instance of DrawPie.
const canvas = document.getElementById("myCanvas")
const drawPie = new DrawPie(canvas)

// Draw pie with default colour.
drawPie.createPie()

// Draw slice with default colour.
drawPie.createSlice({sliceStartAngle: 0, sliceEndAngle: Math.PI })

// Draw slice with red colour.
drawPie.createSlice({sliceStartAngle: 0, sliceEndAngle: Math.PI, sliceColour: "#f30000" }) 
*/

/** // ----------TEST ConvertInput-----------
// Test with base value of 200.
const convertInput = new ConvertInput(200)
console.log("Base value: " + convertInput.baseValue)
console.log("Remaining percent: " + convertInput.remainingPercent)
console.log("Start angle: " + convertInput.startAngle)
console.log("End angle: " + convertInput.sliceStartAngle)
console.log("End angle: " + convertInput.sliceEndAngle)

console.log(convertInput.addInput(50))
console.log(convertInput.addInput(75))
console.log(convertInput.addInput(25))

console.log("Total added values: " + convertInput.totalAddedInputValues)
console.log("Remaining percent: " + convertInput.remainingPercent)

// Test with value exceeding base value.
try {
    console.log(convertInput.addInput(100))
} catch (error) {
    console.error(error.message)
}
*/

/** // ------------TEST StylePie-------------
const stylePie = new StylePie()

console.log("Default pie colour: " + stylePie.pieColour)
console.log("Default slice colour: " + stylePie.sliceColour)
console.log("Default warning colour: " + stylePie.warningColour)
console.log("Default danger colour: " + stylePie.dangerColour)

stylePie.pieColour = "#000000"
stylePie.sliceColour = "#ffffff"
stylePie.warningColour = "#a696d3"
stylePie.dangerColour = "#ffb23f"

console.log("New pie colour: " + stylePie.pieColour)
console.log("New slice colour: " + stylePie.sliceColour)
console.log("New warning colour: " + stylePie.warningColour)
console.log("New danger colour: " + stylePie.dangerColour)

*/

/** // ----------TEST PieBoundaries-----------
const pieBoundaries = new PieBoundaries()

console.log("Default warning boundary: " + pieBoundaries.warning)
console.log("Default danger boundary: " + pieBoundaries.danger)

console.log("Check boundary at 100% left: " + pieBoundaries.getBoundaries(100))
console.log("Check boundary at 50% left: " + pieBoundaries.getBoundaries(50))
console.log("Check boundary at 15% left: " + pieBoundaries.getBoundaries(15))

// Set new boundaries.
pieBoundaries.warning = 80
pieBoundaries.danger = 50

console.log("Check boundary at 70% left: " + pieBoundaries.getBoundaries(70))
console.log("Check boundary at 40% left: " + pieBoundaries.getBoundaries(40))

// Test invalid boundary value.
try {
    pieBoundaries.warning = -10
} catch (error) {
    console.error(error.message)
}

*/

/** // ----------TEST ALL TOGETHER-----------
// Clear canvas before drawing.
drawPie.clearCanvas()

const convertInput2 = new ConvertInput(500)
const pieBoundaries2 = new PieBoundaries()
const stylePie2 = new StylePie()

stylePie2.pieColour = "#c3f572"
stylePie2.sliceColour = "#ffffff"

pieBoundaries2.warning = 40
pieBoundaries2.danger = 10

stylePie2.warningColour = "#fcfa92"
stylePie2.dangerColour = "#f08686"

function reDrawPie() {
    const startAngle = convertInput2.startAngle
    const remainingPercent = convertInput2.remainingPercent
    const remainingPieColour = stylePie2.getPieStyle(remainingPercent, pieBoundaries2)
    
    drawPie.createPie(stylePie2.sliceColour)

    if (startAngle < 2 * Math.PI) {
        drawPie.createSlice({ sliceStartAngle: startAngle, sliceEndAngle: 2 * Math.PI, sliceColour: remainingPieColour })
    }
}

convertInput2.addInput(200)
reDrawPie()
convertInput2.addInput(200)
reDrawPie()
convertInput2.addInput(80)
reDrawPie()

*/

// ----------TEST PieMeter----------

const pieMeter = new PieMeter()
const canvas = document.getElementById('myCanvas')
pieMeter.createPie(canvas, 500)
pieMeter.createSlice(200)
pieMeter.addPieBoundaries(30, 5)
console.log(pieMeter.addPieBoundaries(30, 5))
pieMeter.addPieColour("#f0f0f0")
console.log(pieMeter.addPieColour("#f0f0f0"))
pieMeter.addPieBoundariesColours("#000000","#ffffff")
console.log(pieMeter.addPieBoundariesColours("#000000","#ffffff"))

const { pieColour, sliceColour, warningBoundary, dangerBoundary, warningBoundaryColour, dangerBoundaryColour, remainingPercent } = pieMeter.getPieInfo()
console.log("Pie colour: " + pieColour)
console.log("Slice colour: " + sliceColour)
console.log("Warning Boundary: " + warningBoundary)
console.log("Danger Boundary: " + dangerBoundary)
console.log("Warning Boundary Colour: " + warningBoundaryColour)
console.log("Danger Boundary Colour: " + dangerBoundaryColour)
console.log("Remaining percent: " + remainingPercent)