import React from 'react';
import '../style/bootstrap.min.css';
import '../style/cardProduct.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class CardProduct extends React.Component
{
  handleProductDetail = () =>
  {
    store.setState({ selectedProduct: this.props.pathname });
    console.log(this.props.selectedProduct);
    this.props.history.push('/product/' + this.props.pathname);
  };
  render()
  {
    return (
      <Link
        onClick={() => this.handleProductDetail()}
        style={{ textDecoration: 'none' }}
      >
        <div className="image-wrapper" width="100%">
          <img src={this.props.image_path} class="card-img-top" />
        </div>
        <div className="product-name">
          <h3 className="text-center heading3 mb-0">{this.props.name}</h3>
        </div>
        <div className="sub-name d-flex justify-content-center flex-column">
          <small className="text-center heading4">{this.props.sub_name}</small>
          <p className="text-center heading3 mb-0">{this.props.sell_price}</p>
        </div>
        <div className="reduce-price-holder d-flex justify-content-center">
          <small className="text-center heading4 mr-2" style={{ textDecoration: 'line-through' }}>{this.props.price}</small>
          <small className="text-center heading4">[{this.props.discount}%]</small>
        </div>
      </Link>
      // <div className="col-sm-6 col-md-3 m-0 border-0 heading2">
      //   <div class="card p-0 bg-white" style={{ height: '100%' }}>
      //     <img src={this.props.image_path} class="card-img-top" />
      //     <div class="card-body bg-white mb-0">
      //       <p class="card-text heading3" style={{ fontSize: '4vh' }}>
      //         {this.props.name}
      //       </p>
      //       <small className="heading4">{this.props.sub_name}</small>
      //     </div>
      //     <div className="card-footer bg-white border-0">
      //       <div className="wrap-price justify-content-start d-flex flex-row">
      //         <div className="wrap-price-specify d-flex flex-column">
      //           {this.props.discount > 0 ? (
      //             <div
      //               className="wrapper-discount d-flex flex-column"
      //               style={{ width: '100%' }}
      //             >
      //               <span className="heading3 mb-1">{this.props.discount}% OFF</span>
      //               <small
      //                 className="heading4"
      //                 style={{ textDecoration: 'line-through' }}
      //               >
      //                 {this.props.price}
      //               </small>
      //             </div>
      //           ) : null}
      //           <span className="heading3">{this.props.sell_price}</span>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    )
  }
};

export default connect(
  'selectedProduct, isLogin,isRegister, image, username',
  actions
)(withRouter(CardProduct));
