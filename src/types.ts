import { Draft } from 'immer';

export interface Action<P> {
    readonly type: string;
    readonly payload: Readonly<P>;
}

export interface UnknownAction {
    readonly type: string;
    readonly payload?: unknown;
}

export type DraftHandlerResult<T> = Draft<T> | T | void;

export interface ActionHandler<S, P> {
    actionType: string;
    handleAction: (stateDraft: Draft<S>, payload: P) => DraftHandlerResult<S>;
}

export type Reducer<S> = (state: S | undefined, action: UnknownAction) => S;
