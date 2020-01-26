import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import logo from '../images/logo192.png';
import '../style/sideNav.css'
import '../style/bootstrap.min.css';
import '../style/header.css';

const SideNav = (props) =>
{
  return (
    <React.Fragment>
      <div id="mySidenav" class="sidenav source-font">
        <a href="javascript:void(0)" class="closebtn" onClick={() => props.handleCloseNav()}>&times;</a>
        {localStorage.getItem('internalIdentity') === 'admin' ?
          <ul className="m-0 p-3 ml-3 ">
            <Link href="#">ADMIN</Link>
            <ul className="pl-4">
              <Link to="#" className="pl-0">Get</Link>
              <Link to="#" className="pl-0">Post</Link>
              <Link to="#" className="pl-0">Update</Link>
              <Link to="#" className="pl-0">Delete</Link>
            </ul>
            <Link to="#">SELLER</Link>
            <ul className="pl-4">
              <Link to="#" className="pl-0">Get</Link>
              <Link to="#" className="pl-0">Post</Link>
              <Link to="#" className="pl-0">Update</Link>
              <Link to="#" className="pl-0">Delete</Link>
            </ul>
            <Link to="#">CUSTOMER</Link>
            <ul className="pl-4">
              <Link to="#" className="pl-0">Get</Link>
              <Link to="#" className="pl-0">Post</Link>
              <Link to="#" className="pl-0">Update</Link>
              <Link to="#" className="pl-0">Delete</Link>
            </ul>
          </ul>
          :
          <ul className="m-0 p-0">
            <Link href="#">PROFILE</Link>
            <Link href="#">PRODUCTS</Link>
            <ul className="pl-4">
              <Link href="#" className="pl-0">Get</Link>
              <Link href="#" className="pl-0">Post</Link>
              <Link href="#" className="pl-0">Update</Link>
              <Link href="#" className="pl-0">Delete</Link>
            </ul>
          </ul>
        }
      </div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-sticky">
        <Link className="navbar-brand ml-1" onClick={() => props.handleOpenNav()}>
          <img src={logo} alt="logo-web" style={{ height: '40px' }} />
          <span className="logo-name">OSO</span>
        </Link>
        <ul className="navbar-nav ml-auto mt-lg-0">
          {localStorage.getItem('isLogin') ? (
            <li className="nav-item">
              <Link className="nav-link heading2" to="/mybag">
                <span>
                  <i class="fa fas fa-shopping-bag fa-2x"></i>
                </span>
              </Link>
            </li>
          ) : null}
          {localStorage.getItem('internalIsLogin') ? (
            <React.Fragment>

              <li className="nav-item">
                <Link className="nav-link heading2" to="/me">
                  Welcome, {localStorage.getItem('internalUsername')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link heading2" to="/internal/login" onClick={props.handleInternalLogout}>
                  Logout
                </Link>
              </li>
            </React.Fragment>
          ) : (
              <li className="nav-item">
                <Link className="nav-link heading2" to="/internal/login">
                  Login
                </Link>
              </li>
            )}
        </ul>
      </nav >
    </React.Fragment >
  )

}
export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(SideNav));