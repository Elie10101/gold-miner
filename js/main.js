// IMPORTS

import { mineGold, autoMine } from "./generators.js";
import { buyPickaxe, buyGenerator } from "./upgrades.js";
import { saveGame, loadGame, resetGame } from "./saveload.js";
import { createGeneratorButtons, showMessage } from "./display.js";


// EVENT LISTENERS

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        saveGame();
    }
}
);

document.getElementById("mineButton").addEventListener("click", mineGold);
document.getElementById("pickaxeButton").addEventListener("click", buyPickaxe);

document.getElementById("saveButton").addEventListener("click", function() {
    saveGame();
    showMessage("Game Saved!");
});

document.getElementById("resetButton").addEventListener("click", resetGame);

// INITIALIZATION
createGeneratorButtons(buyGenerator);

loadGame();

setInterval(autoMine, 100);
setInterval(saveGame, 5000);