/**
 * @module jsdocs - How to document your js code:
 */

/**
 * How to write a new type:
 * The properties have return types with a name of the function
 * and some information if applicable
 */
/**
 * @typedef CarType
 * @property { () => String } getMake       - returns the make of the car
 * @property { () => String } getModel      - returns the model of the car
 * @property { () => void } startCar        - side effect: sets the car's status to started
 * @property { () => Boolean } getIsStarted - returns the car's started status
 * @property { () => Number } getTank       - returns the car's fuel tank level
 * @property { () => Number } getKilometers - returns the car's mileage in kilometers
 * @property { () => Number } getHorsepower - returns the car's horsepower
 * @property { (String) => void } turn      - side effect: turns the car in the specified direction
 */

/**
 * Creates a new car object.
 *
 * @param { string } make   - The make of the car.
 * @param { string } model  - The model of the car.
 * @returns { CarType }     The created car object.
 */
const Car = (make, model) => {
    let isStarted = false
    let tank = 0.5
    let kilometers = 100_000
    let horsepower = 176
    return {
        getMake: () => make,
        getModel: () => model,
        startCar: () => (isStarted = true),
        getIsStarted: () => isStarted,
        getTank: () => tank,
        getKilometers: () => kilometers,
        getHorsepower: () => horsepower,
        turn: direction => console.log(`Turning ${direction}`),
    }
}

// Specify a type:
/**
 * @type { CarType }
 */
let car = Car('Mercedes', 'C220 D')

// This is like generics in Java or C#
// @template is for specifying type parameters for generic
/**
 * Identity function, aka "I" in the SKI calculus or "Ibis" (or "Idiot") in the Smullyan bird metaphors.
 * The function is pure and runs in O(1). Function calls can be inlined.
 * @template T
 * @param    {T} x
 * @returns  {T} the parameter {@link x} unchanged.
 * @example
 * id(1) === 1
 */
const id = x => x

/**
 * A function with two parameters in curried form, that returns the first of the two parameters.
 * @type { <a> (x:a) => (...*) => a  }
 * @example
 * konst(42)(null) === 42;
 */
const konst = x => _ => x
