import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class OptionAddress extends React.Component {
  render() {
    return (
      <React.Fragment>
        <option value={this.props.optionName}>{this.props.optionName}</option>
      </React.Fragment>
    );
  }
}
export default connect('listAddress', actions)(withRouter(OptionAddress));
