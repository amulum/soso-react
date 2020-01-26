import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css'
import ModalAdmin from './modalAdmin';

const AdminTable = (props) =>
{
  const loopDataAdmin = props.localListAdmin.map((item, key) =>
  {
    return (
      <tr>
        <th scope="row" className="align-middle">{key + 1}</th>
        <td className="align-middle">{item.username}</td>
        <td className="align-middle">{item.created_at}</td>
        <td className="align-middle">{item.login_at}</td>
        <td className="align-middle">
          <button className="btn btn-outline-dark" onClick={() => props.onClick(item.username)}>
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
              <th>USERNAME</th>
              <th>CREATED AT</th>
              <th>LOGIN AT</th>
              <th>      </th>
            </tr>
          </thead>
          <tbody>
            {loopDataAdmin}
            <tr>
              <ModalAdmin
                {...props} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(AdminTable));