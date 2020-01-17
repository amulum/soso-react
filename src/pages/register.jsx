import React, { Component } from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import logo from '../images/logo192.png';
import '../style/register.css';

class Register extends Component {
  handleRegister = async () => {
    await this.props.handleStateRegister();
    if (localStorage.getItem('isRegister') === 'true') {
      await this.props.handleStateLogin();
      await this.props.history.replace('/');
      console.warn('cektoken', localStorage.getItem('token'));
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <div className="login-container w-50 source-font">
          <div className="avatar">
            <img src={logo} alt="" />
          </div>
          <div className="form-box">
            <form class="text-center border border-light p-5" onSubmit={e => e.preventDefault()}>
              <p class="h4 mb-4">Sign up</p>
              <div class="form-row mb-4">
                <div class="col">
                  <input
                    name="first_name"
                    type="text"
                    id="defaultRegisterFormFirstName"
                    class="form-control border-dark"
                    placeholder="First Name"
                    onChange={e => this.props.setInput(e)}
                  />
                </div>
                <div class="col">
                  <input
                    name="last_name"
                    type="text"
                    id="defaultRegisterFormLastName"
                    class="form-control border-dark"
                    placeholder="Last name"
                    onChange={e => this.props.setInput(e)}
                  />
                </div>
              </div>

              <input
                name="email"
                type="email"
                id="defaultRegisterFormEmail"
                class="form-control mb-4 border-dark"
                placeholder="E-mail"
                onChange={e => this.props.setInput(e)}
              />
              <input
                name="username"
                type="text"
                id="defaultRegisterFormEmail"
                class="form-control mb-4 border-dark"
                placeholder="username"
                onChange={e => this.props.setInput(e)}
              />

              <input
                name="password"
                type="password"
                id="defaultRegisterFormPassword"
                class="form-control border-top border-dark"
                placeholder="Password"
                aria-describedby="defaultRegisterFormPasswordHelpBlock"
                onChange={e => this.props.setInput(e)}
              />
              <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                At least 8 characters and 1 digit
              </small>

              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  class="custom-control-input border-dark"
                  id="defaultRegisterFormNewsletter"
                />
                <label class="custom-control-label" for="defaultRegisterFormNewsletter">
                  Subscribe to our newsletter
                </label>
              </div>

              <button
                class="btn btn-dark my-4 btn-block"
                type="submit"
                onClick={() => this.handleRegister()}
              >
                Sign in
              </button>

              <p>or sign up with:</p>

              <a href="#" class="mx-2" role="button">
                <i class="fa fa-fw fa-facebook-square"></i>
              </a>
              <a href="#" class="mx-2" role="button">
                <i class="fab fa-twitter-square"></i>
              </a>
              <a href="#" class="mx-2" role="button">
                <i class="fas fa-envelope"></i>
              </a>

              <hr />
              <p>By clicking Sign up you agree to our</p>
              <a href="" target="_blank">
                terms of service
              </a>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect('isRegister, isLogin, token', actions)(withRouter(Register));
