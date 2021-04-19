import React from "react";
import app from "../utils/firebase";
import Nav from './Nav'

const Home = () => {
    var user = app.auth().currentUser;
    if (user != null) {
            console.log(user.displayName)
    }
  return (
    <>
        <Nav/>
        <h1>Home</h1>
        <h2>Hello {user.displayName} </h2>
        
        <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Home;