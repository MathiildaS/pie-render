import { DrawPie } from "../src/drawpie.js"
import { ConvertInput } from "../src/convertinput.js"

const canvas = document.getElementById("myCanvas")
const drawPie = new DrawPie(canvas)
drawPie.createPie()

const convertValues = new ConvertInput(2000)

drawPie.createSlice(convertValues.addInput(50))
drawPie.createSlice(convertValues.addInput(75))
drawPie.createSlice(convertValues.addInput(25))