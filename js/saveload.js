import { gameData, createDefaultData } from "./gameData.js";
import { updateDisplay, showMessage } from "./display.js";
import { autoMine, calculateClickProduction } from "./generators.js";

export function saveGame() {
    autoMine();
    
    gameData.lastSaved = Date.now();
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData));
}

export function loadGame() {
    const savedGame = localStorage.getItem("goldMinerSave");

    if (savedGame !== null){
        const parsedSave = JSON.parse(savedGame);

        gameData.gold = parsedSave.gold ?? 0;

        gameData.pickaxeLevel = parsedSave.pickaxeLevel ?? parsedSave.goldPerClick ?? 1;
        gameData.pickaxeMultiplier = parsedSave.pickaxeMultiplier ?? 1;
        calculateClickProduction();

        gameData.pickaxeCost = parsedSave.pickaxeCost ?? 10;
        gameData.lastSaved = parsedSave.lastSaved ?? Date.now();

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

        if (parsedSave.upgrades) {
            gameData.upgrades.forEach(function(upgrade) {
                const savedUpgrade = parsedSave.upgrades.find(function(saved) {
                    return saved.id === upgrade.id;
                });

                if (savedUpgrade) {
                    upgrade.purchased = savedUpgrade.purchased ?? false;
                }
        });
}

        gameData.goldPerSecond = 0;

        for (let i = 0; i < gameData.generators.length; i++) {
            const generator = gameData.generators[i];

            gameData.goldPerSecond += generator.owned * generator.production;
        }

        const secondsAway = Math.max(0, Math.floor((Date.now() - gameData.lastSaved) / 1000));
        const offlineGold = secondsAway * gameData.goldPerSecond;

        gameData.gold += offlineGold;

        console.log(`You earned ${Math.floor(offlineGold)} gold while away!`);

        if (offlineGold >= 1) {
            showMessage(`Welcome back! You earned ${Math.floor(offlineGold)} gold while away!`);
        }

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

        showMessage("Game Reset!");
    }
}