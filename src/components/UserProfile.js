import {React, useEffect, useState } from "react";
import app from "../utils/firebase";
import SingleTweet from './SingleTweet'

import {
    useParams
  } from "react-router-dom";


export default function UserProfile() {
    let { name } = useParams();
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
                if(tweets[id].likes){
                nbLikes = tweets[id].likes.length
                }
                tweetList.push({id,nbLikes, ...tweets[id]});
            }
          }
            setTweetList(tweetList);
        })
      },[name])
    return (
        <div>

            <p> ID : {name} </p>
            <div> {tweetList ? tweetList.map((tweet,index)=> <SingleTweet tweet={tweet} key={index}/> ):''} </div>

        </div>
    );
  }
