import {React, useEffect, useState } from "react";
import app from "../utils/firebase";
import SingleTweet from './SingleTweet'

import {
    useParams
  } from "react-router-dom";


export default function UserProfile() {
    let { name } = useParams();
    var userName = app.auth().currentUser.displayName;

    const [tweetList,setTweetList] = useState();

    useEffect(()=>{
        const todoRef = app.database().ref('Tweets');
        todoRef.on('value',(snapchot)=>{
          const tweets = snapchot.val()
          const tweetList = []
          for(let id in tweets ){

            if(tweets[id].user === name ){
                var nbLikes = 0;
                //Verify that likes exsit
                var userLike = false;
                if(tweets[id].likes){
                  nbLikes = tweets[id].likes.length
                  console.log(name)
                  console.log(tweets[id].likes)
                  if(tweets[id].likes.includes(userName)){
                    userLike = true
                  }
                }
                tweetList.push({id,nbLikes,userLike, ...tweets[id]});
            }
          }
            setTweetList(tweetList);
        })
      },[name,userName])
    return (
        <div>

            <p> ID : {name} </p>
            <div> {tweetList ? tweetList.map((tweet,index)=> <SingleTweet tweet={tweet} key={index}/> ):''} </div>

        </div>
    );
  }
