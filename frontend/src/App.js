import "./App.css";
import NavBar from "./Component/NavBar";
import Footer from "./Component/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
