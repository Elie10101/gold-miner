import { gameData, createDefaultData } from "./gameData.js";
import { updateDisplay } from "./display.js";
import { autoMine } from "./generators.js";

export function saveGame() {
    autoMine();
    
    gameData.lastSaved = Date.now();
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData));
}

export function loadGame() {
    const savedGame = localStorage.getItem("goldMinerSave")

    if (savedGame !== null){
        Object.assign(gameData, JSON.parse(savedGame));

        const secondsAway = Math.max(0, (Math.floor(Date.now() - gameData.lastSaved) / 1000));
        const offlineGold = secondsAway * gameData.goldPerSecond;

        gameData.gold += offlineGold;

        console.log(`You earned ${Math.floor(offlineGold)} gold while away!`);

        saveGame();
    }

    updateDisplay();
}

export function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        autoMine();
        Object.assign(gameData, createDefaultData());
        saveGame();
        updateDisplay();

        document.getElementById("message").textContent = "Game Reset!";
    }
}