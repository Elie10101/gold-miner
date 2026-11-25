import { gameData } from "./gameData.js";
import { formatNumber } from "./utils.js";

export function updateDisplay() {
    document.getElementById("goldMined").textContent = 
        `${formatNumber(gameData.gold)} Gold Mined`;

    document.getElementById("pickaxeButton").textContent = 
        `Upgrade Pickaxe (Level ${gameData.goldPerClick}) Cost: ${formatNumber(gameData.pickaxeCost)} Gold`;
    document.getElementById("pickaxeButton").disabled = 
        gameData.gold < gameData.pickaxeCost;

    document.getElementById("production").textContent = 
        `${formatNumber(gameData.goldPerSecond)} Gold per Second`;
    
        document.getElementById("minerButton").textContent = 
        `Hire Miner (Owned: ${gameData.miners}) Cost: ${formatNumber(gameData.minerCost)} Gold`;
    document.getElementById("minerButton").disabled = 
        gameData.gold < gameData.minerCost;
}