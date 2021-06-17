import React, { } from 'react';
import app from '../utils/firebase';
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export default function SingleTweet({ tweet }) {
  function removeItemFromArr(arr, value) { //barbaric, but it works -- removes like
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const likeTweet = () => { //hyper barbaric, but again, it works
    let userName = app.auth().currentUser.displayName;

    let likes = []
    if (!tweet.likes) {
      likes.push(userName)
    }
    else {
      likes = tweet.likes
      if (!likes.includes(userName)) {
        likes.push(userName)
      }
      else {
        removeItemFromArr(likes, userName)
      }
    }
    const tweetRef = app.database().ref('Tweets').child(tweet.id); //need the id to make update
    tweetRef.update({   //gets id from home (line 50)
      likes: likes
    })
  }



  const renderLikeText = () => { //G - R
    if (tweet.userLike) return (<Button variant="danger" onClick={likeTweet}> Unlike</Button>);
    else return (<Button variant="success" onClick={likeTweet}> Like </Button>);
  }

  return ( //render
    <ListGroup.Item>


      <Link to={`/userProfile/${tweet.user}`}>
        <p> Tweet from {tweet.user} </p>
      </Link>

      <h4> {tweet.title} </h4>
      <p>  {tweet.content} </p>

      <img width="300" src={tweet.imgUrl} alt=""></img>


      <p>  {tweet.nbLikes}             {renderLikeText()}</p>



    </ListGroup.Item>
  );
}