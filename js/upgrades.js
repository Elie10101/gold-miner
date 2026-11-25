import { gameData } from "./gameData.js";
import { updateDisplay } from "./display.js";
import { autoMine, calculateClickProduction } from "./generators.js";

export function buyPickaxe() {
    if (gameData.gold >= gameData.pickaxeCost) {
        gameData.gold -= gameData.pickaxeCost;
        gameData.pickaxeLevel += 1;
        gameData.pickaxeCost = Math.ceil(gameData.pickaxeCost * 1.5);
        calculateClickProduction();
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

export function buyUpgrade(id) {
    const upgrade = gameData.upgrades.find(function(upgrade) {
        return upgrade.id === id;
    });

    if (!upgrade || upgrade.purchased) {
        return;
    }

    if (gameData.gold >= upgrade.cost) {
        gameData.gold -= upgrade.cost;
        upgrade.purchased = true;

        if (upgrade.target === "pickaxe") {
            gameData.pickaxeMultiplier *= upgrade.multiplier;
            calculateClickProduction();
        }

        updateDisplay();
    }
}