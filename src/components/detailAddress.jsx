import React, { Component } from 'react';
import Header from '../components/header';
import CardBag from '../components/cardBag';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

const DetailAddress = (props) =>
{
  const { userProfile, addressDetails, selectedAddress } = props
  console.log('user profile', userProfile)
  console.log('addressDetails', selectedAddress)
  if (selectedAddress !== undefined)
  {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-7">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">SHIP TO: </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userProfile.firstName} {userProfile.lastName}</td>
              </tr>
              <tr>
                <td>{selectedAddress.address}</td>
              </tr>
              <tr>
                <td>{selectedAddress.city}</td>
              </tr>
              <tr>
                <td>{selectedAddress.postal_code}</td>
              </tr>
              <tr>
                <td>{selectedAddress.country}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="table">
            <thead>
              <tr>
                <th scope="col">CONTACT INFO: </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Email :</td>
              </tr>
              <tr>
                <td>{userProfile.email}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
              </tr>
              <tr>
                <td>{selectedAddress.phone_number}</td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
    )
  } else
  {
    return null
  }
}

export default DetailAddress;