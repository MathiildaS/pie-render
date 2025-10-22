import { PieCanvas } from "../../src/piecanvas.js"
import { InputConverter } from "../../src/inputconverter.js"
import { BoundaryStyle } from "../../src/boundarystyle.js"
import { PieBoundaries } from "../../src/pieboundaries.js"
import { PieRender } from "../../src/pierender.js"

/**
 * HOW TO RUN THESE TESTS MANUALLY
 * --------------------------------
 * 1. Open the project in your browser with Live Server or Vite
 * 2. Open the browser console
 * 3. Uncomment one test function call at a time .
 * 4. Observe the printed results or error messages in the console.
 * 6. When done, comment it out again and move on to the next test.
 */

//-----------TEST PieCanvas--------------

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

//----------TEST InputConverter----------

//testInitialInputConverter()
//testAddInput()
//testBaseValueValidation()
//testAddInputValidation()

//----------TEST PieBoundaries-----------

//testDefaultBoundaryValues()
//testCustomBoundaryValues()
//testDefaultStateOfPie()
//testCustomStateOfPie()
//testBoundaryValueValidation()
//testStateOfPieValidation()

//--------TEST ALL TOGETHER-----------

//testClassesTogether()

//--------TEST PieRender-----------

//testDefaultPie()
//testCustomBoundariesColours()
//testDrawStoredSlices()
//testSetBoundariesValues()
//testSetOnlyWarningBoundary()
//testSetOnlyDangerBoundary()
//testTextSizeAndColour()


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
const boundaryStyle = new BoundaryStyle(new PieBoundaries)

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
  console.log(
    "Remaining percent should be 100: " + inputConverter.remainingPercent
  )
  console.log("Start angle should be 0: " + inputConverter.startAngle)
  console.log("Slice arc angle should be 0: " + inputConverter.sliceArcAngle)
  console.log(
    "Start slice angle should be 0: " + inputConverter.sliceStartAngle
  )
  console.log("End slice angle should be 0: " + inputConverter.sliceEndAngle)
}

function testAddInput() {
  inputConverter.addInput(70)

  // Remaining base value: 200 - 70 = 130
  // Remaining percent: 70/200 = 35%, 100 - 35 = 65

  console.log("Base value should be 200: " + inputConverter.baseValue)
  console.log(
    "Remaining base value should be 130: " + inputConverter.remainingBaseValue
  )
  console.log(
    "Remaining percent should be 65: " + inputConverter.remainingPercent
  )
  console.log(
    "Total of added values should be 70: " +
      inputConverter.totalAddedInputValues
  )

  // Arc angle : (70/200) * 2π = 0.7π ≈ 2.1991148575 rad.
  // Slice start angle = start angle = 0
  // Slice end angle = slice start angle + arc angle = 2.1991148575 rad.
  // Start angle updated to = end slice angle = 2.1991148575 rad.

  console.log(
    "Slice arc angle should be 2.1991148575: " + inputConverter.sliceArcAngle
  )
  console.log(
    "Slice start angle should be 0: " + inputConverter.sliceStartAngle
  )
  console.log(
    "Slice end angle should be 2.1991148575: " + inputConverter.sliceEndAngle
  )
  console.log(
    "Start angle should be 2.1991148575: " + inputConverter.startAngle
  )

  inputConverter.addInput(20)

  // Remaining base value: 130 - 20 = 110
  // Remaining percent: 100 - ((90/200) * 100) = 100 - 45 = 55

  console.log("Base value should be 200: " + inputConverter.baseValue)
  console.log(
    "Remaining base value should be 110: " + inputConverter.remainingBaseValue
  )
  console.log(
    "Remaining percent should be 55: " + inputConverter.remainingPercent
  )
  console.log(
    "Total of added values should be 90: " +
      inputConverter.totalAddedInputValues
  )

  // Arc angle (20 / 200) * 2π = 0.2π ≈ 0.6283185307 rad.
  // Slice start angle = previous end angle = 2.1991148575 rad.
  // Slice end angle = slice start angle + arc angle = 2.1991148575 + 0.6283185307 ≈ 2.8274333882
  // Start angle updated to = end slice angle = 2.8274333882 rad.

  console.log(
    "Slice arc angle should be 0.6283185307: " + inputConverter.sliceArcAngle
  )
  console.log(
    "Slice start angle should be 2.1991148575: " +
      inputConverter.sliceStartAngle
  )
  console.log(
    "Slice end angle should be 2.8274333882: " + inputConverter.sliceEndAngle
  )
  console.log(
    "Start angle should be 2.8274333882: " + inputConverter.startAngle
  )
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
    new InputConverter("200")
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
    inputConverter.addInput("50")
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

// ----------TEST PieBoundaries-----------
const pieBoundaries = new PieBoundaries()

function testDefaultBoundaryValues() {
  console.log(
    "Default warning boundary should be 50: " +
      pieBoundaries.warningBoundaryInPercent
  )
  console.log(
    "Default danger boundary should be 20: " +
      pieBoundaries.dangerBoundaryInPercent
  )
}

function testDefaultStateOfPie() {
  console.log(
    "100% left should return ok: " + pieBoundaries.getStateOfPie(100)
  )
  console.log(
    "50% left should return warning: " + pieBoundaries.getStateOfPie(50)
  )
  console.log(
    "20% left should return danger: " + pieBoundaries.getStateOfPie(20)
  )
}

function testCustomBoundaryValues() {
  pieBoundaries.warningBoundaryInPercent = 30
  pieBoundaries.dangerBoundaryInPercent = 10

  console.log(
    "Custom warning boundary should be 30: " +
      pieBoundaries.warningBoundaryInPercent
  )
  console.log(
    "Custom danger boundary should be 10: " +
      pieBoundaries.dangerBoundaryInPercent
  )
}

function testCustomStateOfPie() {
  pieBoundaries.warningBoundaryInPercent = 30
  pieBoundaries.dangerBoundaryInPercent = 10

  console.log("80% left should return ok: " + pieBoundaries.getStateOfPie(80))
  console.log(
    "20% left should return warning: " + pieBoundaries.getStateOfPie(20)
  )
  console.log(
    "5% left should return danger: " + pieBoundaries.getStateOfPie(5)
  )
}

function testBoundaryValueValidation() {
  try {
    pieBoundaries.warningBoundaryInPercent = -10
  } catch (error) {
    console.error("Test warning boundary less than zero: ", error.message)
  }
  try {
    pieBoundaries.dangerBoundaryInPercent = -2
  } catch (error) {
    console.error("Test danger boundary less than zero: ", error.message)
  }
  try {
    pieBoundaries.warningBoundaryInPercent = 0
  } catch (error) {
    console.error("Test warning boundary equal to zero: ", error.message)
  }
  try {
    pieBoundaries.dangerBoundaryInPercent = 0
  } catch (error) {
    console.error("Test danger boundary equal to zero: ", error.message)
  }
  try {
    pieBoundaries.warningBoundaryInPercent = NaN
  } catch (error) {
    console.error("Test warning boundary is NaN: ", error.message)
  }
  try {
    pieBoundaries.dangerBoundaryInPercent = NaN
  } catch (error) {
    console.error("Test danger boundary is NaN: ", error.message)
  }
  try {
    pieBoundaries.warningBoundaryInPercent = 200
  } catch (error) {
    console.error("Test warning boundary is larger than 100: ", error.message)
  }
  try {
    pieBoundaries.dangerBoundaryInPercent = 200
  } catch (error) {
    console.error("Test danger boundary is larger than 100: ", error.message)
  }
  try {
    pieBoundaries.warningBoundaryInPercent = 10
    pieBoundaries.dangerBoundaryInPercent = 20
  } catch (error) {
    console.error(
      "Test danger boundary larger than warning boundary ",
      error.message
    )
  }
  try {
    pieBoundaries.warningBoundaryInPercent = "10"
  } catch (error) {
    console.error("Test warning boundary is string: ", error.message)
  }
  try {
    pieBoundaries.dangerBoundaryInPercent = "100"
  } catch (error) {
    console.error("Test danger boundary is string: ", error.message)
  }
}

function testStateOfPieValidation() {
  try {
    pieBoundaries.getStateOfPie(-5)
  } catch (error) {
    console.error("Test remaining percent is less than zero: ", error.message)
  }
  try {
    pieBoundaries.getStateOfPie(NaN)
  } catch (error) {
    console.error("Test remaining percent is NaN: ", error.message)
  }
  try {
    pieBoundaries.getStateOfPie("50")
  } catch (error) {
    console.error("Test remaining percent is string: ", error.message)
  }
  try {
    pieBoundaries.getStateOfPie(150)
  } catch (error) {
    console.error("Test remaining percent is larger than 100: ", error.message)
  }
  try {
    pieBoundaries.getStateOfPie(0)
    console.log("Test remaining percent is equal to 0 should not throw error.")
  } catch (error) {
    console.error("Test remaining percent is equal to 0: ", error.message)
  }
  try {
    console.log("Test 20% remaining: " + pieBoundaries.getStateOfPie(20))
  } catch (error) {
    console.error("Test 20% remaining: ", error.message)
  }
}

// ----------TEST ALL TOGETHER-----------
// PieCanvas, BoundaryStyle, InputConverter, PieBoundaries

function testClassesTogether() {
  pieCanvas.drawCircle()
  const converter = new InputConverter(500)

  pieCanvas.colourOfCircle = "#ce6363ff"
  pieCanvas.sliceColour = "#e9e9e9"

  pieBoundaries.warningBoundaryInPercent = 40
  pieBoundaries.dangerBoundaryInPercent = 15

  converter.addInput(100)
  pieCanvas.sliceStartAngle = converter.sliceStartAngle
  pieCanvas.sliceEndAngle = converter.sliceEndAngle
  pieCanvas.drawSlice()

  const remainingPercent = converter.remainingPercent
  console.log("Remaining percent: " + converter.remainingPercent)
  const state = pieBoundaries.getStateOfPie(remainingPercent)
  console.log("State 80%: " + state)

  /* converter.addInput(200)
pieCanvas.sliceStartAngle = converter.sliceStartAngle
pieCanvas.sliceEndAngle   = converter.sliceEndAngle
pieCanvas.drawSlice() 

const remainingPercent2 = converter.remainingPercent
console.log("Remaining percent: " + converter.remainingPercent)
const state2 = pieBoundaries.getStateOfPie(remainingPercent2)
console.log("State 40%: " + state2)*/

  /* converter.addInput(200)
pieCanvas.sliceStartAngle = converter.sliceStartAngle
pieCanvas.sliceEndAngle   = converter.sliceEndAngle
pieCanvas.drawSlice()

const remainingPercent3 = converter.remainingPercent
console.log("Remaining percent: " + converter.remainingPercent)
const state3 = pieBoundaries.getStateOfPie(remainingPercent3)
console.log("State 0%: " + state3)*/
}

// ----------TEST PieRender----------
const canvas2 = document.getElementById("canvasElement")
const pieRender = new PieRender(canvas2, 200)

function testDefaultPie() {
  pieRender.createSlice(50)
  console.log("Current state after input value 50: ", pieRender.getCurrentStateOfPie())

  pieRender.createSlice(80)
  console.log("Current state after input value 80: ", pieRender.getCurrentStateOfPie())
}

function testCustomBoundariesColours() {
  pieRender.setStateColours("#0099ff", "#5900ff")
  pieRender.createSlice(100)
  console.log(
    "Current state after input value 100: ", pieRender.getCurrentStateOfPie()
  )
  pieRender.createSlice(50)
  console.log(
    "Current state after input value 50: " , pieRender.getCurrentStateOfPie()
  )
  pieRender.createSlice(20)
  console.log(
    "Current state after input value 20: ", pieRender.getCurrentStateOfPie()
  )
}

function testDrawStoredSlices() {
  pieRender.createSlice(100)
  pieRender.setSliceColour("#000000")
  pieRender.createSlice(50)
  pieRender.setSliceColour("#ffffff")

  console.log(pieRender.getCurrentStateOfPie())
}

function testSetBoundariesValues() {
  pieRender.setPieBoundaries(60, 30)
  console.log(pieRender.getCurrentStateOfPie())
}

function testSetOnlyWarningBoundary() {
  pieRender.setPieBoundaries(60)
  console.log(pieRender.getCurrentStateOfPie())
}

function testSetOnlyDangerBoundary() {
  pieRender.setPieBoundaries(null, 20)
  console.log(pieRender.getCurrentStateOfPie())
}

function testTextSizeAndColour() {
  pieRender.createSlice(80)
  pieRender.displayPercentText(true)

  pieRender.setFontColour("#ff00ff")
  pieRender.setFontSize(50)
}


