/**
 * @typedef {Object} Flashcard
 * @property {string} definition
 * @property {string} answer
 */

const FLASHCARDS_KEY = "flashcards"
const RAW_FLASHCARDS_KEY = "raw_flashcards"

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
    },

    /** 
     * @param {string} flashcardData 
     */
    saveRawFlashcardData: (flashcardData) => {
        sessionStorage.setItem(RAW_FLASHCARDS_KEY, flashcardData);
    },

    /**
     * @returns {string}
     */
    loadRawFlashcardData: () => {
        return sessionStorage.getItem(RAW_FLASHCARDS_KEY);
    },
}