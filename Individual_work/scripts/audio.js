import { CLOCK_VOLUME, DEATH_VOLUME, HEARTBEAT_VOLUME } from "./constants.js";

const heartbeatSound = new Audio(new URL("../zvuk_serdcebieniya.mp3", import.meta.url).href);
const clockSound = new Audio(new URL("../clock-tick-tock.mp3", import.meta.url).href);
const deathSound = new Audio(new URL("../death.mp3", import.meta.url).href);

let timerSoundsActive = false;
let audioContext;

function setupLoop(audio, volume) {
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
}

setupLoop(heartbeatSound, HEARTBEAT_VOLUME);
setupLoop(clockSound, CLOCK_VOLUME);
deathSound.volume = DEATH_VOLUME;
deathSound.preload = "auto";

function playAudio(audio) {
    const playRequest = audio.play();

    if (playRequest && typeof playRequest.catch === "function") {
        playRequest.catch(() => {});
    }
}

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

export function syncTimerSounds(hasActiveTimers) {
    if (hasActiveTimers && !timerSoundsActive) {
        timerSoundsActive = true;
        playAudio(heartbeatSound);
        playAudio(clockSound);
        return;
    }

    if (!hasActiveTimers && timerSoundsActive) {
        timerSoundsActive = false;
        stopAudio(heartbeatSound);
        stopAudio(clockSound);
    }
}

export function playDeathSound() {
    deathSound.pause();
    deathSound.currentTime = 0;
    playAudio(deathSound);
}

function getAudioContext() {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextConstructor) {
        return null;
    }

    if (!audioContext) {
        audioContext = new AudioContextConstructor();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}

function createNoiseBuffer(context, duration) {
    const sampleRate = context.sampleRate;
    const frameCount = sampleRate * duration;
    const buffer = context.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let index = 0; index < frameCount; index++) {
        data[index] = Math.random() * 2 - 1;
    }

    return buffer;
}

function playFilteredNoise({ duration, startFrequency, endFrequency, volume }) {
    const context = getAudioContext();

    if (!context) {
        return;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const now = context.currentTime;

    source.buffer = createNoiseBuffer(context, duration);
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(startFrequency, now);
    filter.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
    filter.Q.setValueAtTime(0.7, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.start(now);
    source.stop(now + duration);
}

export function playPageTurnSound() {
    playFilteredNoise({
        duration: 0.28,
        startFrequency: 2600,
        endFrequency: 420,
        volume: 0.18
    });
}

export function playTearSound() {
    playFilteredNoise({
        duration: 0.72,
        startFrequency: 3800,
        endFrequency: 180,
        volume: 0.32
    });
}
