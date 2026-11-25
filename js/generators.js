import { gameData } from "./gameData.js";
import { updateDisplay } from "./display.js";

let lastTick = Date.now()

export function mineGold() {
    gameData.gold += gameData.goldPerClick;
    updateDisplay();
}

export function autoMine() {
    const now = Date.now();
    const deltaTime = Math.max(0, (now - lastTick) / 1000);

    lastTick = now;

    gameData.gold += gameData.goldPerSecond * deltaTime;
    updateDisplay();
}