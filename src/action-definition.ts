import { Action, UnknownAction } from './types';

interface VoidActionDefinition {
    readonly type: string;
    (): Action<void>;
    isTypeOf(action: UnknownAction): action is Action<void>;
}

interface PayloadActionDefinition<P> {
    readonly type: string;
    (payload: P): Action<P>;
    isTypeOf(action: UnknownAction): action is Action<P>;
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
        }
    };

    return Object.assign(actionCreator, properties);
}
