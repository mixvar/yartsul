import { defineAction } from '../src/yartsul';

describe('defineAction', () => {
    it('should define and create empty action', () => {
        const actionType = 'TEST_ACTION';

        const actionDefinition = defineAction(actionType);
        expect(actionDefinition.actionType).toBe(actionType);

        const action = actionDefinition();
        expect(action).toEqual({
            payload: undefined,
            type: actionType
        });
    });

    it('should define and create empty action using explicit payload type', () => {
        const actionType = 'TEST_ACTION';

        const actionDefinition = defineAction<void>(actionType);
        expect(actionDefinition.actionType).toBe(actionType);

        const action = actionDefinition();
        expect(action).toEqual({
            payload: undefined,
            type: actionType
        });
    });

    it('should define and create action with payload', () => {
        const actionType = 'TEST_ACTION';
        const payload = { theAnswer: 42 };

        const actionDefinition = defineAction<typeof payload>(actionType);
        expect(actionDefinition.actionType).toBe(actionType);

        const action = actionDefinition(payload);
        expect(action).toEqual({
            payload,
            type: actionType
        });
    });

    it('should define and create action with payload which is of union type', () => {
        const actionType = 'TEST_ACTION';

        const actionDefinition = defineAction<string | number | boolean>(actionType);

        ['foo', 42, true].forEach(payload =>
            expect(actionDefinition(payload)).toEqual({
                payload,
                type: actionType
            })
        );
    });
});

describe('isTypeOf', () => {
    it('should return true for action of the same type', () => {
        const actionType = 'TEST_ACTION';

        const actionDefinition = defineAction(actionType);
        const action = { type: actionType };

        expect(actionDefinition.isTypeOf(action)).toBe(true);
    });

    it('should return false for action of different type', () => {
        const actionDefinition = defineAction('TYPE_A');
        const action = { type: 'TYPE_B' };

        expect(actionDefinition.isTypeOf(action)).toBe(false);
    });
});

describe('handler', () => {
    it('should return void action handler object wrapping provided handler function', () => {
        const actionType = 'TEST_ACTION';
        const handlerFn = (state: number) => state + 1;
        const actionDefinition = defineAction(actionType);

        const result = actionDefinition.handler(handlerFn);

        expect(result.actionType).toBe(actionType);
        expect(result.handleAction).toBe(handlerFn);
    });

    it('should return payload action handler object wrapping provided handler function', () => {
        const actionType = 'TEST_ACTION';
        const handlerFn = (state: number, payload: number) => state + payload;
        const actionDefinition = defineAction<number>(actionType);

        const result = actionDefinition.handler(handlerFn);

        expect(result.actionType).toBe(actionType);
        expect(result.handleAction).toBe(handlerFn);
    });
});
