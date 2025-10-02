# pie-meter
A JavaScript library for a visual progress meter that displays remaining value as an interactive circular pie on a HTML5 canvas.

## About
pie-meter renders a circular pie that gradually shrinks as you add values against a chosen base amount. Unlike traditional pie charts used for static data visualization, pie-meter is designed for scenarios where you want to visualize remaining capacity. This makes it perfect for budgets, storage usage, displaying remaining lives in games, calorie tracking and more.

The focus is on providing users with an immediate, visual overview of how much remains of a defined amount.

## Features
- **Consumption tracking**. Add values and watch the pie shrink.
- **Colour boundaries**. Set boundaries and colours for "warning" and "danger" zones.
- **Customizable styling**. Adjust appearance to match your style.
- **Dependency-free**. No external libraries needed.

## API
const pieRender = new PieRender(canvasElement, baseValue)

pieRender.createSlice(value)


## Usage and Example
### Usage example
```javascript
import { PieRender } from 'pie-render'

const canvasElement = document.getElementById('canvasElement')

const pieRender = new PieRender(canvasElement, 200) // Base value of 200
pieRender.setPieBoundaries(60, 30) // Warning at 60%, danger at 30%
pieRender.createSlice(80) // Add a slice of 80 
pieRender.displayPercentageText(true) // Show remaining percentage text
pieRender.setFontColour('#ff00ff') // Custom font colour
pieRender.setFontSize(50) // Custom font size
```

### Installation
Install the package using npm:
```bash
npm install pie-meter
```

### Requirements
This package requires ES6 module support.

## Testing
The package has been continuously tested throughout development. 
To run the tests, run
```bash
npm test
```

See [testreport](docs/testrapport.md) for details.

## Getting involved
Please read [the Contribution Guide](docs/CONTRIBUTING.md) for instructions on how to contribute to this project.

## Author
Mathilda Segerlund - Web Development student at Linnaeus University, Sweden.

## License
This project is licensed under the MIT License

## Feedback
For further questions, feedback or suggestions, feel free to [e-mail me](mailto:ms228qs@student.lnu.se)!
