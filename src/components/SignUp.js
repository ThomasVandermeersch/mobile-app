import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../utils/firebase";
import {Link} from 'react-router-dom'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, name, password } = event.target.elements;
    
    const userRef = app.database().ref('Users');
    userRef.get().then(async (snapchot)=>{
      const users = snapchot.val()
      for(let id in users ){
        if(users[id].name === name.value){
          return alert("Pseudo already exist")
        }
      }
    

      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
            .then(authenticate=>{
              return authenticate.user
              .updateProfile({
              displayName: name.value
              })
              
            });
        const usersRef = app.database().ref('Users');
        usersRef.push({name:name.value});
        history.push("/");



      } catch (error) {
        alert(error);
      }
    })
    }, [history]);


  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Pseudo
          <input name="name" type="text" placeholder="Name" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/Login"><button>Connect to existing account</button></Link> 
    </div>
  );
};

export default withRouter(SignUp);