// card item details di page product/sesuatu
import React, { Component } from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/cardDetails.css';

class CardDetails extends React.Component {
  handleBagState = async () => {
    // jalankan fungsi nembak axios
    // push ke bag
    if (localStorage.getItem('isLogin')) {
      await store.setState({ productToBag: this.props.product_id });
      console.log('handlebagstate', this.props.productToBag);
      await store.setState({ amountToBag: 1 });
      console.log('amount to bag', this.props.amountToBag);

      await this.props.postProductToBag();
      await this.props.history.push('/mybag');
    } else {
      alert('Please Login to get your item :)');
      await this.props.history.push('/login');
    }
  };

  handleOrderState = () => {
    // jalankan fungsi nembak axios
    // push ke bag
  };
  render() {
    return (
      <div class="card">
        <div class="container-fliud">
          <div class="wrapper row">
            <div class="preview col-md-6">
              <div class="preview-pic tab-content">
                <div class="tab-pane active" id="pic-1">
                  <img src={this.props.image_path} />
                </div>
                <div class="tab-pane" id="pic-2">
                  <img src={this.props.image_path} />
                </div>
                <div class="tab-pane" id="pic-3">
                  <img src={this.props.image_path} />
                </div>
                <div class="tab-pane" id="pic-4">
                  <img src={this.props.image_path} />
                </div>
                <div class="tab-pane" id="pic-5">
                  <img src={this.props.image_path} />
                </div>
              </div>
              <ul class="preview-thumbnail nav nav-tabs">
                <li class="active">
                  <a data-target="#pic-1" data-toggle="tab">
                    <img src={this.props.image_path} />
                  </a>
                </li>
                <li>
                  <a data-target="#pic-2" data-toggle="tab">
                    <img src={this.props.image_path} />
                  </a>
                </li>
                <li>
                  <a data-target="#pic-3" data-toggle="tab">
                    <img src={this.props.image_path} />
                  </a>
                </li>
                <li>
                  <a data-target="#pic-4" data-toggle="tab">
                    <img src={this.props.image_path} />
                  </a>
                </li>
                <li>
                  <a data-target="#pic-5" data-toggle="tab">
                    <img src={this.props.image_path} />
                  </a>
                </li>
              </ul>
            </div>
            <div class="details col-md-6">
              <h3 class="product-title">{this.props.name}</h3>
              <p class="product-description">{this.props.sub_name}</p>
              {this.props.discount !== 0 ? (
                <small style={{ textDecoration: 'line-through' }}>
                  {this.props.price}
                </small>
              ) : null}
              <h4 class="price d-block">
                <span>{this.props.sell_price}</span>
              </h4>
              <p class="vote">
                <strong>91%</strong> of buyers enjoyed this product!{' '}
                <strong>(87 votes)</strong>
              </p>
              <div class="action">
                <button
                  class="add-to-cart btn btn-default"
                  type="button"
                  onClick={this.handleBagState}
                >
                  Add to Bag
                </button>
                <button
                  class="add-to-cart btn btn-default ml-2"
                  type="button"
                  onClick={this.handleOrderState}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  'username, password, isLogin, token, productToBag, amountToBag',
  actions
)(withRouter(CardDetails));
