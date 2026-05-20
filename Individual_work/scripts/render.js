import { MAX_ENTRIES_PER_PAGE } from "./constants.js";
import { createElement, dom } from "./dom.js";
import { formatEntryDate, formatRemaining } from "./time.js";
import { getAllEntries, isRulesPage, state } from "./state.js";

function animateSheetTurn() {
    dom.sheet.classList.remove("sheet_turn");
    void dom.sheet.offsetWidth;
    dom.sheet.classList.add("sheet_turn");
}

function renderEntries() {
    dom.entriesList.innerHTML = "";

    if (isRulesPage()) {
        return;
    }

    const page = state.pages[state.currentPage];

    page.entries.forEach(entry => {
        const itemClasses = [
            "entry",
            entry.completed ? "entry_done" : "",
            entry.id === state.lastEntryId ? "entry_new" : "",
            entry.id === state.lastDeadId ? "entry_marked" : ""
        ].filter(Boolean).join(" ");
        const item = createElement("li", itemClasses);
        const content = createElement("div");
        const name = createElement("span", "entry_name", entry.name);
        const cause = createElement("span", "entry_cause", entry.cause);
        const time = createElement("span", "entry_time", formatEntryDate(entry.deadline));

        content.append(name, cause);
        item.append(content, time);
        dom.entriesList.append(item);
    });

    const freeLines = MAX_ENTRIES_PER_PAGE - page.entries.length;
    dom.pageHint.textContent = freeLines > 0
        ? `Свободных строк на этом листе: ${freeLines}`
        : "Лист заполнен. Новый лист уже добавлен.";
}

export function renderPagination(onChangePage) {
    dom.pagination.innerHTML = "";

    const leftArrow = createElement("li", "page_arrow", "<");
    leftArrow.addEventListener("click", () => onChangePage(state.currentPage - 1));
    dom.pagination.append(leftArrow);

    state.pages.forEach((page, index) => {
        const pageNumber = createElement("li", index === state.currentPage ? "active" : "", String(index + 1));
        pageNumber.addEventListener("click", () => onChangePage(index));
        dom.pagination.append(pageNumber);
    });

    const rulesNumber = createElement("li", isRulesPage() ? "active" : "", "Правила");
    rulesNumber.addEventListener("click", () => onChangePage(state.pages.length));
    dom.pagination.append(rulesNumber);

    const rightArrow = createElement("li", "page_arrow", ">");
    rightArrow.addEventListener("click", () => onChangePage(state.currentPage + 1));
    dom.pagination.append(rightArrow);
}

export function renderPage(onChangePage, shouldAnimate = true) {
    const rules = isRulesPage();

    dom.writeView.classList.toggle("hidden", rules);
    dom.rulesView.classList.toggle("hidden", !rules);
    dom.tearPageButton.classList.toggle("hidden", rules);
    dom.tearPageButton.disabled = rules;

    renderEntries();
    renderPagination(onChangePage);

    if (shouldAnimate) {
        animateSheetTurn();
    }

    if (!rules) {
        dom.nameInput.focus();
    }
}

function createTimerCard(entry) {
    const card = createElement("article", "timer_card timer_new");
    card.dataset.entryId = String(entry.id);

    card.addEventListener("animationend", event => {
        if (event.animationName === "timerSummon") {
            card.classList.remove("timer_new");
        }

        if (event.animationName === "deathFlash") {
            card.classList.remove("timer_death_flash");
        }
    });

    card.append(
        createElement("h3", "timer_name"),
        createElement("p", "timer_cause"),
        createElement("p", "timer_time")
    );

    return card;
}

function compareByName(leftEntry, rightEntry) {
    return leftEntry.name.localeCompare(rightEntry.name, "ru", { sensitivity: "base" });
}

function getSortedTimerEntries() {
    const entries = [...getAllEntries()];

    switch (dom.timerSortSelect.value) {
        case "deadline-asc":
            return entries.sort((leftEntry, rightEntry) => leftEntry.deadline - rightEntry.deadline);
        case "deadline-desc":
            return entries.sort((leftEntry, rightEntry) => rightEntry.deadline - leftEntry.deadline);
        case "name-asc":
            return entries.sort(compareByName);
        case "name-desc":
            return entries.sort((leftEntry, rightEntry) => compareByName(rightEntry, leftEntry));
        case "active-first":
            return entries.sort((leftEntry, rightEntry) => (
                Number(leftEntry.completed) - Number(rightEntry.completed)
                || leftEntry.deadline - rightEntry.deadline
            ));
        default:
            return entries.sort((leftEntry, rightEntry) => leftEntry.id - rightEntry.id);
    }
}

export function renderTimers() {
    const entries = getSortedTimerEntries();

    if (entries.length === 0) {
        dom.timersList.innerHTML = "";
        dom.timersList.append(createElement("p", "timer_cause timer_empty", "Пока нет записанных имен."));
        return;
    }

    dom.timersList.querySelector(".timer_empty")?.remove();

    const liveIds = new Set(entries.map(entry => String(entry.id)));

    [...dom.timersList.querySelectorAll(".timer_card")].forEach(card => {
        if (!liveIds.has(card.dataset.entryId)) {
            card.remove();
        }
    });

    const cards = entries.map(entry => {
        let card = dom.timersList.querySelector(`.timer_card[data-entry-id="${entry.id}"]`);

        if (!card) {
            card = createTimerCard(entry);
        }

        const remaining = entry.completed ? "00:00" : formatRemaining(entry.deadline - Date.now());
        const wasDone = card.classList.contains("timer_done");

        card.classList.toggle("timer_done", entry.completed);
        card.querySelector(".timer_name").textContent = `Имя: ${entry.name}`;
        card.querySelector(".timer_cause").textContent = entry.cause;
        card.querySelector(".timer_time").textContent = remaining;

        if (entry.completed && !wasDone) {
            card.classList.remove("timer_death_flash");
            void card.offsetWidth;
            card.classList.add("timer_death_flash");
        }

        return card;
    });

    cards.forEach((card, index) => {
        if (dom.timersList.children[index] !== card) {
            dom.timersList.insertBefore(card, dom.timersList.children[index] || null);
        }
    });
}
