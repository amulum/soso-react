import React from 'react';
import '../style/bootstrap.min.css';
import '../style/cardProduct.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class CardProduct extends React.Component {
  handleProductDetail = () => {
    store.setState({ selectedProduct: this.props.pathname });
    console.log(this.props.selectedProduct);
    this.props.history.push('/product/' + this.props.pathname);
  };
  render() {
    return (
      <div className="col-sm-12 col-md-3 my-3 border-0 heading2">
        <Link
          onClick={() => this.handleProductDetail()}
          style={{ textDecoration: 'none' }}
        >
          <div class="card p-3 bg-white" style={{ height: '100%' }}>
            <img src={this.props.image_path} class="card-img-top" />
            <div class="card-body bg-white mb-0">
              <p class="card-text heading3" style={{ fontSize: '4vh' }}>
                {this.props.name}
              </p>
              <small className="heading4">{this.props.sub_name}</small>
            </div>
            <div className="card-footer bg-white border-0">
              <div className="wrap-price justify-content-start d-flex flex-row">
                <div className="wrap-price-specify d-flex flex-column">
                  {this.props.discount > 0 ? (
                    <div
                      className="wrapper-discount d-flex flex-column"
                      style={{ width: '100%' }}
                    >
                      <span className="heading3 mb-1">{this.props.discount}% OFF</span>
                      <small
                        className="heading4"
                        style={{ textDecoration: 'line-through' }}
                      >
                        {this.props.price}
                      </small>
                    </div>
                  ) : null}
                  <span className="heading3">{this.props.sell_price}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default connect(
  'selectedProduct, isLogin,isRegister, image, username',
  actions
)(withRouter(CardProduct));
