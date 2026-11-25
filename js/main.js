// IMPORTS

import { mineGold, autoMine } from "./generators.js";
import { buyPickaxe, buyGenerator, buyUpgrade } from "./upgrades.js";
import { saveGame, loadGame, resetGame } from "./saveload.js";
import { createGeneratorButtons, createUpgradeButtons, showMessage } from "./display.js";
import { switchTab } from "./tabs.js";


// EVENT LISTENERS

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        saveGame();
    }
}
);

document.getElementById("mineButton").addEventListener("click", mineGold);
document.getElementById("pickaxeButton").addEventListener("click", buyPickaxe);

document.getElementById("generatorsTabButton").addEventListener("click", function() {
    switchTab("generators");
});
document.getElementById("upgradesTabButton").addEventListener("click", function() {
    switchTab("upgrades");
});

document.getElementById("saveButton").addEventListener("click", function() {
    saveGame();
    showMessage("Game Saved!");
});

document.getElementById("resetButton").addEventListener("click", resetGame);

// INITIALIZATION
createGeneratorButtons(buyGenerator);
createUpgradeButtons(buyUpgrade);

loadGame();

setInterval(autoMine, 100);
setInterval(saveGame, 5000);