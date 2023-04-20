import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../assets/styles/components/Nav.module.css";

const Nav = () => {
  return (
    <div>
        <div>
            <Link to="/home"><h3>Home</h3></Link>
            <Link to="/form"><h3>Create</h3></Link>
            <Link to="/about"><h3>About me</h3></Link>
        </div>
    </div>
  )
}

export default Nav
