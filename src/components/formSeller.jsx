import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css'

const formSeller = (props) =>
{
  console.log('props form admin', props)
  return (
    <form class="text-center border border-light p-5" onSubmit={e => e.preventDefault()}>
      <p class="h4 mb-4">REGISTER SELLER</p>
      <div class="form-row mb-4">
        <div class="col-6 my-3">
          <input
            name="sellerUsername"
            type="text"
            id="defaultRegisterFormFirstName"
            class="form-control border-dark form-control"
            placeholder="username-VS"
            onChange={e => props.setInput(e)}
            required
          />
        </div>
        <div class="col-6 my-3">
          <input
            name="sellerPassword"
            type="password"
            id="defaultRegisterFormLastName"
            class="form-control border-dark form-control"
            placeholder="password"
            onChange={e => props.setInput(e)}
            required
          />
        </div>

        <div class="col-6 my-3">
          <input
            name="sellerBrandName"
            type="text"
            id="defaultRegisterFormLastName"
            class="form-control border-dark form-control"
            placeholder="Brand Name"
            onChange={e => props.setInput(e)}
            required
          />
        </div>
        <div class="col-6 my-3">
          <input
            name="sellerEmail"
            type="emal"
            id="defaultRegisterFormLastName"
            class="form-control border-dark form-control"
            placeholder="Email"
            onChange={e => props.setInput(e)}
            required
          />
        </div>
      </div>
    </form>
  )

}

export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(formSeller));
