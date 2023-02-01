import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./components/Home/index";
import Persoana from "./models/Persoana";
import Manager from "./models/Manager";
import BinaryTree from "./models/BinaryTree";
import Nod from "./models/Nod";
import Integers from "./models/Integers";

function App() {
    let int:Integers=new Integers(12);
    let root:Nod<Integers>={
        data:int,
        left:null,
        right:null
    }
    let tree=new BinaryTree(root);
    int=new Integers(10);
    let nod:Nod<Integers>={
        data:int,
        left:null,
        right:null
    }
    tree.insert(int,root);
    int=new Integers(8);
    tree.insert(int,root);

    int=new Integers(11);
    tree.insert(int,root);
    int=new Integers(9);
    tree.insert(int,root);

    int=new Integers(18);
    tree.insert(int,root);
    int=new Integers(15);
    tree.insert(int,root);
    int=new Integers(20);
    tree.insert(int,root);
    int=new Integers(16);
    tree.insert(int,root);
    int=new Integers(17);
    tree.insert(int,root);

    console.log("------------------Tree---------------")
    console.log(tree);
    console.log("=============================");
    int=new Integers(12);
    console.log(tree.removeNod(root,int));




  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
        <Home/>

      </header>
    </div>
  );
}

export default App;
