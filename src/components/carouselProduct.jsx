import React from 'react';
import '../style/bootstrap.min.css';
import '../style/cardProduct.css';
import CardProduct from '../components/cardProduct'
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/carouselProduct.css'
import { render } from '@testing-library/react';

// butuh bootstrap carousel tp isinya diganti container row container
// coba row col dulu kalo gabisa container row col
// logic yg dari repli it
// list slice kalo panjangnya lebih dari 5
// else masukin aja semua di active
// benerin tembak product dengan page inputan
// jadi di home bisa all product max 40 items

// input list product blm di slice output carousel
class CarouselProduct extends React.Component
{
  render()
  {
    console.log('masuk caraousel', this.props.listInputCarousel)
    let listInput = this.props.listInputCarousel.slice(0, this.props.listInputCarousel.length)
    console.log('masuk caraousel', listInput)
    const listActive = listInput.slice(0, 5)
    const listPassive = listInput.splice(5, listInput.length)
    console.log('active', listActive)
    console.log('passive', listPassive)
    const loopActive = listActive.map((item, key) =>
    {
      console.log(item);
      return (
        <div className="col-md-2 col-sm-6 col-xs-12 mt-1 px-0 border-light border rounded">
          <CardProduct
            image_path={item.Details.image_path}
            name={item.Details.name}
            sub_name={item.Details.sub_name}
            discount={item.Details.discount}
            price={item.Details.price}
            sell_price={item.Details.sell_price}
            pathname={item.Details.name}
          />
        </div>
      );
    });
    const loopPassive = listPassive.map((item, key) =>
    {
      console.log('passive', item);
      return (
        <div className="col-md-2 col-sm-6 col-xs-12 mt-1 px-0 border-light border rounded">
          <CardProduct
            image_path={item.Details.image_path}
            name={item.Details.name}
            sub_name={item.Details.sub_name}
            discount={item.Details.discount}
            price={item.Details.price}
            sell_price={item.Details.sell_price}
            pathname={item.Details.name}
          />
        </div>
      );
    });
    // const loopComplete = () =>
    // {
    //   let numberLoop = Math.ceil(listPassive.length / 5)
    //   for (let index = 0; index < numberLoop; index++)
    //   {
    //     return (
    //       <div className="item carousel-item">
    //         <div className="row justify-content-center">
    //           {loopPassive}
    //         </div>
    //       </div>
    //     )
    //   }
    // }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">
              <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="item carousel-item active">
                  <div className="row justify-content-center">
                    {loopActive}
                  </div>
                </div>
                <div className="item carousel-item">
                  <div className="row justify-content-center">
                    {loopPassive}
                  </div>
                </div>
                <div className="item carousel-item">
                  <div className="row justify-content-center">
                    {loopPassive}
                  </div>
                </div>
              </div>
              <a className="carousel-control right carousel-control-prev" href="#myCarousel" data-slide="next">
                <i className="fa fa-angle-right"></i>
              </a>
              <a className="carousel-control left carousel-control-next" href="#myCarousel" data-slide="prev">
                <i className="fa fa-angle-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  'selectedProduct, isLogin,isRegister, image, username',
  actions
)(withRouter(CarouselProduct));