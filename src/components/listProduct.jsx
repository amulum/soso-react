import React from 'react';
import '../style/bootstrap.min.css';
import '../style/listProduct.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions, store } from "../store/store";

class ListProduct extends React.Component {
    
    render() {
        return (
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni asperiores sed odio officiis impedit, id perferendis quas aut totam soluta? Illo provident magnam officiis fugit. Vero totam quam velit voluptate.</p>
        )
    }
}


export default connect("isLogin,isRegister, image, username", actions)(withRouter(ListProduct))
