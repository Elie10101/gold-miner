// IMPORTS

import { mineGold, autoMine } from "./generators.js";
import { buyPickaxe, buyMiner } from "./upgrades.js";
import { saveGame, loadGame, resetGame } from "./saveload.js";


// EVENT LISTENERS

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        saveGame();
    }
}
);

document.getElementById("mineButton").addEventListener("click", mineGold);
document.getElementById("pickaxeButton").addEventListener("click", buyPickaxe);
document.getElementById("minerButton").addEventListener("click", buyMiner);

document.getElementById("saveButton").addEventListener("click", function() {
    saveGame();
    document.getElementById("message").textContent = "Game Saved!";
});

document.getElementById("resetButton").addEventListener("click", resetGame);

// INITIALIZATION

loadGame();

setInterval(autoMine, 100);
setInterval(saveGame, 5000);