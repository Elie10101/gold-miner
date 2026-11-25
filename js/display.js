import { gameData } from "./gameData.js";
import { formatNumber } from "./utils.js";
import { buyGenerator } from "./upgrades.js";
import { switchTab } from "./tabs.js";

export function updateDisplay() {
    document.getElementById("goldMined").textContent = 
        `${formatNumber(gameData.gold)} Gold Mined`;
    document.getElementById("pickaxeButton").textContent = 
        `Upgrade Pickaxe (Level ${gameData.pickaxeLevel}) Cost: ${formatNumber(gameData.pickaxeCost)} Gold`;
    document.getElementById("production").textContent = 
        `${formatNumber(gameData.goldPerSecond)} Gold per Second`;
    document.getElementById("clickProduction").textContent = 
        `${formatNumber(gameData.goldPerClick)} Gold per Click`;

    document.getElementById("pickaxeButton").disabled = 
        gameData.gold < gameData.pickaxeCost;

    // Navigation unlock conditions
    const generatorsUnlocked = gameData.pickaxeLevel >= 2;
    const upgradesUnlocked = gameData.generators[2].owned >= 1;

    document.getElementById("generatorSection").hidden = 
        !generatorsUnlocked;

    document.getElementById("tabNavigation").hidden = 
        !generatorsUnlocked;

    document.getElementById("production").hidden = 
        !generatorsUnlocked;

    document.getElementById("upgradesTabButton").hidden = 
        !upgradesUnlocked;

    if (!upgradesUnlocked) {
        switchTab("generators");
    }

    for (let i = 0; i < gameData.generators.length; i++) {
        const generator = gameData.generators[i];
        const button = document.getElementById(`generatorButton${i}`);

        button.textContent = 
            `${generator.name} (Owned: ${generator.owned}) Cost: ${formatNumber(generator.cost)} Gold (+${generator.production}/s)`;

        button.disabled = gameData.gold < generator.cost;
        button.hidden = i > 0 && gameData.generators[i - 1].owned < 1;
    }

    gameData.upgrades.forEach(function(upgrade) {
    const button = document.getElementById(upgrade.id);

    button.disabled = upgrade.purchased || gameData.gold < upgrade.cost;

    button.classList.toggle("purchased", upgrade.purchased);

    if (upgrade.purchased) {
        button.textContent = 
            `${upgrade.name} - ${upgrade.description} ✓ Purchased`;
    } else {
        button.textContent = 
            `${upgrade.name} - ${upgrade.description} | Cost: ${formatNumber(upgrade.cost)} Gold`;
    }
    });
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

export function createUpgradeButtons(buyUpgrade) {
    const container = document.getElementById("upgradeContainer");

    gameData.upgrades.forEach(function(upgrade) {
        const button = document.createElement("button");

        button.id = upgrade.id;

        button.textContent = 
            `${upgrade.name} - ${upgrade.description} | Cost: ${formatNumber(upgrade.cost)} Gold`;

        button.addEventListener("click", function() {
            buyUpgrade(upgrade.id);
        });

        container.appendChild(button);
    });
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

