import React from 'react';

const DetailAddress = (props) =>
{
  const { userProfile, addressDetails, selectedAddress } = props
  console.log('user profile', userProfile)
  console.log('addressDetails', selectedAddress)
  if (selectedAddress !== undefined)
  {
    return (
      <div className="row">
        <div className="col-7 mx-2">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">SHIP TO: </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userProfile.first_name} {userProfile.last_name}</td>
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
        <div className="col-4 mx-2">
          <table className="table">
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
          </table>
        </div>
      </div>
    )
  } else
  {
    return null
  }
}

export default DetailAddress;