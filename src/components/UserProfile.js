import { React, useEffect, useState } from "react";
import app from "../utils/firebase";
import SingleTweet from './SingleTweet'
import Button from 'react-bootstrap/Button'

import {
  useParams
} from "react-router-dom";


export default function UserProfile() {

  // var isFollow = false;
  const [isFollow, setisFollow] = useState(false);


  let { name } = useParams(); //param de l'URL
  var userName = app.auth().currentUser.displayName;

  const [tweetList, setTweetList] = useState();

  useEffect(() => {
    const tweetRef = app.database().ref('Tweets');
    tweetRef.on('value', (snapchot) => {
      const tweets = snapchot.val()
      const tweetList = []
      for (let id in tweets) {

        if (tweets[id].user === name) {
          var nbLikes = 0;
          //Verify that likes exsit
          var userLike = false;
          if (tweets[id].likes) {
            nbLikes = tweets[id].likes.length
            if (tweets[id].likes.includes(userName)) {
              userLike = true
            }
          }
          tweetList.push({ id, nbLikes, userLike, ...tweets[id] });
        }
      }
      setTweetList(tweetList);
    })
  }, [name, userName])

  const followUser = async () => {
    let userName = app.auth().currentUser.displayName; //retrouver notre nom de user 

    const usersRef = app.database().ref('Users');
    var updated = false;

    usersRef.on('value', (snapshot) => { //get all users
      if (!updated) {
        updated = true //to avoid infity loop because of "value"
        const users = snapshot.val()
        console.log(users)
        for (let userID in users) {
          if (users[userID].name === userName) {
            const followedPersons = users[userID].follow
            followedPersons.push(name)
            const userRef = app.database().ref('Users').child(userID);
            userRef.update({
              follow: followedPersons
            })
            setisFollow(true);
          }
        }
      }
    })
  }

  const renderFollowText = () => {
    if (isFollow) return (<h2 style={{ textAlign: "right" }}>Following</h2>);
    else return (<Button variant="success" onClick={followUser}> Follow </Button>);
  }

  return (
    <div>
      {renderFollowText()}
      <h1 style={{ textAlign: "center" }}> Profile : {name} </h1>
      <div> {tweetList ? tweetList.map((tweet, index) => <SingleTweet tweet={tweet} key={index} />) : ''} </div>

    </div>
  );
}
