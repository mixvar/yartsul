export interface Action<P> {
    readonly type: string;
    readonly payload: Readonly<P>;
}

export interface UnknownAction {
    readonly type: string;
    readonly payload?: unknown;
}

export interface ActionHandler<S, P> {
    actionType: string;
    handleAction: (state: S, payload: P) => S;
}

export type Reducer<S> = (state: S | undefined, action: UnknownAction) => S;
