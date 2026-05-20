export const dom = {
    sheet: document.querySelector(".sheet"),
    writeView: document.getElementById("write_view"),
    rulesView: document.getElementById("rules_view"),
    deathForm: document.getElementById("death_form"),
    nameInput: document.getElementById("name_input"),
    causeInput: document.getElementById("cause_input"),
    timeInput: document.getElementById("time_input"),
    entriesList: document.getElementById("entries_list"),
    pageHint: document.getElementById("page_hint"),
    pagination: document.getElementById("pagination"),
    tearPageButton: document.getElementById("tear_page_button"),
    timerSortSelect: document.getElementById("timer_sort_select"),
    timersList: document.getElementById("timers_list"),
    deathModal: document.getElementById("death_modal"),
    deathMessage: document.getElementById("death_message"),
    closeModal: document.getElementById("close_modal"),
    errorModal: document.getElementById("error_modal"),
    errorList: document.getElementById("error_list"),
    closeErrorModal: document.getElementById("close_error_modal")
};

export function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}
