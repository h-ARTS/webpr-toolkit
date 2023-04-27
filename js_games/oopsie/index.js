// player class with fallback and progress
/**
 * @typedef PlayerType
 * @property { () => Number } getFallbackIndex
 * @property { () => Number } getProgressIndex
 * @property { () => String } getName
 * @property { (Number) => void } proceed   - side effect: changes the progressIndex
 * @property { () => void } turn            - side effect: the other player is to move
 * @property { () => void } fallback        - side effect: the progress return to the last fallback position
 */

/**
 * @param { "Dierk" | "Florian" } name - must be either "Dierk" or "Florian"
 * @return { PlayerType }
 * @constructor
 */
const Player = name => {
    let fallbackIndex = 0
    let progressIndex = 0
    return {
        getFallbackIndex: () => fallbackIndex,
        getProgressIndex: () => progressIndex,
        getName: () => name,
        proceed: stride => (progressIndex += stride),
        turn: () => (fallbackIndex = progressIndex),
        fallback: () => (progressIndex = fallbackIndex),
    }
}

/**
 * @type { PlayerType }
 */
const player = Player('One')

/**
 * Start the game and display elements
 * Initializes the game by creating and attaching 100 'div' elements
 * to the 'fields' element in the document.
 * Each 'div' element represents a game field.
 * After the initialization, the display function is called.
 */
function start() {
    const fields = document.getElementById('fields')

    // Build game field
    for (let i = 0; i < 100; i++) {
        let field = document.createElement('DIV')
        field.setAttribute('ID', 'FIELD-' + i)
        field.innerText = ' '
        fields.appendChild(field)
    }

    display()
}

/**
 * Get random dice number and adjust values
 * Simulates a dice roll by generating a random number between 1 and 6.
 * The result of the roll is displayed in the 'dice' element in the document.
 * Depending on the result of the roll, the players properties are adjusted:
 * If the roll is 3, the player performs a fallback.
 * For any other result, the player proceeds by the rolled amount.
 * After the updates, the display function is called.
 */
function dice() {
    let stride = Math.round(1 + Math.random() * 5)
    document.getElementById('dice').innerText = '' + stride

    // Adjust player properties
    if (stride === 3) {
        player.fallback()
    } else {
        player.proceed(stride)
    }

    display()
}

/**
 * Calls the 'turn' method of the global 'player' object and then calls the global 'display' function.
 * This function is typically used to indicate the end of the current player's turn and update the game display.
 */
function turn() {
    player.turn()
    display()
}

/**
 * Updates the display of the game fields.
 * Sets the 'CLASS' attribute of all game fields to 'field'.
 * Then it identifies the current player's fallback field and progress field based on the player's fallback and progress indices.
 * The fallback field has its 'CLASS' attribute set to 'field fallback', and the progress field to 'field progress'.
 * This function relies on the global 'player' object having 'getFallbackIndex' and 'getProgressIndex' methods.
 */
function display() {
    // all game fields
    for (let i = 0; i < 100; i++) {
        let field = document.getElementById('FIELD-' + i)
        field.setAttribute('CLASS', 'field')
    }

    // Current fallback field
    let fallbackField = document.getElementById('FIELD-' + player.getFallbackIndex())
    console.log(fallbackField)
    fallbackField.setAttribute('CLASS', 'field fallback')

    // Current player field (progress)
    let progressField = document.getElementById('FIELD-' + player.getProgressIndex())
    progressField.setAttribute('CLASS', 'field progress')
}
