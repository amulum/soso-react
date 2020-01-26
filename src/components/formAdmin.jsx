import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css'

const formAdmin = (props) =>
{
  console.log('props form admin', props)
  return (
    <form class="text-center border border-light p-5" onSubmit={e => e.preventDefault()}>
      <p class="h4 mb-4">REGISTER ADMIN</p>
      <div class="form-row mb-4">
        <div class="col">
          <input
            name="adminUsername"
            type="text"
            id="defaultRegisterFormFirstName"
            class="form-control border-dark form-control"
            placeholder="username"
            onChange={e => props.setInput(e)}
            required
          />
        </div>
        <div class="col">
          <input
            name="adminPassword"
            type="password"
            id="defaultRegisterFormLastName"
            class="form-control border-dark form-control"
            placeholder="password"
            onChange={e => props.setInput(e)}
            required
          />
        </div>
      </div>
    </form>
  )

}

export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(formAdmin));
