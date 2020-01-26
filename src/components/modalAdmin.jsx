import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css'
import FormAdmin from './formAdmin';

const modalAdmin = (props) =>
{
  return (
    <React.Fragment>
      <td colSpan="5" className="text-center align-middle">
        <Link data-toggle="modal" data-target="#modalAdminCenter">
          + ADD NEW ADMIN
              </Link>
      </td>
      <div class="modal fade" id="modalAdminCenter" tabindex="-1" role="dialog" aria-labelledby="modalAdminCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalAdminCenterTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <FormAdmin {...props} />
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-dark my-4 btn-block"
                type="submit"
                onClick={() => props.modalRegister()}
                data-dismiss="modal"
              >
                Register New Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}

export default connect('internalUsername, internalPassword, internalIsLogin, internalToken', actions)(withRouter(modalAdmin));
