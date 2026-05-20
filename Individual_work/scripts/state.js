import { DEFAULT_CAUSE, INITIAL_PAGE_COUNT, MAX_ENTRIES_PER_PAGE } from "./constants.js";

export const state = {
    pages: Array.from({ length: INITIAL_PAGE_COUNT }, () => ({ entries: [] })),
    tornEntries: [],
    currentPage: 0,
    entryId: 1,
    deathQueue: [],
    lastEntryId: null,
    lastDeadId: null
};

export function isRulesPage(index = state.currentPage) {
    return index === state.pages.length;
}

export function getAllEntries() {
    return [
        ...state.pages.flatMap(page => page.entries),
        ...state.tornEntries
    ];
}

export function setCurrentPage(nextPage) {
    const lastPage = state.pages.length;
    state.currentPage = Math.min(Math.max(nextPage, 0), lastPage);
}

export function ensureWritablePage() {
    const lastWritablePage = state.pages[state.pages.length - 1];

    if (lastWritablePage.entries.length >= MAX_ENTRIES_PER_PAGE) {
        state.pages.push({ entries: [] });
        return true;
    }

    return false;
}

function moveToNextWritablePage() {
    const nextWritablePage = state.pages.findIndex((page, index) => (
        index > state.currentPage && page.entries.length < MAX_ENTRIES_PER_PAGE
    ));

    if (nextWritablePage >= 0) {
        state.currentPage = nextWritablePage;
        return;
    }

    ensureWritablePage();
    state.currentPage = state.pages.length - 1;
}

export function moveToWritablePage() {
    if (isRulesPage()) {
        state.currentPage = state.pages.length - 1;
    }

    if (state.pages[state.currentPage].entries.length >= MAX_ENTRIES_PER_PAGE) {
        moveToNextWritablePage();
    }
}

export function createEntry(name, cause, duration) {
    const entry = {
        id: state.entryId++,
        name,
        cause: cause || DEFAULT_CAUSE,
        deadline: Date.now() + duration,
        completed: false
    };

    state.lastEntryId = entry.id;
    return entry;
}

export function addEntryToCurrentPage(entry) {
    state.pages[state.currentPage].entries.push(entry);

    if (state.pages[state.currentPage].entries.length >= MAX_ENTRIES_PER_PAGE) {
        moveToNextWritablePage();
    }
}

export function tearCurrentPage() {
    if (isRulesPage()) {
        return false;
    }

    const [removedPage] = state.pages.splice(state.currentPage, 1);
    state.tornEntries.push(...removedPage.entries);

    if (state.pages.length === 0) {
        state.pages.push({ entries: [] });
    }

    state.currentPage = Math.min(state.currentPage, state.pages.length - 1);
    state.lastEntryId = null;

    return true;
}

export function markEntryDead(entry) {
    entry.completed = true;
    state.lastDeadId = entry.id;
}

export function queueDeath(entry) {
    state.deathQueue.push(entry);
}

export function shiftDeathQueue() {
    return state.deathQueue.shift();
}
