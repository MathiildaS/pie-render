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

    /**
     * Creates an instance of the StylePie class with default styles.
     */
    constructor() {
        this.#pieColour = "#66d675ff"
        this.#warningColor = "#ffff00ff"
        this.#dangerColor = "#ff0000ff"
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
}