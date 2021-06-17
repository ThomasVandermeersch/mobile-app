import { React, useState } from "react";
import app from "../utils/firebase";
import { compareTwoStrings } from 'string-similarity';
import { Link } from 'react-router-dom'


export default function SearchUser() {
  const [userList, setUserList] = useState();

  const searchInputChange = (e) => {
    const userName = e.target.value.toLowerCase()

    const userRef = app.database().ref('Users');
    userRef.get().then(async (snapchot) => {
      const users = snapchot.val()
      const userList = []
      for (let id in users) {
        if (compareTwoStrings(users[id].name.toLowerCase(), userName) > 0.65) {
          userList.push(users[id])
        }
      }
      setUserList(userList)
    })
  }

  return (
    <div>
      <h1> Find a user </h1>
      <p> Enter user Pseudo :  <input type="text" onChange={searchInputChange} /> </p>
      <ul> {userList ? userList.map((user) =>
        <Link to={`/userProfile/${user.name}`}>
          <li>
            {user.name}
          </li>
        </Link>) : ''}  </ul>
    </div>
  );
}
