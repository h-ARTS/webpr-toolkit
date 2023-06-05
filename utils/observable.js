/**
 * @module observable - Observable pattern
 */

export { Observable }

/**
 * IObservable<_T_> is the interface from the Gang of Four Observable design pattern.
 * In this variant, we allow to register many observers but do not provide means to unregister.
 * Observers are not garbage-collected before the observable itself is collected.
 * IObservables are intended to be used with the concept of "stable binding", i.e. with
 * listeners that do not change after setup.
 * @typedef IObservable<_T_>
 * @template _T_
 * @impure   Observables change their inner state (value) and maintain a list of observers that changes over time.
 * @property { ()  => _T_ }   getValue - a function that returns the current value
 * @property { (_T_) => void} setValue - a function that sets a new value, calling all registered {@link ValueChangeCallback}s
 * @property { (cb: ValueChangeCallback<_T_>) => void } onChange -
 *              a function that registers an {@link ValueChangeCallback} that will be called whenever the value changes.
 *              Immediately called back on registration.
 */

/**
 * Constructor for an IObservable<_T_>.
 * @pure
 * @template _T_
 * @param    {!_T_} value      - the initial value to set. Mandatory.
 * @returns  { IObservable<_T_> }
 * @constructor
 * @example
 * const obs = Observable("");
 * obs.onChange(val => console.log(val));
 * obs.setValue("some other value"); // will be logged
 */
const Observable = value => {
    const listeners = []
    return {
        onChange: callback => {
            listeners.push(callback)
            callback(value, value)
        },
        getValue: () => value,
        setValue: newValue => {
            if (value === newValue) return
            const oldValue = value
            value = newValue
            listeners.forEach(callback => callback(value, oldValue))
        },
    }
}

/**
 * The code above could cause potential memory leak. This is due to the callbacks are
 * stores in the listeners array. This issue could be compounded in a real-world application
 * where there might be many Observable objects, each with many listeners.
 * For example, if you were using this Observable code in a UI application and you attached a callback to an Observable
 * every time you rendered a UI component, but you didn't remove the callback when the component was destroyed,
 * you would have a memory leak.
 *
 * This is because the Observable is still holding reference to the callback AND that callback
 * could be holding references to other objects or variables.
 *
 * To fix this, you could provide a way to remove those callbacks from the listeners array.
 * A common implementation would be to return the so-called "unsubscribe" function as a return value
 * of the onChange method:
 */

const ObservableWithUnsubscribe = value => {
    const listeners = []
    return {
        onChange: callback => {
            listeners.push(callback)
            callback(value, value)
            return () => {
                // unsubscribe
                const index = listeners.indexOf(callback)
                if (index !== -1) listeners.splice(index, 1)
            }
        },
        getValue: () => value,
        setValue: newValue => {
            if (value === newValue) return
            const oldValue = value
            value = newValue
            listeners.forEach(callback => callback(value, oldValue))
        },
    }
}

/**
 * @example - Observable with unsubscribe function
 */
const obs = ObservableWithUnsubscribe('count')

const logger = (newVal, oldVal) => console.log(`New value:  ${newVal}, Old value: ${oldVal}`)

const unsubscribe = obs.onChange(logger)

let count = 0

obs.setValue(count++)
obs.setValue(count++)

unsubscribe()

obs.setValue(count++) // wont log anything
