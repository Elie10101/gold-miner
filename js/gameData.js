export function createDefaultData() {
    return {
        lastSaved: Date.now(),
        gold: 0,
        goldPerClick: 1,
        pickaxeCost: 10,
        miners: 0,
        minerCost: 25,
        goldPerSecond: 0
    }
}

export const gameData = createDefaultData();