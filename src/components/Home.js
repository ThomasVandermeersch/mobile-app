import {React, useEffect, useState } from "react";
import app from "../utils/firebase";
import Nav from './Nav'
import SingleTweet from './SingleTweet'
import {Link} from 'react-router-dom'



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
    <>
        <Nav/>
        <h2>Hello {userName} </h2>

        <Link to="/searchUser">SEARCH A USER</Link>




        <div> {tweetList ? tweetList.map((tweet,index)=> <SingleTweet tweet={tweet} key={index}/> ):''} </div>
        
        <button onClick={() => app.auth().signOut()}>Sign out</button>


        
    </>
  );
};

export default Home;