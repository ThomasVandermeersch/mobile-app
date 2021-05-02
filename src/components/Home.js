import {React, useEffect, useState } from "react";
import app from "../utils/firebase";
import Nav from './Nav'
import SingleTweet from './SingleTweet'
import { Redirect } from "react-router";
import {Link} from 'react-router-dom'



const Home = () => {
  const [tweetList,setTweetList] = useState();
  const [searchUserInput, setsearchUserInput] = useState('');

  const handlesearUserChange = (e) => {
    setsearchUserInput(e.target.value);
  };

  var user = app.auth().currentUser;
  var userName = null
  if(!user){
    userName = ""
  }
  else{
    userName = user.displayName
  }

  const searchUser = () => {
    console.log(searchUserInput)

    return(
      <Redirect to="/searchUser"/>
    )
    
  }

  useEffect(()=>{
    const todoRef = app.database().ref('Tweets');
    todoRef.on('value',(snapchot)=>{
      const tweets = snapchot.val()
      const tweetList = []
      for(let id in tweets ){
        var nbLikes = 0;
        //Verify that likes exsit
        if(tweets[id].likes){
          nbLikes = tweets[id].likes.length
        }
        tweetList.push({id,nbLikes, ...tweets[id]});
      }
        setTweetList(tweetList);
    })
  },[])

  return (
    <>
        <Nav/>
        <h2>Hello {userName} </h2>

        <p>Entrez un utilisateur : </p> <input type="text" onChange={handlesearUserChange}/>
        <button onClick={searchUser}> Search user </button>
        <Link to="/searchUser">SEARCH</Link>




        <div> {tweetList ? tweetList.map((tweet,index)=> <SingleTweet tweet={tweet} key={index}/> ):''} </div>
        
        <button onClick={() => app.auth().signOut()}>Sign out</button>


        
    </>
  );
};

export default Home;