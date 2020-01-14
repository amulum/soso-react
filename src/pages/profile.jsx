import React, { Component } from 'react';
import Header from "../components/Header"
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import axios from "axios"
import logo from '../images/logo-orange.svg'

const Profile = (props) => {
    const {username, fullname} = props
    if(props.auth==false){
        return(
            <Redirect to={{pathname:'/login'}}/>
        )
    } else{
        return (
            <React.Fragment>
                <Header />
                <div className="container-fluid d-flex justify-content-center">
                    <div class="card mt-3" style={{maxWidth:"100%"}}>
                        <div class="row no-gutters d-flex justify-content-center mt-3">
                            <div class="col-md-4 d-flex justify-content-center">
                                <div className="wrapper-image" style={{maxWidth: "70%"}}>
                                    <img
                                    src={require(`../images/avatar1.png`)} className="card-img rounded-circle" />
                                </div>
                            </div>
                            <div class="col-md-6 d-flex flex-column align-content-center">
                                <div class="card-body">
                                    <div className="card-title username font-weight-bold text-center">
                                        {username} username
                                    </div>
                                    <div className="card-text text-info fullname text-center">
                                        {fullname} full name lalala yeyeye
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-9">
                                <div className="wrapper-profile-info mt-5">
                                    <div class="table-responsive">
                                        <table class="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td className="w-50">Fullname</td>
                                                    <td>:</td>
                                                    <td>{fullname}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-50">Gender</td>
                                                    <td>:</td>
                                                    <td>{fullname}</td>
                                                </tr>
                                                <tr>
                                                    <td className="w-50">Phone Number</td>
                                                    <td>:</td>
                                                    <td>lalala </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-50">Twitter</td>
                                                    <td>:</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </React.Fragment>
        );
    }
}

export default connect("username, fullname, profilePicture, auth", actions)(withRouter(Profile));