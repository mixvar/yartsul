import { defineAction, createReducer } from '../src/yartsul';
import { createStore, Reducer } from 'redux';

type State = { readonly count: number };

describe('integration spec', () => {
    const Actions = {
        increment: defineAction('increment'),
        decrement: defineAction('decrement'),
        add: defineAction<number>('add'),
        subtract: defineAction<number>('subtract')
    };

    const reducer: Reducer<State> = createReducer(
        { count: 0 },
        Actions.increment.handler(state => ({ count: state.count + 1 })),
        Actions.decrement.handler(state => ({ count: state.count - 1 })),
        Actions.add.handler((state, amount) => ({ count: state.count + amount })),
        Actions.subtract.handler((state, amount) => ({ count: state.count - amount }))
    );

    test('state is correctly updated', () => {
        const store = createStore(reducer);

        expect(store.getState()).toEqual({ count: 0 });

        store.dispatch(Actions.increment());

        expect(store.getState()).toEqual({ count: 1 });

        store.dispatch(Actions.add(2));

        expect(store.getState()).toEqual({ count: 3 });

        store.dispatch(Actions.subtract(3));

        expect(store.getState()).toEqual({ count: 0 });

        store.dispatch(Actions.decrement());

        expect(store.getState()).toEqual({ count: -1 });
    });

    test('other actions do not interfere', () => {
        const store = createStore(reducer);

        expect(store.getState()).toEqual({ count: 0 });

        store.dispatch({ type: 'some action' });

        expect(store.getState()).toEqual({ count: 0 });
    });
});
