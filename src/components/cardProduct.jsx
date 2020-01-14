import React from 'react';
import '../style/bootstrap.min.css';
import '../style/listProduct.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions, store } from "../store/store";

export default connect("isLogin,isRegister, image, username", actions)(withRouter(ListProduct))
