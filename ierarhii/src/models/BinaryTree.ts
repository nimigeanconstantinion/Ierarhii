import Nod from "./Nod";
import Comparable from "./Comparable";


export default class BinaryTree<T extends Comparable<T>> {
    private root:Nod<T>;
    constructor(root:Nod<T>) {
        this.root=root;
    }

    public get getRoot(){
        return this.root;
    }

   public findSuccesor(current:Nod<T>|null|undefined):Nod<T>|null|undefined{

       let start:Nod<T>|null|undefined=current!.right;

        let exp=current!=null&&start?.left!=null;
        if(exp){
            return start?.left;
        }

        return this.findSuccesor(start?.right);

   }

    public insert(data:T,nod:Nod<T>){



        if(nod.data!=null){
            if(nod.data.compareTo(data)>0){

                if(nod.left!=null){
                    this.insert(data,nod.left);
                }else{
                    let newNod={
                        data:data,
                        left:null,
                        right:null
                    };

                    nod.left=newNod;
                }
            }else if(nod.data.compareTo(data)<0){

                if(nod.right!=null){
                    this.insert(data,nod.right);
                }else{
                    let newNod={
                        data:data,
                        left:null,
                        right:null
                    };
                    nod.right=newNod;
                }
            }
        }
    }

    public traverse():void{
        //.clear();
        console.log("------------------La traversare----");
        let coada:Nod<T>[]=[];
        coada.push(this.root);
        console.log("ROOT");

        while (coada.length>0){
            let nL=coada[coada.length-1].left;
            let nR=coada[coada.length-1].right;

            if(nL!=null){
                coada.push(nL);
            }
            if(nR!=null){
                coada.push(nR);
            }
            console.log(coada[0]);
            coada.shift();

        }

    }

    public removeNod(current:Nod<T>|null|undefined,dt:T):Nod<T>|null|undefined{
        if(current==null){
            return null;
        }else{
            if(current.data!.compareTo(dt)>0){
                    current.left=this.removeNod(current.left,dt);
            }else if(current.data!.compareTo(dt)<0){
                    current.right=this.removeNod(current.right,dt);
            }else{
                    //nu are copii
                if(current.left==null&&current.right==null){
                    current=null;
                }else if(current.left==null) {
                    let tmp:Nod<T>|null=current;
                    current=tmp.right;
                    tmp=null;
                }else if(current.right==null){
                    let tmp:Nod<T>|null=current;
                    current=tmp.left;
                    tmp=null;

                }else{
                    let tmp:Nod<T>|null|undefined=this.findSuccesor(current);
                    current.data=tmp!.data;
                    if(tmp?.data){
                        current.right=this.removeNod(current.right,tmp?.data);

                    }
                    tmp=null;
                }


            }

        }
        return current;
    }
}