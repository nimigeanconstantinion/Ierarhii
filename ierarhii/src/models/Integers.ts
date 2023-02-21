import Comparable from "./Comparable";

export default class Integers implements Comparable<Integers>{
     data:number;

     constructor(data:number) {
         this.data=data;
     }


    public compareTo(t: Integers): number {
        if(this.data<t.data){
            return -1;
        }else if(this.data>t.data){
            return 1;
        }
        return 0;
    }
    public equals(t:Integers):boolean{
         return this.data==t.data;
    }
}