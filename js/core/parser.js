export const Parser = {
    /**
     * @param {string} fileContent 
     * @param {import("./flashcard-csv-layout").FlashcardCSVLayout} layout 
     * @param {string} columnSeparator 
     * @returns {Array<{definition: string, answer: string}>}
     */
    parseFlashcardsFromCSV: (fileContent, layout, columnSeparator = ';') => {
        return fileContent
            .split(/\r?\n/)
            .map(row => {
                const columns = row.trim().split(columnSeparator);

                if (columns.length <= layout.definitionIndex || columns.length <= layout.answerIndex) {
                    return null;
                }

                return {
                    definition: columns[layout.definitionIndex].trim(),
                    answer: columns[layout.answerIndex].trim(),
                };
            })
            .filter(Boolean);
    },
}