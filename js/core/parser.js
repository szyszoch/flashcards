export const Parser = {
    /**
     * @param {string} fileContent 
     * @param {string} columnSeparator 
     * @param {number} definitionIndex 
     * @param {number} answerIndex 
     * @returns {Array<{definition: string, answer: string}>}
     */
    parseFlashcardsFromCSV: (fileContent, columnSeparator = ';', definitionIndex = 0, answerIndex = 1) => {
        return fileContent
            .split(/\r?\n/)
            .map(row => {
                const columns = row.trim().split(columnSeparator);

                if (columns.length <= definitionIndex || columns.length <= answerIndex)
                    return null;

                return {
                    definition: columns[definitionIndex].trim(),
                    answer: columns[answerIndex].trim(),
                };
            })
            .filter(Boolean);
    },
}