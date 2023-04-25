import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../assets/styles/components/Nav.module.css";

const Nav = () => {
  return (
    <div>
        <div className={styles.contentLink}>
            <Link to="/home" className={styles.link} ><h3 className={styles.item}>Home</h3></Link>
            <Link to="/form"  className={styles.link}><h3 className={styles.item}>Create</h3></Link>
            <Link to="/about"  className={styles.link}><h3 className={styles.item}>About me</h3></Link>
        </div>
    </div>
  )
}

export default Nav
