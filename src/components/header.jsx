import React from 'react';
import '../style/bootstrap.min.css';
import '../style/header.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import Swal from 'sweetalert2'

class Header extends React.Component
{
  handleLogout = () =>
  {
    this.props.handleLogoutState();
    this.props.history.push('/');
    Swal.fire({
      icon: 'success',
      title: 'Logout Success',
      text: 'Thanks for visiting our site, See you next time !'
    })
  };

  handleCategory = async category =>
  {
    await this.props.setChange('isLoading', true);
    await store.set({ selectedCategory: category })
    console.log('selectedCat', this.props.selectedCategory)
    console.log('category', category)
    await this.props.history.push({
      pathname: `/category/${ category }`
    });
  };

  handleSearch = async () =>
  {
    await this.props.setChange('isLoading', true);
    console.log('search header', this.props.selectedProduct);
    await this.props.history.replace({
      pathname: `/search/${ this.props.selectedProduct }`
    });
  };

  handleGetBag = async () =>
  {
    this.props.getMyBag();
  };

  render()
  {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-sticky">
        <Link className="navbar-brand ml-5" to="/">
          <img src={logo} alt="logo-web" style={{ height: '40px' }} />
          <span className="logo-name">OSO</span>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link to="" className="nav-link heading2">
                Home
              </Link>
            </li>
            <li class="nav-item dropdown heading2">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Department
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/department/1">Makeup</a>
                <a className="dropdown-item" href="/department/2">Skincare</a>
                <a className="dropdown-item" href="/department/4">Bath and Body</a>
              </div>
            </li>
            <li class="nav-item dropdown heading2">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Category
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/category/1">Category 1</a>
                <a className="dropdown-item" href="/category/2">Category 2</a>
                <a className="dropdown-item" href="/category/3">Category 3</a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0" onSubmit={e => e.preventDefault()}>
            <input
              name="selectedProduct"
              class="form-control mr-sm-2 heading2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={e => this.props.setInput(e)}
            />
            <button
              class="btn btn-outline-dark my-2 my-sm-0 heading2"
              type="submit"
              onClick={() => this.handleSearch()}
            >
              <i class="fa fas fa-search"></i>
            </button>
          </form>
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
            {localStorage.getItem('isLogin') ? (
              <li className="nav-item">
                <Link className="nav-link heading2" onClick={this.handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
                <li className="nav-item">
                  <Link className="nav-link heading2" to="/login">
                    Login
                </Link>
                </li>
              )}
            {localStorage.getItem('isRegister') ? (
              <li className="nav-item mr-0">
                <Link className="nav-link heading2" to="/me">
                  Hi {localStorage.getItem('username')}
                </Link>
              </li>
            ) : (
                <li className="nav-item mr-0">
                  <Link className="nav-link heading2" to="/register">
                    Register
                </Link>
                </li>
              )}
          </ul>
        </div>
      </nav >
    );
  }
}

export default connect(
  'isLogin,isRegister, image, username, selectedProduct, selectedCategory',
  actions
)(withRouter(Header));
