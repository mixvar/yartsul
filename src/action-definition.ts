import { Draft } from 'immer';
import { Action, UnknownAction, ActionHandler, DraftHandlerResult } from './types';

/**
 * Describes action with given type and no payload.
 * Can be used as action creator function and provides other utilities.
 */
interface VoidActionDefinition {
    /**
     * globally unique action type
     */
    readonly actionType: string;

    /**
     * action creator function
     * @returns plain action object containing type
     */
    (): Action<void>;

    /**
     * Typeguard for checking if action is of given type.
     * Narrows `action.payload` type to `undefined`
     * @param action
     */
    isTypeOf(action: UnknownAction): action is Action<void>;

    /**
     * Creates action handler object for usage in `createReducer` function.
     * @param fn the actual handler function which receives mutable state draft.
     * @see [immer.js](https://github.com/immerjs/immer)
     */
    handler<S = never>(fn: (stateDraft: Draft<S>) => DraftHandlerResult<S>): ActionHandler<S, void>;
}

/**
 * Describes action with given type and payload type.
 * Can be used as action creator function and provides other utilities.
 */
interface PayloadActionDefinition<P> {
    /**
     * globally unique action type
     */
    readonly actionType: string;

    /**
     * action creator function
     * @param paylaod
     * @returns plain action object containing type and paylaod
     */
    (payload: P): Action<P>;

    /**
     * Typeguard for checking if action is of given type.
     * Narrows `action.payload` type to appropriate `P` type
     * @param action
     */
    isTypeOf(action: UnknownAction): action is Action<P>;

    /**
     * Creates action handler object for usage in `createReducer` function.
     * @param fn the actual handler function which receives mutable state draft and action paylaod.
     * @see [immer.js](https://github.com/immerjs/immer)
     */
    handler<S = never>(
        fn: (stateDraft: Draft<S>, paylaod: P) => DraftHandlerResult<S>
    ): ActionHandler<S, P>;
}

/**
 * Creates `VoidActionDefinition` object for given action type
 *
 * @param type globally unique action type
 */
export function defineAction(type: string): VoidActionDefinition;

/**
 * Creates `PayloadActionDefinition` object for given action type and payload type.
 *
 * @param type globally unique action type
 */
export function defineAction<P>(type: string): PayloadActionDefinition<P>;

export function defineAction<P>(type: string): VoidActionDefinition | PayloadActionDefinition<P> {
    function actionCreator(payload: P): Action<P> {
        return { type, payload };
    }

    const properties = {
        actionType: type,
        isTypeOf(action: UnknownAction): action is Action<P> {
            return action.type === type;
        },
        handler<S>(
            fn: (state: Draft<S>, paylaod: P) => DraftHandlerResult<S>
        ): ActionHandler<S, P> {
            return { actionType: type, handleAction: fn };
        }
    };

    return Object.assign(actionCreator, properties);
}
