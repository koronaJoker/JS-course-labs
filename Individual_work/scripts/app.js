import { DEFAULT_CAUSE, DEFAULT_CAUSE_DEATH_TEXT, TIMER_TICK_MS } from "./constants.js";
import { playDeathSound, playPageTurnSound, playTearSound, syncTimerSounds } from "./audio.js";
import { dom } from "./dom.js";
import { renderPage, renderTimers } from "./render.js";
import {
    addEntryToCurrentPage,
    createEntry,
    getAllEntries,
    markEntryDead,
    moveToWritablePage,
    queueDeath,
    setCurrentPage,
    shiftDeathQueue,
    state,
    tearCurrentPage
} from "./state.js";
import { formatDate, parseDuration } from "./time.js";

function formatDeathCause(entry) {
    if (entry.cause === DEFAULT_CAUSE) {
        return DEFAULT_CAUSE_DEATH_TEXT;
    }

    return entry.cause;
}

function changePage(nextPage) {
    const previousPage = state.currentPage;

    setCurrentPage(nextPage);

    if (previousPage !== state.currentPage) {
        playPageTurnSound();
    }

    renderPage(changePage);
}

function tearPage() {
    if (dom.tearPageButton.disabled) {
        return;
    }

    dom.tearPageButton.disabled = true;
    playTearSound();
    dom.sheet.classList.remove("sheet_rip");
    void dom.sheet.offsetWidth;
    dom.sheet.classList.add("sheet_rip");

    window.setTimeout(() => {
        const torn = tearCurrentPage();
        dom.sheet.classList.remove("sheet_rip");

        if (torn) {
            renderPage(changePage);
            renderTimers();
            syncTimerSounds(hasActiveTimers());
        }

        dom.tearPageButton.disabled = false;
    }, 620);
}

function getValidationErrors(name, cause, timeValue, duration) {
    const errors = [];

    if (!name) {
        errors.push("Введите имя человека.");
    } else {
        if (!/\p{L}/u.test(name)) {
            errors.push("Имя должно содержать хотя бы одну букву.");
        }

        if (name.length > 60) {
            errors.push("Имя слишком длинное. Максимум 60 символов.");
        }
    }

    if (cause.length > 100) {
        errors.push("Причина слишком длинная. Максимум 100 символов.");
    }

    if (timeValue && duration === null) {
        errors.push("Время не распознано. Используйте формат 40s, 2m, 01:30 или в 23:15.");
    }

    if (duration !== null && duration <= 0) {
        errors.push("Время должно быть больше нуля.");
    }

    return errors;
}

function showErrorModal(errors) {
    dom.errorList.innerHTML = "";
    errors.forEach(error => {
        dom.errorList.append(createErrorItem(error));
    });

    if (typeof dom.errorModal.showModal === "function") {
        dom.errorModal.showModal();
        return;
    }

    alert(errors.join("\n"));
}

function createErrorItem(text) {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
}

function addEntry(event) {
    event.preventDefault();

    const name = dom.nameInput.value.trim();
    const cause = dom.causeInput.value.trim();
    const timeValue = dom.timeInput.value.trim();
    const duration = parseDuration(timeValue);
    const errors = getValidationErrors(name, cause, timeValue, duration);

    if (errors.length > 0) {
        showErrorModal(errors);
        dom.nameInput.focus();
        return;
    }

    moveToWritablePage();

    const entry = createEntry(name, cause, duration);
    addEntryToCurrentPage(entry);

    dom.nameInput.value = "";
    dom.causeInput.value = "";
    dom.timeInput.value = "";

    renderPage(changePage);
    renderTimers();
    syncTimerSounds(hasActiveTimers());
}

function showNextDeath() {
    if (state.deathQueue.length === 0 || dom.deathModal.open) {
        return;
    }

    const entry = shiftDeathQueue();
    const date = formatDate(new Date());
    dom.deathMessage.textContent = `${entry.name} умер от: ${formatDeathCause(entry)}. Дата смерти: ${date}`;

    if (typeof dom.deathModal.showModal === "function") {
        dom.deathModal.showModal();
        return;
    }

    alert(dom.deathMessage.textContent);
}

function pushDeath(entry) {
    queueDeath(entry);
    showNextDeath();
}

function hasActiveTimers() {
    return getAllEntries().some(entry => !entry.completed);
}

function tickTimers() {
    let pageNeedsRender = false;
    let deathHappened = false;

    getAllEntries().forEach(entry => {
        if (!entry.completed && entry.deadline <= Date.now()) {
            markEntryDead(entry);
            pushDeath(entry);
            pageNeedsRender = true;
            deathHappened = true;
        }
    });

    if (pageNeedsRender) {
        renderPage(changePage, false);
    }

    renderTimers();
    syncTimerSounds(hasActiveTimers());

    if (deathHappened) {
        playDeathSound();
    }
}

function submitNameWithEnter(event) {
    if (event.key !== "Enter") {
        return;
    }

    event.preventDefault();

    if (typeof dom.deathForm.requestSubmit === "function") {
        dom.deathForm.requestSubmit();
        return;
    }

    dom.deathForm.dispatchEvent(new Event("submit", { cancelable: true }));
}

export function initApp() {
    dom.deathForm.addEventListener("submit", addEntry);
    dom.nameInput.addEventListener("keydown", submitNameWithEnter);
    dom.timerSortSelect.addEventListener("change", renderTimers);
    dom.tearPageButton.addEventListener("click", tearPage);
    dom.closeModal.addEventListener("click", () => {
        if (typeof dom.deathModal.close === "function") {
            dom.deathModal.close();
        }

        showNextDeath();
    });
    dom.deathModal.addEventListener("close", showNextDeath);
    dom.closeErrorModal.addEventListener("click", () => {
        if (typeof dom.errorModal.close === "function") {
            dom.errorModal.close();
        }
    });

    renderPage(changePage, false);
    renderTimers();
    syncTimerSounds(hasActiveTimers());
    setInterval(tickTimers, TIMER_TICK_MS);
}
