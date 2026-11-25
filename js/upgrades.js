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

export function buyGenerator(index) {
    autoMine();

    const generator = gameData.generators[index];

    if(gameData.gold >= generator.cost){
        gameData.gold -= generator.cost;
        generator.owned += 1;
        generator.cost = Math.ceil(generator.cost * 1.5);
        gameData.goldPerSecond += generator.production;
        updateDisplay();
    }
}