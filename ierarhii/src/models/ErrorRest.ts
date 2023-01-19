export class ErrorREST extends Error {
    public response: { status: number; message: string; detail: string|undefined };

    constructor(error: { status: number, message: string }, detail: string |undefined= undefined, ...args:any) {
        super(...args);
        this.response = {status: error.status, message: error.message, detail: detail};
    }
}