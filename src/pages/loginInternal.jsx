
// login admin and seller
// username admin bebas, khusus seller untungnya untuk usernamenya
import React, { Component } from 'react';
import Header from '../components/header';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import logo from '../images/logo192.png';
import '../style/login.css';

class LoginInternal extends Component
{
  handleLoginInternal = async () =>
  {
    // cekk username password internal bedain admin sama seller
    // case admin
    const { internalUsername, internalPassword } = this.props
    // verify seller
    if (internalUsername !== '' && internalPassword !== '')
    {
      let handleLoginAPI, afterLoginPath
      if (internalUsername.slice(-2) === 'VS')
      {
        handleLoginAPI = this.props.handleInternalState('seller')
        afterLoginPath = '/seller'
      } else
      {
        handleLoginAPI = this.props.handleInternalState('admin')
        afterLoginPath = '/admin'

      }

      console.log('otw axios dari login', internalUsername)
      console.log('otw axios dari login', internalPassword)
      await handleLoginAPI;
      console.log('localstorage internal islogin', localStorage.getItem('internalIsLogin'));
      if (localStorage.getItem('internalIsLogin') === 'true')
      {
        console.log('masuk internal')
        await this.props.history.replace(afterLoginPath);
      }

    }
  }
  render()
  {
    if (localStorage.getItem('internalIsLogin') === 'true')
    {
      // case already login but access internal login page
      if (localStorage.getItem('internalIdentity') === 'admin')
      {
        return (
          <Redirect to="/admin" />
        )
      } else
      {
        return (
          <Redirect to="/admin" />
        )
      }
    } else
    {
      // case not login yet
      return (
        <React.Fragment>
          <div className="login-container source-font">
            <div className="internal-text source-font font-weight-bold" style={{ fontSize: "2em", color: "#201e1e" }}>
              INTERNAL
            </div>
            <div className="avatar">
              <img src={logo} alt="" />
            </div>
            <div className="form-box">
              <form action="" method="" onSubmit={e => e.preventDefault()}>
                <input
                  className="border-dark my-2 form-control"
                  name="internalUsername"
                  type="text"
                  placeholder="username"
                  onChange={e => this.props.setInput(e)}
                  required
                />
                <input
                  className="border-dark border-top my-2 form-control"
                  name="internalPassword"
                  type="password"
                  placeholder="password"
                  onChange={e => this.props.setInput(e)}
                  required
                />
                <button
                  className="btn btn-info btn-block login my-2"
                  type="submit"
                  onClick={() => this.handleLoginInternal()}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(LoginInternal));
