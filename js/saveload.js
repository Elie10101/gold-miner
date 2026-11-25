import { gameData, createDefaultData } from "./gameData.js";
import { updateDisplay, showMessage } from "./display.js";
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

    if (Array.isArray(parsedSave.generators)) {
        for (let i = 0; i < gameData.generators.length; i++) {
            const savedGenerator = parsedSave.generators[i];

            if (savedGenerator) {
                gameData.generators[i].owned = savedGenerator.owned;
                gameData.generators[i].cost = savedGenerator.cost;
            }
        }
    } else {
        gameData.generators[0].owned = parsedSave.miners ?? 0;
        gameData.generators[0].cost = parsedSave.minerCost ?? 25;
    }

    if (offlineGold >= 1) {
        showMessage(`Welcome back! You earned ${Math.floor(offlineGold)} gold while away!`);
    }

    updateDisplay();

}

export function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        autoMine();
        Object.assign(gameData, createDefaultData());
        saveGame();
        updateDisplay();

        showMessage("Game Reset!");
    }
}