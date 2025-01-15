import React from "react";
import { Link } from "react-router-dom";
import Maincomponent from "../Componets/Maincomponent";

const Home = () => {
  return (
    <>
       <h2 className="grid-title">title</h2>

      <Link to={"/register"}>Register</Link>
      <br />
      <Link to={"/login"}>login</Link>

      <Link className="auth" to="/watchlist">Watchlist</Link>
      
      <br />
      <Maincomponent />
    </>
  );
};

export default Home;
