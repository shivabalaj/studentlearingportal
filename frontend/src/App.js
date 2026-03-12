import "./App.css";
import { useState } from "react";
import NavBar from "./Component/NavBar";
import Cards from "./cards/cards";

function App() {
  return (
      <>
      <NavBar/>
      <h1 style={{color:'red'}}>welcome to student learning portal</h1>
      <Cards/>
      </>
  )
}

export default App;
