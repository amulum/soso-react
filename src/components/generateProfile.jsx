import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../store/store';


const GenerateProfile = props =>
{
  const { username, first_name, last_name, email } = props;

  if (localStorage.getItem('isLogin') === undefined)
  {
    return <Redirect to={{ pathname: '/login' }} />;
  } else
  {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <div class="card mt-3 px-5" style={{ maxWidth: '100%' }}>
          <div class="row no-gutters d-flex justify-content-center mt-3">
            <div class="col-md-4 d-flex justify-content-center">
              <div className="wrapper-image" style={{ maxWidth: '70%' }}>
                <img
                  src={require(`../images/avatar1.png`)}
                  className="card-img rounded-circle"
                />
              </div>
            </div>
            <div class="col-md-6 d-flex flex-column align-content-center">
              <div class="card-body">
                <div className="card-title username font-weight-bold text-center">
                  Hi, {username}
                </div>
                <div className="card-text text-info fullname text-center">
                  {first_name} {last_name}
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="wrapper-profile-info mt-5">
                <div class="table-responsive">
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="w-50">Fullname</td>
                        <td>:</td>
                        <td>
                          {first_name}, {last_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="w-50">Email</td>
                        <td>:</td>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <td className="w-50">Twitter</td>
                        <td>:</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect('listUserProfile', actions)(withRouter(GenerateProfile));
