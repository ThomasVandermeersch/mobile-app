
import React, { useState } from 'react';
import firebase from '../utils/firebase';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Forme() {
  const [title, setTitle] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const createTodo = () => {
    const todoRef = firebase.database().ref('Todo');
    const todo = {
      title,
      complete: false,
    };

    todoRef.push(todo);
  };
  return (
    <div>

        <h2 style={{textAlign: "center"}}>Create a Tweet </h2>


        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Subject of your tweet</Form.Label>
            <Form.Control type="text" placeholder="Enter a title here !" onChange={handleOnChange} value={title} />
          </Form.Group>
        
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Your tweet</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        
          <Button variant="secondary" onClick={createTodo}> Submit !</Button>

        </Form>

    </div>
  );
}