# Test report
This module has been manually tested.
The manual tests verifies the functionality of all individual classes as well as them all together.

Automated tests are yet to be implemented.

## Manual tests - Results
| Test | How it has been tested | Result |
|------|------------------------|--------|
| **PieCanvas** – default colours | Call `drawCircle()`, set `sliceStartAngle=0` and `sliceEndAngle=π/2`, call `drawSlice()` and `displayTextOnCanvas()` | OK (circle, slice and default text render) |
| **PieCanvas** – custom colours | Set `colourOfCircle='#ff0000'`, `sliceColour='#000000'`, draw circle and slice | OK (custom colours applied) |
| **PieCanvas** – custom text and appearance | Set `fontColour='#000000'`, `fontSize=52`, `remainingValue=50`, call `displayTextOnCanvas()` | OK (text updated) |
| **PieCanvas** – colour validation | Try invalid colours: `colourOfCircle=1234` and `sliceColour='black'` | OK (errors thrown) |
| **PieCanvas** – number validation | Try `fontSize=-10`, `remainingValue='10'`, draw text | OK (errors thrown) |
| **BoundaryStyle** – default colours | Log `okColour`, `warningColour`, `dangerColour` | OK |
| **BoundaryStyle** – set custom colours | Set `okColour='#3462b8ff'`, `warningColour='#a696d3'`, `dangerColour='#ffb23f'`, log result | OK (values updated) |
| **BoundaryStyle** – colour change when reaching boundary | Call `getRemainingPieColour()` with 70, 50, 10 | OK (70→OK, 50→warning, 10→danger) |
| **BoundaryStyle** – colour validation | Try invalid colours: `okColour='green'`, `warningColour=123`, `dangerColour=#XXXXXX` | OK (errors thrown) |
| **InputConverter** – initial state | `new InputConverter(200)`, log values | OK (base=200, remaining=100, angles=0) |
| **InputConverter** – addInput sequence | `addInput(70)` then `addInput(20)`, verify remaining percent and angles | OK (65% after 70, 55% after +20, arc angles ≈ 2.1991.. & 0.6283.. rad) |
| **InputConverter** – base value validation | Call `new InputConverter(value)` with values -200, 0, (), NaN, '200' | OK (errors thrown) |
| **InputConverter** – input validation | Call `addInput(value)` with values 0, (), NaN, '50', 300 and 200 | OK (errors thrown, 200 ok) |
| **PieBoundaries** – default values | Log `warningBoundaryInPercent` and `dangerBoundaryInPercent` | OK (50 and 20) |
| **PieBoundaries** – default state | `getStateOfPie(100)`, `getStateOfPie(50)`, `getStateOfPie(20)` | OK (100→ok, 50→warning, 20→danger) |
| **PieBoundaries** – set custom values | Set `warning=30`, `danger=10`, log | OK (values updated) |
| **PieBoundaries** – custom state | `getStateOfPie(80)`, `getStateOfPie(20)`, `getStateOfPie(5)` | OK (80→ok, 20→warning, 5→danger) |
| **PieBoundaries** – value validation | Try `warningBoundaryInPercent` and `dangerBoundaryInPercent` with negative values, 0, NaN, 200, reversed order, strings | OK (errors thrown) |
| **PieBoundaries** – state validation | Call `getStateOfPie(value)` with values `-5`, `NaN`, `'50'`, `150`, `0` | OK (errors thrown, 0 ok) |
| **All together**  | draw circle, set colours of pie and slice, add input, create slice, get state | OK (state and colour align with remaining percent) |
| **PieRender** – default flow | `createSlice(50)`, `createSlice(80)`, log `getCurrentStateOfPie()` after each | OK (state updates correctly) |
| **PieRender** – custom state colours | `setStateColours('#0099ff','#5900ff')`, create multiple slices to cross boundaries | OK (pie colour changes when crossing boundaries) |
| **PieRender** – stored slices redraw | `createSlice(100)`, `setSliceColour('#000000')`, `createSlice(50)`, `setSliceColour('#ffffff')` | OK (new slice uses current colour) |
| **PieRender** – set both boundaries | `setPieBoundaries(60, 30)` render and log current state of pie | OK (boundaries applied) |
| **PieRender** – set only warning | `setPieBoundaries(60)` | OK (warning updated, danger unchanged) |
| **PieRender** – set only danger | `setPieBoundaries(null,20)` | OK (danger updated, warning unchanged) |
| **PieRender** – text font and size | `displayPercentageText(true)`, `setFontColour('#ff00ff')`, `setFontSize(50)` | OK (remaining percent shown as text with given colour/size) |