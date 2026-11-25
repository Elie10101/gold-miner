export function switchTab(tabName) {
    document.getElementById("generatorsTab").hidden = 
        tabName !== "generators";
    document.getElementById("upgradesTab").hidden = 
        tabName !== "upgrades";

    document.getElementById("generatorsTabButton").classList.toggle(
        "active", tabName === "generators"
    );
    document.getElementById("upgradesTabButton").classList.toggle(
        "active", tabName === "upgrades"
    );
}
