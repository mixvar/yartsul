import { Action, UnknownAction, ActionHandler } from './types';

interface VoidActionDefinition {
    readonly type: string;
    (): Action<void>;
    isTypeOf(action: UnknownAction): action is Action<void>;
    handler<S = never>(handler: (state: S) => S): ActionHandler<S, void>;
}

interface PayloadActionDefinition<P> {
    readonly type: string;
    (payload: P): Action<P>;
    isTypeOf(action: UnknownAction): action is Action<P>;
    handler<S = never>(handler: (state: S, paylaod: P) => S): ActionHandler<S, P>;
}

export function defineAction(type: string): VoidActionDefinition;
export function defineAction<P>(type: string): PayloadActionDefinition<P>;
export function defineAction<P>(type: string): VoidActionDefinition | PayloadActionDefinition<P> {
    function actionCreator(payload: P): Action<P> {
        return { type, payload };
    }

    const properties = {
        type,
        isTypeOf(action: UnknownAction): action is Action<P> {
            return action.type === type;
        },
        handler<S>(handler: (state: S, paylaod: P) => S): ActionHandler<S, P> {
            return { actionType: type, handleAction: handler };
        }
    };

    return Object.assign(actionCreator, properties);
}
