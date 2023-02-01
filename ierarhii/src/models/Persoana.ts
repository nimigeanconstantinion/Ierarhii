import Manager from "./Manager";
import Comparable from "./Comparable";


export default class Persoana implements Comparable<Persoana>{
    id:number;
    fullname: string;
    position: string;
    age:number;
    salary:number;
    parinte:Manager;

    constructor(id:number,fullname:string,position:string,age:number,salary:number,parinte:Manager) {
        this.id=id;
        this.fullname=fullname;
        this.position=position;
        this.age=age;
        this.salary=salary;
        this.parinte=parinte;
    }

    public compareTo=(persoana:Persoana):number=>{
        if(this.age<persoana.age){
            return -1;
        }else if(this.age>persoana.age){
            return 1;
        }
        return 0;
    };


}