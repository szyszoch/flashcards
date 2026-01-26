import { Parser } from "../core/parser.js";
import { Repository } from "../core/repository.js";
import { renderFlashcardsTable } from "../ui/flashcard-table.js";

function getOrderValue() {
  const checked = document.querySelector('input[name="order"]:checked');
  return checked?.value ?? "da";
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
    Repository.saveFlashcards(parsed);
    renderFlashcardsTable(preview, parsed);
  };
}

file?.addEventListener("change", () =>
  uploadFiles(file.files?.[0], separator.value),
);

separator?.addEventListener("input", () =>
  uploadFiles(file.files?.[0], separator.value),
);

document.querySelectorAll('input[name="order"]').forEach((radio) =>
  radio.addEventListener("change", () => {
    uploadFiles(file.files?.[0], separator.value);
  }),
);
