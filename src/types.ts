export interface UnknownAction {
    readonly type: unknown;
}

export interface Action<P> {
    readonly type: string;
    readonly payload: Readonly<P>;
}
