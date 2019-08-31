[![Build Status](https://travis-ci.org/mixvar/yartsul.svg?branch=master)](https://travis-ci.org/mixvar/yartsul)
[![Coverage Status](https://coveralls.io/repos/github/mixvar/yartsul/badge.svg?branch=master)](https://coveralls.io/github/mixvar/yartsul?branch=master)
[![GitHub license](https://img.shields.io/github/license/mixvar/yartsul)](https://github.com/mixvar/yartsul/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/yartsul)](https://www.npmjs.com/package/yartsul)
[![npm bundle size](https://img.shields.io/bundlephobia/min/yartsul)](https://bundlephobia.com/result?p=yartsul)

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
import { defineAction, createReducer } from 'yartsul';
import { createStore } from 'redux';

/* define actions */

const Increment = defineAction('Counter/Increment');
const Decrement = defineAction<void>('Counter/Decrement'); // same as above but more explicit

const Add = defineAction<number>('Counter/Add');

/* create reducer */

type State = {
    readonly counter: number;
    readonly otherStuff: string;
};

const initialState: State = {
    counter: 0,
    otherStuff: ''
};

const reducer = createReducer<State>(
    initialState,

    // you can just return the next state
    Increment.handler(state => ({ ...state, counter: state.counter + 1 })),

    // or mutate the provided state draft to create next state (see: immer.js)
    Add.handler((state, amount) => {
        state.counter = state.counter + amount;
    })
);

/* creating store and middlewares are not affected by this lib */
const store = createStore(reducer);

/* create and dispatch some actions! */

store.dispatch(Increment());
store.dispatch(Increment(1)); // Type error!

store.dispatch(Add(2));
store.dispatch(Add('2')); // Type error!
store.dispatch(Add()); // Type error!
```

[see full API docs](https://mixvar.github.io/yartsul)

## Similiar packages

-   [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)
-   [redux-ts-utils](https://github.com/knpwrs/redux-ts-utils)
-   [redux-starter-kit](https://github.com/reduxjs/redux-starter-kit)
-   [immer-reducer](https://github.com/epeli/immer-reducer)
