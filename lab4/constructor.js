/**
 * 
 * @param {String} name 
 * @param {Number} weight 
 * @param {String} rarity 
 */
function Item(name, weight, rarity) {
    this.name = name;
    this.weight = 0;
    this.setWeight(weight);
    this.rarity = rarity;
}

/**
 * 
 * @returns {String} 
 * @description use this for get Information about class properties
 */
Item.prototype.getInfo = function() {
    return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

/**
 * 
 * @param {Number} newWeight 
 * @description use this for setting the weight of the item
 */

Item.prototype.setWeight = function(newWeight) {
    if (newWeight > 0) this.weight = newWeight;
};

/**
 * 
 * @param {String} name 
 * @param {Number} weight 
 * @param {String} rarity 
 * @param {Number} damage 
 * @param {Number} durability 
 */
function Weapon(name, weight, rarity, damage, durability) {
    Item.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

Weapon.prototype = Object.create(Item.prototype);
/**
 * @description use this for using the weapon, it will decrease durability by 10, if durability is less than or equal to 10, it will set durability to 0 and print a message
 */
Weapon.prototype.use = function() {

    if (this.durability <= 10) {
        this.durability = 0;
        console.log("The weapon is too damaged to use.");
    } else {
        this.durability -= 10;
    }

};

/**
 * @description use this for repairing the weapon, it will set durability to 100
 */
Weapon.prototype.repair = function() {
    this.durability = 100;
};

/**
 * @description use this for get Information about class properties, it will call the getInfo method of the Item class and add damage and durability information
 * @returns {String}
 */
Weapon.prototype.getInfo = function() {
    return `${Item.prototype.getInfo.call(this)}, Damage: ${this.damage}, Durability: ${this.durability}`;
};


const potion = new Item();
potion.name = "Health Potion";
potion.weight = 0.5;
potion.rarity = "Common";

console.log(potion.getInfo());
potion.setWeight(0.6);
console.log("POTION SET WEIGHT 0.5 -> 0.6:");
console.log(potion.getInfo());

const axe = new Weapon("Battle Axe", 12, "Legendary", 50, 67);


console.log(axe.getInfo());

axe.use();
console.log("AXE AFTER USE:");
console.log(axe.getInfo());

for (let i = 0; i < 6; i++) axe.use();
console.log("AXE AFTER 6 USES:");
console.log(axe.getInfo());

axe.repair();
console.log("AXE AFTER REPAIR:");
console.log(axe.getInfo());