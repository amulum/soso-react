import React from 'react';
import '../style/bootstrap.min.css';
import '../style/header.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

const BannerCarousel = (props) =>
{
  return (
    <div
      id='carouselExampleInterval'
      class='carousel slide'
      height='100%'
      data-ride='carousel'>
      <div class='carousel-inner'>
        <div class='carousel-item active' data-interval='1000'>
          <img
            src={require('../images/banner1.jpg')}
            style={{ maxHeight: '50%' }}
            class='d-block w-100'
          />
        </div>
        <div class='carousel-item' data-interval='2000'>
          <img
            src={require('../images/banner2.jpg')}
            style={{ maxHeight: '50%' }}
            class='d-block w-100'
          />
        </div>
        <div class='carousel-item'>
          <img
            src={require('../images/banner3.jpg')}
            style={{ maxHeight: '50%' }}
            class='d-block w-100'
          />
        </div>
      </div>
      <a
        class='carousel-control-prev'
        href='#carouselExampleInterval'
        role='button'
        data-slide='prev'>
        <span class='carousel-control-prev-icon' aria-hidden='true'></span>
        <span class='sr-only'>Previous</span>
      </a>
      <a
        class='carousel-control-next'
        href='#carouselExampleInterval'
        role='button'
        data-slide='next'>
        <span class='carousel-control-next-icon' aria-hidden='true'></span>
        <span class='sr-only'>Next</span>
      </a>
    </div>
  );
}

export default connect(
  'isLogin,isRegister, image, username',
  actions,
)(withRouter(BannerCarousel));
