
import { React, useState } from 'react';
import app from '../utils/firebase';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from "react-router";


export default function NewTweet() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [submit, setSubmit] = useState('')


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value)
  };
  const handleImgChange = (e) => {
    setImgUrl(e.target.value)
  };




  const createTweet = () => {
    var user = app.auth().currentUser.displayName;

    const tweetRef = app.database().ref('Tweets');
    const tweet = {
      title,
      content,
      user,
      imgUrl
    };

    tweetRef.push(tweet);
    setSubmit(true)
  };

  if (submit === true) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div>

      <h2 style={{ textAlign: "center" }}>Create a Tweet </h2>


      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Subject of your tweet</Form.Label>
          <Form.Control type="text" placeholder="Enter a title here !" onChange={handleTitleChange} value={title} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your tweet</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={handleContentChange} value={content} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Image URL (optionnal) </Form.Label>
          <Form.Control type="text" placeholder="Enter a title here !" onChange={handleImgChange} value={imgUrl} />
        </Form.Group>

        <Button variant="secondary" onClick={createTweet}> Submit !</Button>

      </Form>

    </div>
  );
}