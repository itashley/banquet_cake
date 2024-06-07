import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Header from '../components/Navbar'
import Footer from '../components/Footer';
const Dashboard = () => {


  return (
    <>
    <Header/>
    <div className='container-fluid mt-2'>
      
      <span></span>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;


