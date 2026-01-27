import { FlashcardCSVLayout } from "../core/flashcard-csv-layout.js";
import { Parser } from "../core/parser.js";
import { Repository } from "../core/repository.js";
import { renderFlashcardsTable } from "../ui/flashcard-table.js";

const fileInput = document.getElementById("file");
const separatorInput = document.getElementById("separator");
const orderInputs = document.getElementsByName("order");
const getCheckedOrder = () => (document.querySelector('input[name="order"]:checked'));

let fileData = null;

function updateFlashcards() {
  if (fileData === null) return;

  const flashcards = Parser.parseFlashcardsFromCSV(
    fileData,
    FlashcardCSVLayout.fromOrderString(getCheckedOrder()?.value ?? "da"),
    separatorInput?.value,
  ).filter((flashcard) => (flashcard != null));

  Repository.saveFlashcards(flashcards);
  renderFlashcardsTable(document.getElementById("preview"), flashcards);
}

function uploadFile() {
  if (fileInput.files.length === 0) return;
  const reader = new FileReader();
  reader.readAsText(fileInput.files[0], "UTF-8");
  reader.onload = ({ target }) => {
    fileData = target.result.trim();
    updateFlashcards();
  };
}

fileInput.addEventListener("change", uploadFile);
separatorInput.addEventListener("input", updateFlashcards);
orderInputs.forEach((radio) => radio.addEventListener("change", updateFlashcards));
