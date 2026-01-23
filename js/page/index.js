import { Parser } from "../core/parser.js";

function getOrderValue() {
  const checked = document.querySelector('input[name="order"]:checked');
  return checked?.value ?? "da";
}

function saveFlashcardsData(flashcards) {
  sessionStorage.setItem("flashcards", JSON.stringify(flashcards));
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
  reader.readAsText(file, "UTF-8");
  reader.onload = ({ target }) => {
    const order = getOrderValue();
    const definitionIndex = order === "da" ? 0 : 1;
    const answerIndex = order === "da" ? 1 : 0;
    const parsed = Parser.parseFlashcardsFromCSV(
      target.result,
      separator,
      definitionIndex,
      answerIndex,
    );
    saveFlashcardsData(parsed);
    printPreview(parsed);
  };
}

file?.addEventListener("change", () =>
  uploadFiles(file.files?.[0], separator.value),
);

separator?.addEventListener("change", () =>
  uploadFiles(file.files?.[0], separator.value),
);

document.querySelectorAll('input[name="order"]').forEach((radio) =>
  radio.addEventListener("change", () => {
    uploadFiles(file.files?.[0], separator.value);
  }),
);
