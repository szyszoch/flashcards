/**
 * @typedef {Object} FlashcardCSVLayout
 * @property {number} definitionIndex
 * @property {number} answerIndex
 */

const LAYOUTS = {
    da: { definitionIndex: 0, answerIndex: 1 },
    ad: { definitionIndex: 1, answerIndex: 0 },
};

export const FlashcardCSVLayout = {
    /**
     * @param {"da" | "ad"} order 
     * @returns {FlashcardCSVLayout}
     */
    fromOrderString: (order) => {
        const layout = LAYOUTS[order];

        if (layout === undefined) {
            throw new Error(`Unknown order: ${order}`);
        }

        return layout;
    }
}