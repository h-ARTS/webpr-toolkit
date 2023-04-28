/**
 * Inheritance is when a class is defined based on another class, inheriting its properties and methods.
 * This is often described as an "is-a" relationship. For example, in a scenario where we have a
 * base class Unit and a derived class Hero which extends Unit, the relationship is "Hero is a Unit".
 */
class Unit {
    constructor(name) {
        this.name = name
    }

    attack() {
        console.log(`${this.name} attacked`)
    }

    walk() {
        console.log(`${this.name} walked`)
    }
}

class Hero extends Unit {
    goBerserk() {
        console.log('ROOAAR!')
    }
}

class Myth extends Unit {
    specialAttack(attackName) {
        console.log(`${this.name} initiates ${attackName}`)
    }
}

const wolf = new Unit('Wolf')
wolf.walk() // Wolf walked
wolf.attack() // Wolf attacked

const achilles = new Hero('Achilles')
achilles.walk() // Achilles walked
achilles.attack() // Achilles attacked
achilles.goBerserk() // ROOAAR!

const medusa = new Myth('Medusa')
medusa.walk() // Medusa walked
medusa.attack() // Medusa attacked
medusa.specialAttack('petrify') // Medusa initiates petrify
/**
 * Question: What if a unit could be both, a hero and a myth unit?
 * Question: What if a unit is a hero myth unit but doesn't need the rest
 * of the implementation from the Hero class?
 *
 * This is sometimes referred to as the "gorilla/banana problem" - you wanted a banana (some methods from the superclass),
 * but what you got was a gorilla (the superclass and all its other methods).
 */

/**
 * Composition to the rescue!
 *
 * Composition is a way to combine simple objects or data types into more complex ones. Instead of a "is a"
 * relationship (as in, a Hero "is a" Unit), composition gives you a "has a" relationship (a Galleon "has" Cannons) as seen below.
 */
const Sails = {
    number: 3,
    material: 'linen',
    sail: function () {
        console.log(`The ${this.number} ${this.material} S are unfurled.`)
    },
}

const Cannons = {
    number: 20,
    fire: function () {
        console.log(`All ${this.number} cannons fired!`)
    },
}

class Galleon {
    constructor(name, sails, cannons) {
        this.name = name
        this.sails = sails
        this.cannons = cannons
    }

    setSail() {
        this.sails.sail()
        console.log(`${this.name} is setting sail.`)
    }

    engageBattle() {
        this.cannons.fire()
        console.log(`${this.name} is engaging in battle.`)
    }
}

const galleon = new Galleon('Black Pearl', Sails, Cannons)

galleon.setSail()
// The 3 linen sails are unfurled.
// Black Pearl is setting sail.

galleon.engageBattle()
// All 20 cannons fired!
// Black Pearl is engaging in battle.

/**
 * The main advantage of composition over inheritance is that it's more flexible and
 * leads to a better separation of concerns. With composition, it's easier to change
 * behavior at runtime, and it's easier to reuse code because you can use and
 * combine simple, standalone components.
 */
