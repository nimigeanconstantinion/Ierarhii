

export default interface Nod<T>{
    left?:Nod<T>;
    right?:Nod<T>;
    data:T;
}