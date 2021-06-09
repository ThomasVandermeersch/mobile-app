import React from 'react'
import {Nav,Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom'

export default function Navigation() {
  

    return (
        <div>

        <Navbar bg="dark" variant="dark"> 
            <Nav className="mr-auto">
                <li class="nav-item"> <Link to="/" class="nav-link active">Twitter</Link> </li>
                <li class="nav-item"> <Link to="/add" class="nav-link active">New</Link> </li>
                <li class="nav-item"> <Link to="/searchUser" class="nav-link active">Search</Link> </li>
            </Nav>
        </Navbar>

        </div>
    );
  }
