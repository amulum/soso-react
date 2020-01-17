import React, { Component } from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import logo from '../images/logo192.png';
import '../style/login.css';

class Login extends Component {
  handleLogin = async () => {
    await this.props.handleStateLogin();
    console.log('localstorage islogin', localStorage.getItem('isLogin'));
    if (localStorage.getItem('isLogin') === 'true') {
      await this.props.history.replace('/');
      console.warn('cek token login', this.props.token);
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <div className="login-container source-font">
          <div className="avatar">
            <img src={logo} alt="" />
          </div>
          <div className="form-box">
            <form action="" method="" onSubmit={e => e.preventDefault()}>
              <input
                className="border-dark my-2"
                name="username"
                type="text"
                placeholder="username"
                onChange={e => this.props.setInput(e)}
              />
              <input
                className="border-dark border-top my-2"
                name="password"
                type="password"
                placeholder="password"
                onChange={e => this.props.setInput(e)}
              />
              <button
                className="btn btn-info btn-block login my-2"
                type="submit"
                onClick={() => this.handleLogin()}
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

export default connect('username, password, isLogin, token', actions)(withRouter(Login));
