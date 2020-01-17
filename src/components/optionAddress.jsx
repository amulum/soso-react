import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class OptionAddress extends React.Component {
  render() {
    return (
      <React.Fragment>
        <option name="addressName" value={this.props.address_name}>
          {this.props.address_name}
        </option>
      </React.Fragment>
    );
  }
}
export default connect('listAddress', actions)(withRouter(OptionAddress));
