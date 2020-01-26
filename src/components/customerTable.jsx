import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css'

const CustomerTable = (props) =>
{
  const loopDataCustomer = props.localListCustomer.map((item, key) =>
  {
    return (
      <tr>
        <th className="align-middle" scope="row">{key + 1}</th>
        <td className="align-middle">{item.id}</td>
        <td className="align-middle">{item.username}</td>
        <td className="align-middle">{item.first_name}</td>
        <td className="align-middle">{item.last_name}</td>
        <td className="align-middle">{item.email}</td>
        <td className="align-middle">
          <button className="btn btn-outline-dark" onClick={() => props.onClick(item.id)}>
            <i class="fa fas fa-trash"></i>
          </button>
        </td>
      </tr>
    )
  })
  return (
    <div className="row mt-3">
      <div className="table-responsive">
        <table className="table w-100 text-center">
          <thead>
            <tr>
              <th>NO.</th>
              <th>CUSTOMER ID</th>
              <th>USERNAME</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>     </th>
            </tr>
          </thead>
          <tbody>
            {loopDataCustomer}
            <tr>
              <td colSpan="7" className="text-center align-middle">
                <Link to="/">
                  + ADD NEW CUSTOMER
              </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(CustomerTable));