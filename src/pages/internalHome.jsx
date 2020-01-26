// LIBRARY
import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
// COMPONENT
import SideNav from '../components/sideNav';
import AdminTable from '../components/adminTable';
import SellerTable from '../components/sellerTable';
import CustomerTable from '../components/customerTable';
// STYLING
import '../style/bootstrap.min.css'
import '../style/home.css'
import Swal from 'sweetalert2';

class InternalHome extends React.Component
{
  state = {
    localListAdmin: [],
    localListSeller: [],
    localListCustomer: [],
    identity: ''
  }

  // HANDLE RELOAD DATA
  handleReloadAdmin = async () =>
  {
    await this.props.getAllAdmin()
    await this.setState({ localListAdmin: this.props.listAllAdmin })
    await console.log('local list all admin', this.state.localListAdmin)
  }
  handleReloadSeller = async () =>
  {
    await this.props.getAllSeller()
    await this.setState({ localListSeller: this.props.listAllSeller })
    await console.log('local list all seller', this.state.localListSeller)
  }
  handleReloadCustomer = async () =>
  {
    await this.props.getAllCustomer()
    await this.setState({ localListCustomer: this.props.listAllCustomer })
    await console.log('local list all customer', this.state.localListCustomer)
  }

  // DID MOUNT
  componentDidMount = async () =>
  {
    await this.setState({ identity: localStorage.getItem('internalIdentity') })
    if (localStorage.getItem('internalIdentity') === 'admin')
    {
      console.log('masuk if admin')
      await this.handleReloadAdmin()
      await this.handleReloadSeller()
      await this.handleReloadCustomer()

    }
  }


  // HANDLE DELETE
  handleDeleteAdmin = async (usernameAdmin) =>
  {
    await this.props.deleteAdmin(usernameAdmin)
    await this.handleReloadAdmin()
    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Selected Admin has been deleted'
    })

  }
  handleDeleteSeller = async (idSeller) =>
  {
    await this.props.deleteSeller(idSeller)
    await this.handleReloadSeller()
    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Selected Seller has been deleted'
    })

  }
  handleDeleteCustomer = async (usernameAdmin) =>
  {
    await this.props.deleteCustomer(usernameAdmin)
    await this.handleReloadCustomer()
    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Selected Customer has been deleted'
    })

  }

  // HANDLE REGISTER
  handleRegisterAdmin = async () =>
  {
    console.log('success dalem modal 4 layer')
    await this.props.postRegisterAdmin()
    await this.handleReloadAdmin()
    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Admin Successfully Created'
    })
  }
  handleRegisterSeller = async () =>
  {
    console.log('success dalem modal 4 layer')
    await this.props.postRegisterSeller()
    await this.handleReloadSeller()
    await Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Seller Successfully Created'
    })
  }
  render()
  {

    return (
      <React.Fragment>
        <div className="container-fluid p-0" id="main">
          <SideNav />
          <div className="container">

            {this.state.identity === 'admin' ?
              <React.Fragment>
                <AdminTable
                  localListAdmin={this.state.localListAdmin}
                  onClick={this.handleDeleteAdmin}
                  modalRegister={this.handleRegisterAdmin} />
                <SellerTable
                  localListSeller={this.state.localListSeller}
                  onClick={this.handleDeleteSeller}
                  modalRegister={this.handleRegisterSeller} />
                <CustomerTable
                  localListCustomer={this.state.localListCustomer}
                  onClick={this.handleDeleteCustomer} />
              </React.Fragment>
              :
              null
            }
          </div>
        </div>
      </React.Fragment >
    )
  }
}
export default connect('internalUsername, internalPassword, internalIsLogin, internalToken, listAllAdmin, listAllSeller, listAllCustomer', actions)(withRouter(InternalHome));