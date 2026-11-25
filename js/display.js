import { gameData } from "./gameData.js";
import { formatNumber } from "./utils.js";
import { buyGenerator } from "./upgrades.js";

export function updateDisplay() {
    document.getElementById("goldMined").textContent = 
        `${formatNumber(gameData.gold)} Gold Mined`;

    document.getElementById("clickProduction").textContent =
        `${formatNumber(gameData.goldPerClick)} Gold per Click`;

    document.getElementById("pickaxeButton").textContent = 
        `Upgrade Pickaxe (Level ${gameData.goldPerClick}) Cost: ${formatNumber(gameData.pickaxeCost)} Gold`;
    document.getElementById("pickaxeButton").disabled = 
        gameData.gold < gameData.pickaxeCost;

    document.getElementById("production").textContent = 
        `${formatNumber(gameData.goldPerSecond)} Gold per Second`;

    document.getElementById("generatorSection").hidden = 
        gameData.goldPerClick < 2;

    for (let i = 0; i < gameData.generators.length; i++) {
        const generator = gameData.generators[i];
        const button = document.getElementById(`generatorButton${i}`);

    button.textContent = 
        `${generator.name} (Owned: ${generator.owned}) Cost: ${formatNumber(generator.cost)} Gold (+${generator.production}/s)`;

    button.disabled = gameData.gold < generator.cost;

    button.hidden = i > 0 && gameData.generators[i - 1].owned < 1;
    }
}

export function createGeneratorButtons(buyGenerator) {
    const container = document.getElementById("generatorContainer");

    for (let i = 0; i < gameData.generators.length; i++) {
        const button = document.createElement("button");

        button.id = `generatorButton${i}`;

        button.addEventListener("click", function() {
            buyGenerator(i);
        });

        container.appendChild(button);
    }
}

export function showMessage(message) {
    const messageElement = document.getElementById("message");

    messageElement.textContent = message;

    clearTimeout(messageTimeout);

    messageTimeout = setTimeout(function() {
        messageElement.textContent = "";
    }, 1000);
}

let messageTimeout;

