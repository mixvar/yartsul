import { ActionHandler } from '../src/types';
import { createReducer } from '../src/yartsul';

describe('createReducer', () => {
    test('should throw error when duplicate action handlers are passed', () => {
        const handler1: ActionHandler<any, any> = {
            actionType: 'foo',
            handleAction: state => state
        };
        const handler2: ActionHandler<any, any> = {
            actionType: 'foo',
            handleAction: state => state
        };

        expect(() => createReducer(0, handler1, handler2)).toThrowError(
            'Each action can only have one handler!'
        );
    });

    test('should create reducer that returns initial state when passed undefined state', () => {
        const initialState = { foo: 'bar' };
        const reducer = createReducer(initialState);

        expect(reducer(undefined, {} as any)).toBe(initialState);
    });

    test('should create reducer that returns passed state when no matching action handler is found', () => {
        const initialState = 0;
        const state = 10;
        const action = { type: 'unhandled' };

        const handler1: ActionHandler<any, any> = { actionType: 'foo', handleAction: () => 1 };
        const handler2: ActionHandler<any, any> = { actionType: 'bar', handleAction: () => 2 };

        const reducer = createReducer(initialState, handler1, handler2);

        expect(reducer(state, action)).toBe(state);
    });

    test('should create reducer that uses appropriate handlers to reduce the state', () => {
        const initialState = 0;

        const action1 = { type: 'action_1' };
        const action2 = { type: 'action_2' };
        const action3 = { type: 'action_3' };

        const handler1: ActionHandler<any, any> = {
            actionType: action1.type,
            handleAction: () => 1
        };
        const handler2: ActionHandler<any, any> = {
            actionType: action2.type,
            handleAction: () => 2
        };
        const handler3: ActionHandler<any, any> = {
            actionType: action3.type,
            handleAction: () => 3
        };

        const reducer = createReducer(initialState, handler1, handler2, handler3);

        expect(reducer(initialState, action1)).toBe(1);
        expect(reducer(initialState, action2)).toBe(2);
        expect(reducer(initialState, action3)).toBe(3);
    });
});
