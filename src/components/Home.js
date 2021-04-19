import React from "react";
import app from "../utils/firebase";
import Nav from './Nav'

const Home = () => {
  return (
    <>
        <Nav/>
        <h1>Home</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Home;