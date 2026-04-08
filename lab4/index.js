
class Item {
    name;
    weight;
    rarity;
    /**
     * 
     * @param {String} name 
     * @param {Number} weight 
     * @param {String} rarity 
     */
 
    constructor(name, weight, rarity) {
        this.name = name;
        this.setWeight(weight);
        this.rarity = rarity;
    }
    /**
     * 
     * @returns {String}
     * 
     */
    getInfo() {
        return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    }

    setWeight(newWeight) {
        if (newWeight > 0) {
            this.weight = newWeight;
        }
    }
}

/**
 * @description Represents a weapon, which is a type of item
 */
class Weapon extends Item {
    /**
     * 
     * @param {String} name 
     * @param {Number} weight 
     * @param {String} rarity 
     * @param {Number} damage 
     * @param {Number} durability 
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }
    /**
     * @description use this for using the weapon, it will decrease durability by 10, if durability is less than or equal to 10, it will set durability to 0 and print a message
     */
    use() {
        if (this.durability <= 10) {
            this.durability = 0;
            console.log("The weapon is too damaged to use.");
        }
        else if (this.durability > 0 ) {
            this.durability -= 10;
        }


    }
    /**
     * @description use this for repairing the weapon, it will set durability to 100
     */
    repair() {
        this.durability = 100;
    }
    /**
     * 
     * @returns {String}
     * @description returns info about class;
     */
    getInfo() {
        return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
}
}


const potion = new Item("Health Potion", 0.5, "Common");
console.log(potion?.getInfo());

potion?.setWeight(0.6);
console.log("POTION SET WEIGHT 0.5 -> 0.6:");
console.log(potion?.getInfo());

const axe = new Weapon("Battle Axe", 5, "Rare", 50, 67);
console.log(axe?.getInfo());

axe.use();
console.log("AXE AFTER USE:");
console.log(axe?.getInfo());

for (let i = 0; i < 6; i++) {
    axe?.use();
}
console.log("AXE AFTER 6 USES:");
console.log(axe?.getInfo());

axe.repair();
console.log("AXE AFTER REPAIR:");
console.log(axe?.getInfo());