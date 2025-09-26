import { jest, describe, test, expect, beforeEach } from '@jest/globals'
import { PieMeter } from '../../src/piemeter.js'

function createCanvas() {
  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200
  const ctx = canvas.getContext('2d')

  jest.spyOn(canvas, 'getContext').mockReturnValue(ctx)
  return { canvas, ctx }
}

describe('Test PieMeter', () => {
  let canvas, ctx

  beforeEach(() => {
    jest.clearAllMocks()
    ;({ canvas, ctx } = createCanvas())
  })

  test('set base value and draw the initial pie', () => {
    const pieMeter = new PieMeter()
    const drawSpy = jest.spyOn(pieMeter, '_drawPie')

    pieMeter.createPie(canvas, 200)

    expect(drawSpy).toHaveBeenCalled()

    const info = pieMeter.getPieInfo()
    expect(info).toHaveProperty('pieColour')
    expect(info).toHaveProperty('sliceColour')
    expect(info).toHaveProperty('remainingPercent')
  })

  test('throw error if negative base value', () => {
    const pieMeter = new PieMeter()
    expect(() => pieMeter.createPie(canvas, -10)).toThrow()
  })

  test('createPie throw error if base value is not a number', () => {
    const pieMeter = new PieMeter()
    expect(() => pieMeter.createPie(canvas, 'hello')).toThrow()
  })

  test('calculate correct remainingPercent and angle for 50%', () => {
    const arcSpy = jest.spyOn(ctx, 'arc')

    const pieMeter = new PieMeter()
    pieMeter.createPie(canvas, 200)
    pieMeter.createSlice(100)

    const info = pieMeter.getPieInfo()
    expect(info.remainingPercent).toBeCloseTo(50, 2)

    const sliceArc = arcSpy.mock.calls.at(-1)
    const start = sliceArc[3]
    const end = sliceArc[4]

    expect(start).toBeCloseTo(Math.PI, 6)
    expect(end).toBeCloseTo(Math.PI * 2, 6)
  })

  test('createSlice calls _drawPie and remainingPercent is correctly updated', () => {
    const pieMeter = new PieMeter()
    const drawSpy = jest.spyOn(pieMeter, '_drawPie')

    pieMeter.createPie(canvas, 200)
    const before = pieMeter.getPieInfo().remainingPercent

    pieMeter.createSlice(50)

    expect(drawSpy).toHaveBeenCalledTimes(2)

    const after = pieMeter.getPieInfo().remainingPercent
    expect(typeof after).toBe('number')
    expect(after).not.toBeNaN()
    expect(after).toBeLessThanOrEqual(before)
  })

  test('addPieBoundaries set boundaries and calls _drawPie', () => {
    const pieMeter = new PieMeter()
    const drawSpy = jest.spyOn(pieMeter, '_drawPie')

    pieMeter.createPie(canvas, 200)
    pieMeter.addPieBoundaries(0.5, 0.25)

    expect(drawSpy).toHaveBeenCalledTimes(2)

    const info = pieMeter.getPieInfo()
    expect(info.warningBoundary).toBe(0.5)
    expect(info.dangerBoundary).toBe(0.25)
  })

  test('addPieColour set pieColour and calls _drawPie', () => {
    const pieMeter = new PieMeter()
    const drawSpy = jest.spyOn(pieMeter, '_drawPie')

    pieMeter.createPie(canvas, 200)
    const oldColour = pieMeter.getPieInfo().pieColour

    pieMeter.addPieColour('#112233ff')

    expect(drawSpy).toHaveBeenCalledTimes(2)
    expect(pieMeter.getPieInfo().pieColour).toBe('#112233ff')
    expect(pieMeter.getPieInfo().pieColour).not.toBe(oldColour)
  })

  test('addSliceColour set sliceColour and calls _drawPie', () => {
    const pieMeter = new PieMeter()
    const drawSpy = jest.spyOn(pieMeter, '_drawPie')

    pieMeter.createPie(canvas, 200)
    const oldSlice = pieMeter.getPieInfo().sliceColour

    pieMeter.addSliceColour('#abcdef11')

    expect(drawSpy).toHaveBeenCalledTimes(2)
    expect(pieMeter.getPieInfo().sliceColour).toBe('#abcdef11')
    expect(pieMeter.getPieInfo().sliceColour).not.toBe(oldSlice)
  })

  test('addPieBoundariesColours set colours for when reaching boundaries and calls _drawPie', () => {
    const pieMeter = new PieMeter()
    const drawSpy = jest.spyOn(pieMeter, '_drawPie')

    pieMeter.createPie(canvas, 200)
    pieMeter.addPieBoundariesColours('#ffff00aa', '#ff0000aa')

    expect(drawSpy).toHaveBeenCalledTimes(2)

    const info = pieMeter.getPieInfo()
    expect(info.warningBoundaryColour).toBe('#ffff00aa')
    expect(info.dangerBoundaryColour).toBe('#ff0000aa')
  })

  test('createSlice throw error for negative input', () => {
    const pieMeter = new PieMeter()
    pieMeter.createPie(canvas, 200)
    expect(() => pieMeter.createSlice(-5)).toThrow()
  })

  test('createSlice throw error if input is not a number', () => {
    const pieMeter = new PieMeter()
    pieMeter.createPie(canvas, 200)
    expect(() => pieMeter.createSlice('42')).toThrow()
  })
})