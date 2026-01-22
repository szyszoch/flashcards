function getOrderValue() {
    const checked = document.querySelector('input[name="order"]:checked');
    return checked?.value ?? "da";
}

function parseUpload(content, separator, order) {
    return content
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const parts = line.split(separator);
            
            let definition = "";
            let answer = "";

            if (order === "da") {
                definition = parts[0]?.trim() ?? "";
                answer = parts[1]?.trim() ?? "";
            } else if (order === "ad") {
                definition = parts[1]?.trim() ?? "";
                answer = parts[0]?.trim() ?? "";
            }

            return {
                definition: definition,
                answer: answer,
            };
        })
        .filter(card => card.definition && card.answer);
}

function saveFlashcardsData(flashcards) {
    sessionStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}

function printPreview(flashcards) {
    preview.innerHTML = "";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Definition</th>
            <th>Answer</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");

    for (const flashcard of flashcards) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${flashcard.definition}</td>
            <td>${flashcard.answer}</td>
        `;
        tbody.appendChild(tr);
    }

    preview.append(thead, tbody);
}

function uploadFiles(file, separator) {
    if (!file || !separator) {
        return;
    }
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = ({ target }) => {
        const order = getOrderValue();
        const parsed = parseUpload(target.result, separator, order);
        saveFlashcardsData(parsed);
        printPreview(parsed);
    };
}

file?.addEventListener("change", () => uploadFiles(file.files?.[0], separator.value));

separator?.addEventListener("change", () => uploadFiles(file.files?.[0], separator.value));

document
    .querySelectorAll('input[name="order"]')
    .forEach(radio =>
        radio.addEventListener("change", () => {
            uploadFiles(file.files?.[0], separator.value);
        })
    );