import React, { Component } from 'react';
import Header from '../components/header';
import CardBag from '../components/cardBag';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/myBag.css';
import Swal from 'sweetalert2';

class MyBag extends React.Component
{
  state = {
    details: []
  };

  componentDidMount = async () =>
  {
    await this.props.getMyBag();
    await this.setState({ details: this.props.dataMyBag.details });
    console.log('bagdata mybag render', this.props.dataMyBag.details);
    console.warn('aku di didmount');
    console.log('this state', this.state.details);
  };

  postNew = async (id, calcMode) =>
  {
    await this.props.postMyBag(id, calcMode);
    console.log('this.props.dataMyBag.details;', this.props.dataMyBag.details);
    if (typeof this.props.dataMyBag.details !== 'undefined')
    {
      await this.setState({ details: this.props.dataMyBag.details });
    }
  };
  handleContShopping = () =>
  {
    this.props.history.push('/');
  };

  handleCheckout = async () =>
  {
    await this.props.history.push('/checkout');
  };
  render()
  {
    if (this.props.dataMyBag.status === 'Bag was there but no details')
    {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Bag',
        text: 'MyBag Empty, Get some product first :('
      })
      this.props.history.push('/');
    }
    console.log('this props', this.props);

    const allBag = this.state.details.map((item, key) =>
    {
      console.log('item bag', item);
      return (
        // <div></div>
        <CardBag
          key={key}
          image_path={item.image_path}
          name={item.name}
          sub_name={item.sub_name}
          price={item.price}
          sell_price={item.sell_price}
          qty_item={item.qty_item}
          id={item.id}
          onClick={this.postNew}
        />
      );
    });
    return (
      <React.Fragment>
        <Header />
        <div class="container source-font">
          <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-10 col-md-offset-1">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th class="text-center source-font">Price</th>
                    <th class="text-center">Total</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {/* loop component */}
                  {allBag}
                  {/* calculate section */}
                  <tr>
                    <td>   </td>
                    <td>   </td>
                    <td>   </td>
                    <td>
                      <h5>Total Item(s)</h5>
                    </td>
                    <td class="text-right">
                      <h5>
                        <strong>{this.props.dataMyBag.total_item}</strong>
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td>   </td>
                    <td>   </td>
                    <td>   </td>
                    <td>
                      <h5>Subtotal</h5>
                    </td>
                    <td class="text-right">
                      <h5>
                        <strong>IDR{this.props.dataMyBag.sub_total}</strong>
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td>   </td>
                    <td>   </td>
                    <td>   </td>
                    <td>
                      <h5>Estimated shipping</h5>
                    </td>
                    <td class="text-right">
                      <h5>
                        <strong>PROMO Free Shipping</strong>
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td>   </td>
                    <td>   </td>
                    <td>   </td>
                    <td>
                      <h3>Total</h3>
                    </td>
                    <td class="text-right">
                      <h3>
                        <strong>IDR{this.props.dataMyBag.sub_total + 0}</strong>
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-5">
            <div className="col-md-10 col-sm-12">
              <div className="row d-flex justify-content-between">
                <div className="col-md-4 col-sm-6">
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={this.handleContShopping}
                    style={{ width: "100%" }}
                  >
                    Continue Shopping
                      </button>

                </div>
                <div className="col-md-4 col-sm-6">
                  <button style={{ width: "100%" }} type="button" class="btn btn-outline-dark" onClick={this.handleCheckout}>
                    Checkout
              </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default connect('listAllProduct, dataMyBag, detailsMyBag', actions)(withRouter(MyBag));
