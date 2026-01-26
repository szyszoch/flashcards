/**
 * @typedef {Object} Flashcard
 * @property {string} definition
 * @property {string} answer
 */

const FLASHCARDS_KEY = "flashcards"

export const Repository = {
    /**
     * @param {Flashcard[]} flashcards
     */
    saveFlashcards: (flashcards) => {
        sessionStorage.setItem(FLASHCARDS_KEY, JSON.stringify(flashcards));
    },

    /**
     * @returns {Flashcard[]}
     */
    loadFlashcards: () => {
        return JSON.parse(sessionStorage.getItem(FLASHCARDS_KEY) ?? "[]");
    }
}