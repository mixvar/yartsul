import { produce } from 'immer';
import { ActionHandler, Reducer, UnknownAction } from './types';

/**
 * Creates `redux` and `useReducer` compatible reducer function
 * from given action handlers which are run thorught immer `produce` function to create next state.
 *
 * @param initialState
 * @param handlers handlers created by `ActionDefinition.handler` function
 */
export function createReducer<S>(
    initialState: S,
    ...handlers: Array<ActionHandler<S, any>>
): Reducer<S> {
    const handlersMap: Record<string, ActionHandler<S, any>> = handlers.reduce(
        (map, h) => ({ ...map, [h.actionType]: h }),
        {}
    );

    if (Object.keys(handlersMap).length !== handlers.length) {
        throw new Error('Each action can only have one handler!');
    }

    return (state: S = initialState, action: UnknownAction): S => {
        const handler = handlersMap[action.type];
        return handler
            ? produce<S>(state, draft => handler.handleAction(draft, action.payload))
            : state;
    };
}
