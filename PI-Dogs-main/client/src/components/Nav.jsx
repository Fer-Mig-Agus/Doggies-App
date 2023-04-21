import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../assets/styles/components/Nav.module.css";

const Nav = () => {
  return (
    <div>
        <div className={styles.contentLink}>
            <Link to="/home"><h3 className={styles.link}>Home</h3></Link>
            <Link to="/form"><h3 className={styles.link}>Create</h3></Link>
            <Link to="/about"><h3 className={styles.link}>About me</h3></Link>
        </div>
    </div>
  )
}

export default Nav
