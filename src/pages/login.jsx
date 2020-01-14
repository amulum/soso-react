import React, { Component } from 'react';
import Header from "../components/Header"
import { withRouter } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import axios from "axios"
import logo from '../images/logo192.png'
import '../style/login.css'

class Login extends Component {
    
    handleLogin = async () => {
        await this.props.handleStateLogin();
        if (this.props.is_login === true){
            await this.props.history.replace("/");
            console.warn("cek token login", this.props.token)
        }
    };
    render () {
        return (
            <React.Fragment>
                <Header {...this.props} />
                    <div className="login-container">
                        <div className="avatar">
                            <img src={logo} alt=""/>
                            <h4 style={{ color:'black', fontWeight:'900'}}>SOSO</h4>
                        </div>
                        <div className="form-box">
                            <form action="" method="" onSubmit={e => e.preventDefault()}>
                                <input name="username" type="text" placeholder="username" onChange={e => this.props.setInput(e)} />
                                <input type="password" placeholder="password"  onChange={e => this.props.setInput(e)} />
                                <button className="btn btn-info btn-block login" type="submit" onClick={() => this.handleLogin()}>Login</button>
                            </form>
                        </div>
                    </div>   
            </React.Fragment>    
        );
    }
}

export default connect("username, password", actions)(withRouter(Login));