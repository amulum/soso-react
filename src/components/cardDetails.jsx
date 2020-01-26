// card item details di page product/sesuatu
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/cardDetails.css';
import Swal from 'sweetalert2'

const CardDetails = (props) => 
{
  const handleBagState = async () =>
  {
    // jalankan fungsi nembak axios
    // push ke bag
    if (localStorage.getItem('isLogin'))
    {
      await store.setState({ productToBag: props.product_id });
      console.log('handlebagstate', props.productToBag);
      await store.setState({ amountToBag: 1 });
      console.log('amount to bag', props.amountToBag);

      await props.postProductToBag();
      await props.history.push('/mybag');
    } else
    {
      await Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please Login to get your item :)'
      })
      await props.history.push('/login');
    }
  };
  return (
    <div class="card">
      <div class="container-fliud">
        <div class="wrapper row">
          <div class="preview col-md-6">
            <div class="preview-pic tab-content">
              <div class="tab-pane active" id="pic-1">
                <img src={props.image_path} />
              </div>
              <div class="tab-pane" id="pic-2">
                <img src={props.image_path} />
              </div>
              <div class="tab-pane" id="pic-3">
                <img src={props.image_path} />
              </div>
              <div class="tab-pane" id="pic-4">
                <img src={props.image_path} />
              </div>
              <div class="tab-pane" id="pic-5">
                <img src={props.image_path} />
              </div>
            </div>
            <ul class="preview-thumbnail nav nav-tabs">
              <li class="active">
                <a data-target="#pic-1" data-toggle="tab">
                  <img src={props.image_path} />
                </a>
              </li>
              <li>
                <a data-target="#pic-2" data-toggle="tab">
                  <img src={props.image_path} />
                </a>
              </li>
              <li>
                <a data-target="#pic-3" data-toggle="tab">
                  <img src={props.image_path} />
                </a>
              </li>
              <li>
                <a data-target="#pic-4" data-toggle="tab">
                  <img src={props.image_path} />
                </a>
              </li>
              <li>
                <a data-target="#pic-5" data-toggle="tab">
                  <img src={props.image_path} />
                </a>
              </li>
            </ul>
          </div>
          <div class="details col-md-6">
            <h3 class="product-title">{props.name}</h3>
            <p class="product-description">{props.sub_name}</p>
            {props.discount !== 0 ? (
              <small style={{ textDecoration: 'line-through' }}>
                {props.price}
              </small>
            ) : null}
            <h4 class="price d-block">
              <span>{props.sell_price}</span>
            </h4>
            <p class="vote">
              <strong>91%</strong> of buyers enjoyed this product!{' '}
              <strong>(87 votes)</strong>
            </p>
            <div class="action">
              <button
                class="add-to-cart btn btn-default"
                type="button"
                onClick={() => handleBagState()}
              >
                Add to Bag
                </button>
              <button
                class="add-to-cart btn btn-default ml-2"
                type="button"
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

export default connect(
  'username, password, isLogin, token, productToBag, amountToBag',
  actions
)(withRouter(CardDetails));
