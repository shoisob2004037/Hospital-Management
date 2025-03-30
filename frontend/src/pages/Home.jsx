import React from 'react'
import Hero from '../components/Hero.jsx'
import Department from '../components/Department.jsx'
import MessageForm from '../components/MessageForm.jsx'
import Navbar from '../components/Navbar.jsx'
import FAQ from '../components/FAQ.jsx'


const Home = () => {
    return (
      <>
        <Hero
          title={
            "Welcome to e-Hospital | Your Trusted Healthcare Provider"
          }
        />
        <Department />
        <FAQ />
        <MessageForm />
      </>
    );
  };
  
  export default Home;