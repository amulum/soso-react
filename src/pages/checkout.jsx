import React, { Component } from 'react';
import Header from '../components/header';
import OptionAddress from '../components/optionAddress';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
// review order
// nembak api address
// bisa pilih addressnya pake yg mana itu dropdown
// tampilin addressnya juga sama kaya page sebelumnya
// pilih

class Checkout extends React.Component {
  state = {
    addressDetails: [],
    selectedAddress: [],
    bagDetails: [],
    orderDetails: [],
    addressName: '',
    paymentMethod: '',
    orderID: ''
  };

  componentDidMount = async () => {
    await this.props.getShipAddress();
    await this.props.getMyBag();
    await this.setState({ addressDetails: this.props.listAddress });
    await this.setState({ bagDetails: this.props.dataMyBag.details });
    console.log('addressName store dari didmount', this.props.addressName);
    console.log('selectedAddressLocal store', this.props.selectedAddress);
    console.log(this.props.add);
  };

  handleChangeAddress = async addressName => {
    await this.props.setInput(addressName);
    await console.log('otw masuk axios', this.props.addressName);
    await this.props.getShipAddress(this.props.addressName);
    console.log('list address di checkout', this.props.listAddress);
    await this.setState({ selectedAddress: this.props.listAddress });
  };

  handlePayment = async paymentMethod => {
    await this.props.setInput(paymentMethod);
    await console.log('otw masuk axios', this.props.paymentMethod);
  };

  handleCheckout = async () => {
    // api order butuh address name
    await this.setState({ addressName: this.props.addressName });

    await this.setState({ paymentMethod: this.props.paymentMethod });

    await this.props.postOrder(this.state.addressName);
    await console.log('address local', this.props.orderDetails);

    await this.setState({ orderDetails: this.props.orderDetails });
    // api payment butuh order id
    await this.props.postPayment(this.state.orderDetails.id, this.state.paymentMethod);
  };

  render() {
    // component mybag lagi beda tampilan dan quantitynya udah fix
    const paymentOption = ['ovo', 'dana', 'bank transfer'];
    const loopPayment = paymentOption.map((item, key) => {
      return <OptionAddress key={key} optionName={item} />;
    });
    // component shipping
    const loopOption = this.state.addressDetails.map((item, key) => {
      console.log(`addreess ${key}`, item);
      return (
        // <div></div>
        <OptionAddress key={key} optionName={item.address_name} item={item} />
      );
    });
    return (
      <React.Fragment>
        <Header />
        <h2>JSON Needed Data</h2>
        <hr />
        <div>
          getShipAddress :<p>{JSON.stringify(this.state.addressDetails)}</p>
        </div>
        <div>
          selectedAddress :<p>{JSON.stringify(this.state.selectedAddress)}</p>
        </div>
        <div>
          bagDetails :<p>{JSON.stringify(this.state.bagDetails)}</p>
        </div>
        <div>
          inputPaymentMethod :<p>{JSON.stringify(this.props.paymentMethod)}</p>
        </div>
        <div>
          checkInputForCheckout :<p>{JSON.stringify(this.state.addressName)}</p>
          <p>{JSON.stringify(this.state.paymentMethod)}</p>
        </div>
        <div>
          orderDetails :<p>{JSON.stringify(this.props.orderDetails)}</p>
          check ID :<p>{JSON.stringify(this.state.orderDetails.id)}</p>
        </div>
        <div>
          paymentDetails :<p>{JSON.stringify(this.props.paymentDetails)}</p>
        </div>
        <hr />
        <h2>ACTION CHECK</h2>
        <hr />
        <form onSubmit={e => e.preventDefault()}>
          <div class="form-row align-items-center">
            <div class="col-auto my-1">
              <label class="mr-sm-2" for="inlineFormCustomSelect">
                Address
              </label>
              <select
                name="addressName"
                class="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={addressName => this.handleChangeAddress(addressName)}
              >
                <option selected>Shipping Address</option>
                {loopOption}
              </select>
            </div>
          </div>
        </form>
        <form onSubmit={e => e.preventDefault()}>
          <div class="form-row align-items-center">
            <div class="col-auto my-1">
              <label class="mr-sm-2" for="inlineFormCustomSelect">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                class="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={paymentMethod => this.handlePayment(paymentMethod)}
              >
                <option selected>Shipping Address</option>
                {loopPayment}
              </select>
            </div>
          </div>
        </form>

        <button className="btn btn-outline-dark" onClick={() => this.handleCheckout()}>
          Confirm and Pay
        </button>
      </React.Fragment>
    );
  }
}

export default connect(
  'listAddress, dataMyBag, detailsMyBag, selectedAddress, addressName, paymentMethod, orderDetails, paymentDetails',
  actions
)(withRouter(Checkout));
