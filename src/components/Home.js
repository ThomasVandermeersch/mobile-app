import {React, useEffect, useState } from "react";
import app from "../utils/firebase";
import ListGroup from 'react-bootstrap/ListGroup'
import SingleTweet from './SingleTweet'
import 'bootstrap/dist/css/bootstrap.min.css'


const Home = () => {
  const [tweetList,setTweetList] = useState();



  var user = app.auth().currentUser;
  var userName = null
  if(!user){
    userName = ""
  }
  else{
    userName = user.displayName
  }




    
  

  useEffect(()=>{
    const todoRef = app.database().ref('Tweets');
    todoRef.on('value',(snapchot)=>{
      const tweets = snapchot.val()
      const tweetList = []
      for(let id in tweets ){
        var nbLikes = 0;
        var userLike = false;
        //Verify that likes exsit
        if(tweets[id].likes){
          nbLikes = tweets[id].likes.length
          if(tweets[id].likes.includes(userName)){
            userLike = true
          }
        }
        tweetList.push({id,nbLikes,userLike, ...tweets[id]});
      }
        setTweetList(tweetList);
    })
  },[userName])

  return (
    <div>

        <h2> Bonjour {userName} </h2>

        <ListGroup>
          {tweetList ? tweetList.map((tweet,index)=> <SingleTweet tweet={tweet} key={index}/> ):''}
        </ListGroup>
        
        <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
  );
};

export default Home;