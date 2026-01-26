/**
 * @typedef {Object} Flashcard
 * @property {string} definition
 * @property {string} answer
 */

/**
 * @param {HTMLTableElement} table
 * @param {Flashcard[]} flashcards
 */
export function renderFlashcardsTable(table, flashcards) {
    table.replaceChildren(
        buildTableHeader(),
        buildTableBody(flashcards)
    );
}

/**
 * @returns {HTMLTableSectionElement}
 */
function buildTableHeader() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    for (const label of ["Definition", "Answer"]) {
        const th = document.createElement("th");
        th.textContent = label;
        tr.appendChild(th);
    }

    thead.appendChild(tr);
    return thead;
}

/**
 * @param {Flashcard[]} flashcards
 * @returns {HTMLTableSectionElement}
 */
function buildTableBody(flashcards) {
    const tbody = document.createElement("tbody");

    for (const { definition = "", answer = "" } of flashcards) {
        const tr = document.createElement("tr");

        const def = document.createElement("td");
        def.textContent = definition;

        const ans = document.createElement("td");
        ans.textContent = answer;

        tr.append(def, ans);
        tbody.appendChild(tr);
    }

    return tbody;
}
