import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css'
import ModalSeller from './modalSeller';

const SellerTable = (props) =>
{
  const loopDataSeller = props.localListSeller.map((item, key) =>
  {
    return (
      <tr>
        <th className="align-middle" scope="row">{key + 1}</th>
        <td className="align-middle">{item.id}</td>
        <td className="align-middle">{item.username}</td>
        <td className="align-middle">{item.brand_name}</td>
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
              <th>SELLER ID</th>
              <th>USERNAME</th>
              <th>BRAND NAME</th>
              <th>EMAIL</th>
              <th>     </th>
            </tr>
          </thead>
          <tbody>
            {loopDataSeller}
            <tr>
              <ModalSeller
                {...props} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(SellerTable));