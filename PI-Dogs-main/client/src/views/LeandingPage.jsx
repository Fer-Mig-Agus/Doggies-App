import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/views/LeandingPage.module.css';



const LeandingPage = () => {
  return (
    <div className={styles.content}>
      <h1>Bienvenido a Doggies</h1>

      <Link to='/home'><h2>Ir a Home</h2></Link>
      
    </div>
  )
}

export default LeandingPage;
