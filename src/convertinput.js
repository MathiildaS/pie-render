/** 
 * This class converts input values to percentages based on given base-value.
 * 
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 * @version 0.0.1
 */

export class ConvertInput {
#baseValue
#inputValue

    constructor(baseValue) {
        this.#baseValue = baseValue
    }

    convertToPercent(inputValue) {
        this.#inputValue = inputValue
        const percentValue = (this.#inputValue / this.#baseValue) * 100
        return percentValue
    }
}