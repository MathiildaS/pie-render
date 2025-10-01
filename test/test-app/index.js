import { PieCanvas } from "../../src/piecanvas.js"
import { InputConverter } from "../../src/inputconverter.js"
import { BoundaryStyle } from "../../src/boundarystyle.js"
import { PieBoundaries } from "../../src/pieboundaries.js"
import { PieRender } from "../../src/pierender.js"

//------------TEST PieCanvas-------------

// Collect the canvas element and create an instance of PieCanvas.
const canvas = document.getElementById("canvasElement")
const pieCanvas = new PieCanvas(canvas)

function testDefaultValues() {
  // Draw circle with default colour.
  pieCanvas.drawCircle()

  // Draw slice on top of circle with default colour.
  pieCanvas.sliceStartAngle = 0
  pieCanvas.sliceEndAngle = Math.PI / 2
  pieCanvas.drawSlice()

  // Add text with default text, font colour and size.
  pieCanvas.displayTextOnCanvas()
}

function testCustomValues() {
  // Set colour of circle.
  pieCanvas.colourOfCircle = "#ff0000"

  // Draw circle with custom colour.
  pieCanvas.drawCircle()

  // Set colour of slice.
  pieCanvas.sliceColour = "#000000"

  // Draw slice with custom colour.
  pieCanvas.sliceStartAngle = 0
  pieCanvas.sliceEndAngle = Math.PI / 2
  pieCanvas.drawSlice()
}

function testCustomText() {
  // Set custom text, font colour and font size.
  pieCanvas.fontColour = "#000000"
  pieCanvas.fontSize = 52
  pieCanvas.remainingValue = 50

  // Display text
  pieCanvas.displayTextOnCanvas()
}

function testColourValidation() {
  try {
    pieCanvas.colourOfCircle = 1234
    pieCanvas.drawCircle()
  } catch (error) {
    console.error("Test with number: ", error.message)
  }

  try {
    pieCanvas.sliceColour = "black"

    pieCanvas.sliceStartAngle = 0
    pieCanvas.sliceEndAngle = Math.PI / 2
    pieCanvas.drawSlice()
  } catch (error) {
    console.error("Test with letters: ", error.message)
  }
}

function testNumberValidation() {
  try {
    pieCanvas.fontColour = "#000000"
    pieCanvas.fontSize = -10
    pieCanvas.displayTextOnCanvas()
  } catch (error) {
    console.error("Test with value less than zero: ", error.message)
  }
  try {
    pieCanvas.remainingValue = "10"
    pieCanvas.displayTextOnCanvas()
  } catch (error) {
    console.error("Test with value as string: ", error.message)
  }
}

//---------TEST BoundaryStyle-----------
const boundaryStyle = new BoundaryStyle()

function testDefaultBoundaryColours() {
  console.log("Default ok colour: " + boundaryStyle.okColour)
  console.log("Default warning colour: " + boundaryStyle.warningColour)
  console.log("Default danger colour: " + boundaryStyle.dangerColour)
}

function testCustomBoundaryColours() {
  boundaryStyle.okColour = "#3462b8ff"
  boundaryStyle.warningColour = "#a696d3"
  boundaryStyle.dangerColour = "#ffb23f"

  console.log("New ok colour: " + boundaryStyle.warningColour)
  console.log("New warning colour: " + boundaryStyle.warningColour)
  console.log("New danger colour: " + boundaryStyle.dangerColour)
}

function testBoundaryColourValidation() {
  try {
    boundaryStyle.okColour = "green"
  } catch (error) {
    console.error("Test colour written in letters: ", error.message)
  }
  try {
    boundaryStyle.warningColour = 123
  } catch (error) {
    console.error("Test colour written in number: ", error.message)
  }
  try {
    boundaryStyle.dangerColour = "#XXXXXX"
  } catch (error) {
    console.error("Test invalid hex-colour: ", error.message)
  }
}

function testRemainingPercentColour() {
  let pieColour = boundaryStyle.okColour
  console.log("Current colour ", pieColour)

  console.log("Colour at 70%: ", boundaryStyle.getRemainingPieColour(70))
  console.log("Colour at 50%: ", boundaryStyle.getRemainingPieColour(50))
  console.log("Colour at 10%: ", boundaryStyle.getRemainingPieColour(10))
}

//---------TEST InputConverter-----------
const inputConverter = new InputConverter(200)

function testInitialInputConverter() {
  console.log("Base value should be 200: " + inputConverter.baseValue)
  console.log("Remaining percent should be 100: " + inputConverter.remainingPercent)
  console.log("Start angle should be 0: " + inputConverter.startAngle)
  console.log("Slice arc angle should be 0: " + inputConverter.sliceArcAngle)
  console.log("Start slice angle should be 0: " + inputConverter.sliceStartAngle)
  console.log("End slice angle should be 0: " + inputConverter.sliceEndAngle)
}

function testAddInput() {
  inputConverter.addInput(70)

  // Remaining base value: 200 - 70 = 130
  // Remaining percent: 70/200 = 35%, 100 - 35 = 65

  console.log("Base value should be 200: " + inputConverter.baseValue)
  console.log("Remaining base value should be 130: " + inputConverter.remainingBaseValue)
  console.log("Remaining percent should be 65: " + inputConverter.remainingPercent)
  console.log("Total of added values should be 70: " + inputConverter.totalAddedInputValues)

  // Arc angle : (70/200) * 2π = 0.7π ≈ 2.1991148575 rad.
  // Slice start angle = start angle = 0 
  // Slice end angle = slice start angle + arc angle = 2.1991148575 rad.
  // Start angle updated to = end slice angle = 2.1991148575 rad.

  console.log("Slice arc angle should be 2.1991148575: " + inputConverter.sliceArcAngle)
  console.log("Slice start angle should be 0: " + inputConverter.sliceStartAngle)
  console.log("Slice end angle should be 2.1991148575: " + inputConverter.sliceEndAngle)
  console.log("Start angle should be 2.1991148575: " + inputConverter.startAngle)

  inputConverter.addInput(20)

  // Remaining base value: 130 - 20 = 110
  // Remaining percent: 100 - ((90/200) * 100) = 100 - 45 = 55

  console.log("Base value should be 200: " + inputConverter.baseValue)
  console.log("Remaining base value should be 110: " + inputConverter.remainingBaseValue)
  console.log("Remaining percent should be 55: " + inputConverter.remainingPercent)
  console.log("Total of added values should be 90: " + inputConverter.totalAddedInputValues)

  // Arc angle (20 / 200) * 2π = 0.2π ≈ 0.6283185307 rad.
  // Slice start angle = previous end angle = 2.1991148575 rad.
  // Slice end angle = slice start angle + arc angle = 2.1991148575 + 0.6283185307 ≈ 2.8274333882
  // Start angle updated to = end slice angle = 2.8274333882 rad.

  console.log("Slice arc angle should be 0.6283185307: " + inputConverter.sliceArcAngle)
  console.log("Slice start angle should be 2.1991148575: " + inputConverter.sliceStartAngle)
  console.log("Slice end angle should be 2.8274333882: " + inputConverter.sliceEndAngle)
  console.log("Start angle should be 2.8274333882: " + inputConverter.startAngle)
}

function testBaseValueValidation() {
  try {
    new InputConverter(-200)
  } catch (error) {
    console.error("Test negative base value: ", error.message)
  }
  try {
    new InputConverter(0)
  } catch (error) {
    console.error("Test 0 base value: ", error.message)
  }
  try {
    new InputConverter()
  } catch (error) {
    console.error("Test no provided value: ", error.message)
  }
  try {
    new InputConverter(NaN)
  } catch (error) {
    console.error("Test NaN value: ", error.message)
  }
  try {
    new InputConverter('200')
  } catch (error) {
    console.error("Test type string: ", error.message)
  }
}

function testAddInputValidation() {
  try {
    inputConverter.addInput(-10)
  } catch (error) {
    console.error("Test negative input value: ", error.message)
  }
  try {
    inputConverter.addInput(0)
  } catch (error) {
    console.error("Test 0 input value: ", error.message)
  }
  try {
    inputConverter.addInput()
  } catch (error) {
    console.error("Test no provided value: ", error.message)
  }
  try {
    inputConverter.addInput(NaN)
  } catch (error) {
    console.error("Test NaN value: ", error.message)
  }
  try {
    inputConverter.addInput('50')
  } catch (error) {
    console.error("Test type string: ", error.message)
  }
  try {
    inputConverter.addInput(300)
  } catch (error) {
    console.error("Test value greater than base value: ", error.message)
  }
    inputConverter.addInput(200)
    console.log("Test value equal to base value should not return error")
}


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

/**const pieMeter = new PieRender()
const canvas = document.getElementById('myCanvas')
pieMeter.createPie(canvas, 500)
pieMeter.createSlice(200)
pieMeter.addPieBoundaries(50, 20)
pieMeter.addPieColour("#23d32cff")
pieMeter.addSliceColour("#ffffff")
pieMeter.addPieBoundariesColours("#fce93cff","#b80c0cff")
pieMeter.createSlice(250)

const { pieColour, sliceColour, warningBoundary, dangerBoundary, warningBoundaryColour, dangerBoundaryColour, remainingPercent } = pieMeter.getPieInfo()
console.log("Pie colour: " + pieColour)
console.log("Slice colour: " + sliceColour)
console.log("Warning Boundary: " + warningBoundary)
console.log("Danger Boundary: " + dangerBoundary)
console.log("Warning Boundary Colour: " + warningBoundaryColour)
console.log("Danger Boundary Colour: " + dangerBoundaryColour)
console.log("Remaining percent: " + remainingPercent)*/

//------------TEST PieCanvas-------------

//testDefaultValues()
//testCustomValues()
//testCustomText()
//testColourValidation()
//testNumberValidation()

//----------TEST BoundaryStyle-----------
//testDefaultBoundaryColours()
//testCustomBoundaryColours()
//testBoundaryColourValidation()
//testRemainingPercentColour()

//----------TEST InputConverter-----------
//testInitialInputConverter()
//testAddInput()
//testBaseValueValidation()
testAddInputValidation()