import React from 'react';
import './App.css';
import {Todolists} from "./components/Todolists/Todolists";
import {useSelector} from "react-redux";
import {RootReduceType} from "./components/reduce/Store";

function App() {
    console.log(useSelector<RootReduceType, RootReduceType>(state => state))
  return (
    <div className="App">
   <Todolists/>
    </div>
  );
}

export default App;
