import { React, useEffect, useState } from "react";
import app from "../utils/firebase";
import ListGroup from 'react-bootstrap/ListGroup'
import SingleTweet from './SingleTweet'
import 'bootstrap/dist/css/bootstrap.min.css'


const Home = () => {
  const [tweetList, setTweetList] = useState();

  var user = app.auth().currentUser;
  var userName = null
  if (!user) {
    userName = ""
  }
  else {
    userName = user.displayName
  }


  useEffect(() => {
    const tweetRef = app.database().ref('Tweets');
    tweetRef.on('value', (snapchot) => {
      const tweets = snapchot.val()
      const tweetList = []

      //Cherche notre propre user dans la database
      const usersRef = app.database().ref('Users');
      usersRef.on('value', (snapshot) => {
        const users = snapshot.val()
        var followList = null
        for (let userID in users) {
          if (users[userID].name === userName) { //va chercher dans user, notre nom, puis ajoute notre liste de follow dans la liste
            followList = users[userID].follow
          }
        }

        for (let id in tweets) {

          if (followList.includes(tweets[id].user)) { //affiche uniquement les tweet du follow
            var nbLikes = 0;
            var userLike = false;
            //Verify that field likes exist
            if (tweets[id].likes) {
              nbLikes = tweets[id].likes.length
              if (tweets[id].likes.includes(userName)) {
                userLike = true
              }
            }
            tweetList.push({ id, nbLikes, userLike, ...tweets[id] }); //concatène 
          }
        }
        setTweetList(tweetList); //update
      })
    })
  }, [userName])

  return (
    <div>

      <h2> Hello {userName} </h2>

      <ListGroup>
        {tweetList ? tweetList.map((tweet, index) => <SingleTweet tweet={tweet} key={index} />) : ''}
      </ListGroup>

      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Home;