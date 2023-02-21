import ResponseImpl from "./ResponseImpl";

export default interface ErrorRest<T> extends Error , ResponseImpl<T>{
    data?:T,
}