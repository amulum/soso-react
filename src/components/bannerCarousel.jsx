import React from 'react';
import '../style/bootstrap.min.css';
import '../style/header.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "unistore/react";
import { actions, store } from "../store/store";

class BannerCarousel extends React.Component {

    render() {
        return (
            <div className="row">
                <div id="carouselExampleInterval" class="carousel slide" height="100%" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-interval="1000">
                        <img src="https://i.picsum.photos/id/0/1500/900.jpg" style={{maxHeight:"50%"}} class="d-block w-100" />
                        </div>
                        <div class="carousel-item" data-interval="2000">
                        <img src="https://i.picsum.photos/id/1011/1500/900.jpg" style={{maxHeight:"50%"}} class="d-block w-100" />
                        </div>
                        <div class="carousel-item">
                        <img src="https://i.picsum.photos/id/1014/1500/900.jpg" style={{maxHeight:"50%"}} class="d-block w-100" />
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default connect("isLogin,isRegister, image, username", actions)(withRouter(BannerCarousel))