export declare enum ErrorEnvironment {
    Unknown = 0,
    Genetic = 1,
    History = 2,
    Core = 3
}
export declare class DebutError {
    env: ErrorEnvironment;
    message: string;
    constructor(env: ErrorEnvironment, msg: string);
    private getErrorMessage;
}
