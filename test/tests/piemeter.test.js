import { jest, describe, test, expect } from '@jest/globals'
import { PieMeter } from "../../src/piemeter.js"

describe('Test PieMeter.createPie', () => {
test('set base value and draw the initial pie', () => {
  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200

  const ctx = canvas.getContext('2d')
  jest.spyOn(canvas, 'getContext').mockReturnValue(ctx)

  const pieMeter = new PieMeter()
  pieMeter.createPie(canvas, 200)

  expect(ctx.arc).toHaveBeenCalled()
}) 



/** test('set negative base value and draw the initial pie', () => {
    
}) 

test('set base value as string and draw the initial pie', () => {
    
}) 

test('', () => {
    
}) 

test('', () => {
    
}) 

test('', () => {
    
}) */
})