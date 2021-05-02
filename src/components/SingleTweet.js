import React,{} from 'react';
import app from '../utils/firebase';
import {Link} from 'react-router-dom'


export default function SingleTweet({tweet}) {
    function removeItemFromArr(arr, value) {
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }

    const likeTweet = () =>{
        let userName = app.auth().currentUser.displayName;

        let likes = []
        if(!tweet.likes){
            likes.push(userName)
        }
        else{
            likes = tweet.likes
            if(!likes.includes(userName)){
                likes.push(userName)
            }
            else{
              removeItemFromArr(likes,userName)
            }
        }
        const tweetRef = app.database().ref('Tweets').child(tweet.id);
        tweetRef.update({
            likes: likes
        })
    }


  
    const renderLikeText = () => {
      if (tweet.userLike) return 'Unlike';
      else return 'Like';
    }
      


    return (
      <div>

          <h1> {tweet.title} </h1>

          <Link to={`/userProfile/${tweet.user}`}>
            <h2> Tweet de {tweet.user} </h2>
          </Link>
          


          <p>  {tweet.content} </p>
        <p>  {tweet.nbLikes} </p>

          <button onClick={likeTweet}>
            {renderLikeText()}
          
          </button>
         
  
      </div>
    );
  }