import { DEFAULT_DURATION_MS } from "./constants.js";

export function formatDate(date) {
    return date.toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

export function formatEntryDate(timestamp) {
    return formatDate(new Date(timestamp));
}

export function formatRemaining(milliseconds) {
    const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function parseDuration(value) {
    const raw = value.trim().toLowerCase();

    if (!raw) {
        return DEFAULT_DURATION_MS;
    }

    const clockMatch = raw.match(/^(?:at\s+|в\s*)?([01]?\d|2[0-3]):([0-5]\d)$/);
    if (clockMatch && (raw.startsWith("at") || raw.startsWith("в"))) {
        const target = new Date();
        target.setHours(Number(clockMatch[1]), Number(clockMatch[2]), 0, 0);

        if (target.getTime() <= Date.now()) {
            target.setDate(target.getDate() + 1);
        }

        return target.getTime() - Date.now();
    }

    const minutesSecondsMatch = raw.match(/^(\d{1,2}):([0-5]\d)$/);
    if (minutesSecondsMatch) {
        return (Number(minutesSecondsMatch[1]) * 60 + Number(minutesSecondsMatch[2])) * 1000;
    }

    const unitMatch = raw.match(/^(\d+)\s*(s|sec|сек|с|m|min|мин|м|h|час|часа|часов|ч)?$/);
    if (!unitMatch) {
        return null;
    }

    const amount = Number(unitMatch[1]);
    const unit = unitMatch[2] || "s";

    if (unit === "m" || unit === "min" || unit === "мин" || unit === "м") {
        return amount * 60 * 1000;
    }

    if (unit === "h" || unit === "час" || unit === "часа" || unit === "часов" || unit === "ч") {
        return amount * 60 * 60 * 1000;
    }

    return amount * 1000;
}
