/** 
 * This class handles the visual configuration of the pie.
 * 
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class StylePie {
    #pieColour
    #warningColor
    #dangerColor
    #sliceColor

    /**
     * Creates an instance of the StylePie class with default styles.
     */
    constructor() {
        this.#pieColour = "#66d675ff"
        this.#warningColor = "#ffff00ff"
        this.#dangerColor = "#ff0000ff"
        this.#sliceColor = "#f0f0f0ff"
    }

    /**
     * Gets the colour of the pie.
     */
    get pieColour() {
        return this.#pieColour
    }

    /**
     * Sets the colour of the pie.
     *
     * @param {string} value - The colour value.
     */
    set pieColour(value) {
        this.#pieColour = value
    }

    /**
     * Gets the warning colour.
     */
    get warningColor() {
        return this.#warningColor
    }

    /**
     * Sets the warning colour for when the pie is in a warning state.
     * @param {string} value - The colour value.
     */
    set warningColor(value) {
        this.#warningColor = value
    }

    /**
     * Gets the danger colour.
     */
    get dangerColor() {
        return this.#dangerColor
    }

    /**
     * Sets the danger colour for when the pie is in a danger state.
     * @param {string} value - The colour value.
     */
    set dangerColor(value) {
        this.#dangerColor = value
    }

    /**
     * Gets the style of the pie based on the current value and thresholds.
     * @param {number} percentValue - The current percentage value.
     * @param {PieBoundaries} pieBoundaries - The PieBoundaries instance containing values of pie boundaries.
     * @returns {string} - The colour style of the pie.
     */
    getPieStyle(percentValue, pieBoundaries) {
        let pieStatus = pieBoundaries.getBoundaries(percentValue)
        let pieStyle = this.#pieColour

        if (pieStatus === 'danger') {
            pieStyle = this.#dangerColor
        } else if (pieStatus === 'warning') {
            pieStyle = this.#warningColor
        } 

        return pieStyle
    }

    /**
     * Gets the style of a pie slice.
     * @returns {string} - The colour of a pie slice.
     */
    sliceStyle() {
        return this.#sliceColor
    }
}