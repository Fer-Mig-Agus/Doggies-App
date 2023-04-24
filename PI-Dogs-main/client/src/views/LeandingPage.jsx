import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/views/LeandingPage.module.css';



const LeandingPage = () => {

  const navigate=useNavigate();


  return (
		<div className={styles.content}>
			<h1 className={styles.titleMain}>Welcome to Doggies</h1>

			
				<button className={styles.cssbuttonsIoButton} onClick={()=>{navigate("/home")}}>
					{' '}
					Go to Home
					<div className={styles.icon}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path
								fill="currentColor"
								d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
							></path>
						</svg>
					</div>
				</button>
				
			
		</div>
	);
}

export default LeandingPage;
