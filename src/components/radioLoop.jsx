import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

const OptionLoop = (props) =>
{
  return (
    <React.Fragment>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="radioOption" id={props.optionName} value={props.optionName} onChange={props.onChange} />
        <label class="form-check-label" for={props.optionName}>
          <div className="wrapper-payment-images" style={{ maxWidth: "5em" }}>
            <img src={props.optionImage} alt="" />
          </div>
        </label>
      </div>
    </React.Fragment>
  );
}
export default connect('listAddress', actions)(withRouter(OptionLoop));
