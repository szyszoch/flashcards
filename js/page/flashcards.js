import { Repository } from "../core/repository.js";

const flashcards = Repository.loadFlashcards();

if (!flashcards.length) {
    window.location.href = "index.html";
}

let index = 0;
let awaitingNext = false;

function normalize(text) {
    return text
        .trim()
        .toLowerCase();
}

function render() {
    question.textContent = flashcards[index].definition;
    answer.value = "";
    answer.disabled = false;
    feedback.textContent = "";
    answer.classList.remove("form-success", "form-error");
    submitInput.value = "Submit answer";
    answer.focus();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    if (awaitingNext) {
        awaitingNext = false;
        render();
        return;
    }

    const userAnswer = normalize(answer.value);
    if (!userAnswer) return;

    const correct = normalize(flashcards[index].answer);

    feedback.textContent = flashcards[index].answer;
    answer.disabled = true;

    if (userAnswer === correct) {
        answer.classList.add("form-success");
    } else {
        answer.classList.add("form-error");
    }

    index++;
    if (index >= flashcards.length) {
        index = 0;
    }

    submitInput.value = "Next";
    awaitingNext = true;
    submitInput.focus();
});

render();
