import { gameData } from "./gameData.js";
import { updateDisplay } from "./display.js";
import { autoMine } from "./generators.js";

export function buyPickaxe() {
    if (gameData.gold >= gameData.pickaxeCost) {
        gameData.gold -= gameData.pickaxeCost;
        gameData.goldPerClick += 1;
        gameData.pickaxeCost = Math.ceil(gameData.pickaxeCost * 1.5);
        updateDisplay();
    }
}

export function buyMiner() {
    autoMine();

    if(gameData.gold >= gameData.minerCost){
        gameData.gold -= gameData.minerCost;
        gameData.miners += 1;
        gameData.goldPerSecond += 1;
        gameData.minerCost = Math.ceil(gameData.minerCost * 1.5);
        updateDisplay();
    }
}