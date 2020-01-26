import React, { Component } from 'react';
import Header from '../components/header';
import OptionLoop from '../components/optionLoop';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import DetailAddress from '../components/detailAddress'
import RadioLoop from '../components/radioLoop';
// review order
// nembak api address
// bisa pilih addressnya pake yg mana itu dropdown
// tampilin addressnya juga sama kaya page sebelumnya
// pilih

class Checkout extends React.Component
{
  state = {
    paymentOption: ['OVO', 'DANA', 'Jenius', 'GOPAY'],
    addressDetails: [],
    selectedAddress: [],
    bagDetails: [],
    orderDetails: [],
    addressName: '',
    paymentMethod: '',
    orderID: ''
  };

  componentDidMount = async () =>
  {
    await this.props.getShipAddress();
    await this.props.getMyBag();
    await this.props.getUserProfile();
    await this.setState({ addressDetails: this.props.listAddress });
    await this.setState({ bagDetails: this.props.dataMyBag.details });
    console.log('addressName store dari didmount', this.props.addressName);
    console.log('selectedAddressLocal state', this.state.selectedAddress);
    console.log(this.props.add);
    console.log('this props', this.props.match.params)
  };

  handleChangeAddress = async addressName =>
  {
    await this.props.setInput(addressName);
    await console.log('otw masuk axios', this.props.addressName);
    await this.props.getShipAddress(this.props.addressName);
    console.log('list address di checkout', this.props.listAddress);
    await this.setState({ selectedAddress: this.props.listAddress });
  };

  handlePayment = async radioOption =>
  {
    await this.props.setInput(radioOption);
    console.log('radiooption', this.props.radioOption)
    await console.log('otw masuk axios', this.props.radioOption);
  };

  handleCheckout = async () =>
  {
    // api order butuh address name
    await this.setState({ addressName: this.props.addressName });
    await this.setState({ paymentMethod: this.props.radioOption });
    await this.props.postOrder(this.state.addressName);
    await this.setState({ orderDetails: this.props.orderDetails });
    // api payment butuh order id
    await this.props.postPayment(this.state.orderDetails.id, this.state.paymentMethod)
    // butuh status code dari postOrder dan postPayment
    await this.props.handleSuccessOrder()
    await this.props.history.push('/me')

  };

  render()
  {
    // component mybag lagi beda tampilan dan quantitynya udah fix
    const loopPayment = this.state.paymentOption.map((item, key) =>
    {
      return <RadioLoop key={key} optionName={item} optionImage={require(`../images/payment-logo-${ key + 1 }.png`)} onChange={paymentMethod => this.handlePayment(paymentMethod)} />;
    });
    // component shipping
    const loopOption = this.state.addressDetails.map((item, key) =>
    {
      console.log(`addreess ${ key }`, item);
      return (
        // <div></div>
        <OptionLoop key={key} optionName={item.address_name} item={item} />
      );
    });
    return (
      <React.Fragment>
        <Header />
        <h2>ACTION CHECK</h2>
        <hr />
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-7">
                  <div className="text-shipping-detail font-weight-bold">
                    SHIPPING DETAILS
              </div>
                </div>
                <div className="col-md-4">
                </div>
              </div>
              <form onSubmit={e => e.preventDefault()}>
                <div class="form-row align-items-center">
                  <div class="col-auto my-1">
                    <select
                      name="addressName"
                      class="custom-select mr-sm-2"
                      id="inlineFormCustomSelect"
                      onChange={addressName => this.handleChangeAddress(addressName)}
                    >
                      <option selected>Select ShippingAddress</option>
                      {loopOption}
                    </select>
                  </div>
                </div>
              </form>
              <DetailAddress
                userProfile={this.props.listUserProfile}
                addressDetails={this.state.addressDetails}
                selectedAddress={this.state.selectedAddress[0]}
              />
            </div >
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <form onSubmit={e => e.preventDefault()}>
                <div class="form-row align-items-center">
                  <div class="col-auto my-1">
                    <label class="mr-sm-2 font-weight-bold" for="inlineFormCustomSelect">
                      PAYMENT METHOD
                      </label>
                  </div>
                </div>
              </form>
              {loopPayment}
            </div>
            <div className="col-md-10 justify-content-center">
              <button className="btn btn-outline-dark" onClick={() => this.handleCheckout()} style={{ width: "50%" }}>
                Confirm and Pay
            </button>
            </div>
          </div>
          {/* row container fluid */}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  'listAddress, dataMyBag, detailsMyBag, selectedAddress, addressName, paymentMethod, listUserProfile, orderDetails, paymentDetails, radioOption',
  actions
)(withRouter(Checkout));
