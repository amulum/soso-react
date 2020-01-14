import React from 'react';
import '../style/bootstrap.min.css';
import '../style/header.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions, store } from "../store/store";

class Header extends React.Component{
    handleLogout = () => {
        this.props.setChange('auth', false);
        this.props.history.push('/');
        alert('You have succesfully logged out!')

    }

    handleCategory = (category) => {
        this.forceUpdate()
        this.props.history.push('/category/'+category);
    }

    render(){

        return(
            <React.Fragment>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand ml-5" to="/" onClick={() => store.setState({listRecipe : []})}>
                        <img src={logo} alt="logo-web" style={{height:'40px'}}/>
                        <span className="logo-name">OSO</span>
                    </Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <Link to="" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/department " className="nav-link">
                                    Department
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/category " className="nav-link">
                                    Category
                                </Link>
                            </li>
                        </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                    </form>
                        <ul className="navbar-nav ml-auto mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item mr-0">
                                <Link className="nav-link">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}


export default connect("auth, image", actions)(withRouter(Header))
