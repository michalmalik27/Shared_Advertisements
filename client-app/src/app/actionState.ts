
export enum ActionStates {
    INIT = 'init',
    IN_PROCESS = 'inProcess',
    IS_COMPLETED = 'isCompleted',
    IS_FAILED = 'isFailed',
};

export interface ActionState {
    action: ActionStates,
    message: string
}