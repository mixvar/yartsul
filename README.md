# Yet Another Redux-TypeScript Utilities Library (yartsul)

_Simple and 100% type safe actions and reducers with no boilerplate code 🎉_

## The problem

-   Creating type safe actions and reducers using plain typescript involves [a lot of boilerplate code](https://redux.js.org/recipes/usage-with-typescript#type-checking-actions-action-creators).
-   Existing libriares that help reducing the boilerplate either sacrifice type safety or are rather complicated and verbose.

## The solution

-   100% type safe utils for creating simple actions and reducers
-   No boilerplate code
-   Minimal API surface and emphasis on simplicity
    -   Just 2 exported functions
    -   Actions are plain objects: `{ type: 'THE_ANSWER', payload: 42 }`
    -   No need to maintain `RootAction` type
-   Slightly opinionanted
    -   Not fully FSA compilant (type and payload are all that you need)
    -   Usage of [immer.js](https://github.com/immerjs/immer) for easy handling of immutable updates
    -   Compatible with any redux stack (reselect / thunk-actions / sagas / epics)
-   Progerssively adoptable in existing projects

## Usage

```ts
import { defineAction } from 'yartsul';
import { Reducer } from 'redux';

/* define actions */

const Increment = defineAction('Counter/Increment');
const Decrement = defineAction<void>('Counter/Decrement'); // same as above but more explicit

const Add = defineAction<number>('Counter/Add');

/* create reducer */

type State = {
    readonly counter: number;
};

const initialState: State = {
    counter: 0
};

const reducer: Reducer<State> = (state = initialState, action) => {
    if (Increment.isTypeOf(action)) {
        // action payload type narrowed to undefined
        return { ...state, counter: state.counter + 1 };
    }

    if (Add.isTypeOf(action)) {
        // action payload type narrowed to number
        return { ...state, counter: state.counter + action.payload };
    }

    return state;
};

/* create and dispatch actions */

dispatch(Increment());
dispatch(Increment(1)); // Type error!

dispatch(Add(2));
dispatch(Add('2')); // Type error!
dispatch(Add()); // Type error!
```

## Similiar packages

-   [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)
-   [redux-ts-utils](https://github.com/knpwrs/redux-ts-utils)
-   [redux-starter-kit](https://github.com/reduxjs/redux-starter-kit)
-   [immer-reducer](https://github.com/epeli/immer-reducer)
