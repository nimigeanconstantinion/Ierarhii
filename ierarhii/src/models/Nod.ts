import Comparable from "./Comparable";


export default interface Nod<T>{
    left?:Nod<T>|null;
    right?:Nod<T>|null;
    data?:T|null;
}