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

