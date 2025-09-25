/** 
 * This class handles the visual configuration of the pie.
 * 
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class StylePie {
    #pieColour
    #warningColour
    #dangerColour
    #sliceColour

    /**
     * Creates an instance of the StylePie class with default styles.
     */
    constructor() {
        this.#pieColour = "#66d675"
        this.#warningColour = "#ffff00"
        this.#dangerColour = "#ff0000"
        this.#sliceColour = "#f0f0f0"
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
    get warningColour() {
        return this.#warningColour
    }

    /**
     * Sets the warning colour for when the pie is in a warning state.
     * @param {string} value - The colour value.
     */
    set warningColour(value) {
        this.#warningColour = value
    }

    /**
     * Gets the danger colour.
     */
    get dangerColour() {
        return this.#dangerColour
    }

    /**
     * Sets the danger colour for when the pie is in a danger state.
     * @param {string} value - The colour value.
     */
    set dangerColour(value) {
        this.#dangerColour = value
    }

    /**
     * Gets the style of the pie based on the current value and boundaries.
     *
     * @param {number} remainingPercentValue - The remaining percentage value of the pie.
     * @param {PieBoundaries} pieBoundaries - The PieBoundaries instance containing values of pie boundaries.
     * @returns {string} - The colour style of the pie.
     */
    getPieStyle(remainingPercentValue, pieBoundaries) {
        let pieStatus = pieBoundaries.getBoundaries(remainingPercentValue)
        let pieStyle = this.#pieColour

        if (pieStatus === 'danger') {
            pieStyle = this.#dangerColour
        } else if (pieStatus === 'warning') {
            pieStyle = this.#warningColour
        } 

        return pieStyle
    }

    /**
     * Gets the style of a pie slice.
     * @returns {string} - The colour of a pie slice.
     */
    get sliceColour() {
        return this.#sliceColour
    }

    /**
     * Sets the style of a pie slice.
     * @param {string} value - The colour value.
     */
    set sliceColour(value) {
        this.#sliceColour = value
    }
}
