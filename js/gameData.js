export function createDefaultData() {
    return {
        lastSaved: Date.now(),
        gold: 0,
        pickaxeLevel: 1,
        pickaxeMultiplier: 1,
        goldPerClick: 1,
        pickaxeCost: 10,
        goldPerSecond: 0,

        generators: [
            {
                name: "Miner",
                cost: 25,
                owned: 0,
                production: 1
            },
            {
                name: "Excavator",
                cost: 150,
                owned: 0,
                production: 5
            },
            {
                name: "Mining Drill",
                cost: 1000,
                owned: 0,
                production: 10
            },
            {
                name: "Factory",
                cost: 10000,
                owned: 0,
                production: 50
            }
        ],
    
        upgrades: [
            {
                id: "pickaxeUpgrade",
                name: "Reinforced Pickaxe",
                description: "Double gold per click.",
                cost: 1000,
                target: "pickaxe",
                multiplier: 2,
                purchased: false
            }
        ]
    }
}

export const gameData = createDefaultData();