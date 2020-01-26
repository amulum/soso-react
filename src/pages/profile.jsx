import React from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import GenerateProfile from '../components/generateProfile'

// idenya pake .match.params
// ada 3 path 
// /me, /me/address, /me/order, /me/payment
class Profile extends React.Component
{
  componentDidMount = () =>
  {
    this.props.getUserProfile();
    // get user address
    // get user order
    // get user payment
    // change status payment
  };

  render()
  {
    return (
      <React.Fragment>
        <Header />
        <GenerateProfile
          username={this.props.listUserProfile.username}
          email={this.props.listUserProfile.email}
          first_name={this.props.listUserProfile.first_name}
          last_name={this.props.listUserProfile.last_name}
        />
      </React.Fragment>
    );
  }
}

export default connect('listUserProfile', actions)(withRouter(Profile));
