import React from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Nav() {
  
    return (
        <div>
            <nav>
                <ul>
                    <li> <Link to="/add">Add</Link> </li>
                    <li> <Link to="/">Home</Link> </li>
                </ul>
        </nav>

        </div>
    );
  }
