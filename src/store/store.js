import createStore from 'unistore';
import axios from 'axios';
import Swal from 'sweetalert2';

const initialState = {
  // CUSTOMER SIDE STATE
  listUserProfile: [],
  fullname: '',
  username: '',
  password: '',
  email: '',
  isLogin: false,
  isRegister: false,
  isLoading: true,
  selectedProduct: '',
  listAllProduct: [],
  listSelectProduct: [],
  productToBag: '',
  amountToBag: 0,
  dataPostBag: [],
  dataMyBag: [],
  detailsMyBag: [],
  listAddress: [],
  selectedAddress: [],
  addressName: '',
  paymentMethod: '',
  orderDetails: {},
  paymentDetails: {},
  radioOption: '',
  selectedCategory: '',
  createPaymentStatus: '',
  createOrderStatus: '',
  // INTERNAL SIDE STATE
  internalUsername: '',
  internalPassword: '',
  internalIsLogin: '',
  internalToken: '',
  sellerUsername: '',
  sellerPassword: '',
  sellerEmail: '',
  sellerBrandName: '',
  adminUsername: '',
  adminPassword: '',
  listAllAdmin: [],
  listAllSeller: [],
  listAllCustomer: [],
  deleteAdminStatus: '',
  deleteSellerStatus: '',
  deleteCustomerStatus: '',
  newAdminData: []
};

// choose api path
const apiPath = 'http://0.0.0.0:5000'
// local: 'http://0.0.0.0:5000',
// deploy : 'https://soso-store.site'

export const store = createStore(initialState);

export const actions = store => ({
  // start here
  // CUSTOMER SIDE FUNCTION
  handleStateLogin: async (state, event) => {
    const {
      username
    } = state;
    const {
      password
    } = state;
    const loginData = {
      username,
      password
    };

    console.warn('loginData', loginData);
    const req = {
      method: 'post',
      url: `${apiPath}/user/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: loginData
    };
    console.warn('request', req);
    const self = store;
    await axios(req)
      .then(response => {
        console.log(response.data);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('isRegister', true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', state.username);
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
        if (error.response.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username or password'
          })
        }
      });
  },

  handleLogoutState: (state, event) => {
    // clear all localstorage
    localStorage.removeItem('isLogin');
    localStorage.removeItem('token');
    localStorage.removeItem('isRegister');
    localStorage.removeItem('username');
  },

  handleStateRegister: async (state, event) => {
    const {
      username
    } = state;
    const {
      password
    } = state;
    const {
      email
    } = state;
    const {
      first_name
    } = state;
    const {
      last_name
    } = state;
    const mydata = {
      username,
      password,
      email,
      first_name,
      last_name
    };

    console.warn('cek mydata', mydata);
    const req = {
      method: 'post',
      url: `${apiPath}/user/register`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: mydata
    };
    console.log('request register', req);
    const self = store;
    await axios(req)
      .then(response => {
        console.log('response', response);
        localStorage.setItem('isRegister', true);
        localStorage.setItem('username', response.data.username);
      })
      .catch(error => {
        console.log(error);
      });
  },

  getUserProfile: async (state, event) => {
    const req = {
      method: 'get',
      url: `${apiPath}/user/me`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    console.warn('cek req', req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listUserProfile: response.data,
          isLoading: false
        });
        console.log(response.data);
        localStorage.setItem({
          listUserProfile: response.data
        });
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log(error);
      });
  },

  getPopularProduct: async (state, event) => {
    const req = {
      method: 'get',
      url: `${apiPath}/user/product/popular`
    };

    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listPopularProduct: response.data,
          isLoading: false
        });
        console.log('output popular product', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log(error);
      });
  },

  getAllProduct: async (state, event) => {
    const req = {
      method: 'post',
      url: `${apiPath}/user/product`
    };
    console.log('cek axios', req)
    const self = store;
    await axios(req)
      .then(response => {
        console.log('response get product', response)
        self.setState({
          listAllProduct: response.data.result,
          isLoading: false
        });
        console.log('output axios all product', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log(error);
      });
  },

  getProductDetail: async (state, event) => {
    const selectedName = state.selectedProduct;
    const mydata = {
      name: selectedName
    };
    console.log('mydata product detail', mydata);
    const req = {
      method: 'post',
      url: `${apiPath}/user/product`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: mydata
    };
    console.log('request product detail', req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listSelectProduct: response.data.result,
          isLoading: false
        });
        console.log('output axios product detail', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('error product detail', error);
      });
  },

  getSearchProduct: async (state, event) => {
    // binding this
    const {
      keyword
    } = state;
    const searchData = {
      brand_name: keyword
    };
    const req = {
      method: 'get',
      url: `${apiPath}/user/product`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: searchData
    };
    console.log('request search', req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          listAllProduct: response.data,
          isLoading: false
        });
        console.log('output axios search', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log(error);
      });
  },

  postProductToBag: async (state, event) => {
    const productID = state.productToBag;
    const {
      amountToBag
    } = state;
    const mydata = {
      product_id: productID,
      amount: amountToBag
    };
    console.log('mydata postProduct', mydata);
    const req = {
      method: 'post',
      url: `${apiPath}/user/mybag`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: mydata
    };
    console.log('request post product', req);
    const self = store;
    await axios(req)
      .then(response => {
        self.setState({
          dataPostBag: response.data,
          isLoading: false
        });
        console.log('output axios post product', response.data);
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('error post product', error);
      });
  },
  getMyBag: async (state, event) => {
    const req = {
      method: 'get',
      url: `${apiPath}/user/mybag`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    console.log('request get my bag', req);
    const self = store;
    const res = await axios(req)
      .then(response => {
        self.setState({
          dataMyBag: response.data,
          isLoading: false
        });
        console.log('output axios get my bag', response.data);
        return response;
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('error get my bag', error);
      });
  },
  postMyBag: async (state, id, calcMode) => {
    const myData = {
      product_id: id,
      amount: calcMode
    };
    const req = {
      method: 'post',
      url: `${apiPath}/user/mybag`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: myData
    };
    console.log('request post my bag', req);
    const self = store;
    const res = await axios(req)
      .then(response => {
        self.setState({
          dataMyBag: response.data,
          isLoading: false
        });
        console.log('output axios post my bag', response.data);
        return response;
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('error post my bag', error);
      });
  },
  getShipAddress: async (state, addressName) => {
    const myData = {
      name: addressName
    }
    const req = {
      method: 'post',
      url: `${apiPath}/user/address`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: myData
    };
    console.log('request getShipAddress', req);
    const self = store;
    const res = await axios(req)
      .then(response => {
        self.setState({
          listAddress: response.data,
          isLoading: false
        });
        console.log('output axios getShipAddress', response.data);
        return response;
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('error getShipAddress', error);
      });
  },
  postOrder: async (state, addressName) => {
    const myData = {
      name: addressName
    }
    const req = {
      method: 'post',
      url: `${apiPath}/user/order`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: myData
    };
    console.log('request postOrder', req);
    const self = store;
    const res = await axios(req)
      .then(response => {
        self.setState({
          orderDetails: response.data,
          createOrderStatus: response.status,
          isLoading: false
        });
        console.log('output axios postOrder', response.data);
        return response;
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('error postOrder', error);
      });
  },
  postPayment: async (state, orderID, paymentMethod) => {
    const myData = {
      payment_oid: orderID,
      payment_type: paymentMethod
    }
    const req = {
      method: 'post',
      url: `${apiPath}/user/payment`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: myData
    };
    console.log('request postPayment', req);
    const self = store;
    const res = await axios(req)
      .then(response => {
        self.setState({
          paymentDetails: response.data,
          createPaymentStatus: response.status,
          isLoading: false
        });
        console.log('output axios postPayment', response.data);
        return response;
      })
      .catch(error => {
        self.setState({
          isLoading: false
        });
        console.log('error postPayment', error);
      });
  },
  handleSuccessOrder: (state) => {
    console.log(state.createPaymentStatus)
    console.log(state.createOrderStatus)
    if (state.createPaymentStatus === state.createOrderStatus) {
      Swal.fire({
        icon: 'success',
        title: 'Create Order Success',
        text: 'Create order success, Please confirm your payment within next 2 hours'
      })
    }
  },

  // INTERNAL SIDE FUNCTION
  handleInternalState: async (state, internalIdentity) => {
    const {
      internalUsername,
      internalPassword
    } = state;
    const username = internalUsername
    const password = internalPassword
    const loginData = {
      username,
      password
    };

    console.log('loginData', loginData);
    const req = {
      method: 'post',
      url: `${apiPath}/${internalIdentity}/login`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: loginData
    };
    console.log('request', req);
    await axios(req)
      .then(response => {

        console.log('masuk axios', response.data);
        localStorage.setItem('internalIsLogin', true);
        localStorage.setItem('internalIsRegister', true);
        localStorage.setItem('internalToken', response.data.token);
        localStorage.setItem('internalUsername', internalUsername);
        localStorage.setItem('internalIdentity', internalIdentity);
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
        if (error.response.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username or password'
          })
        }
      });
  },

  handleInternalLogout: (state) => {
    localStorage.removeItem('internalIsLogin');
    localStorage.removeItem('internalIsRegister');
    localStorage.removeItem('internalToken');
    localStorage.removeItem('internalUsername');
    localStorage.removeItem('internalIdentity');
    Swal.fire({
      icon: 'success',
      title: 'Logout Success',
      text: 'See you next time !'
    })
  },

  handleOpenNav: () => {
    document.getElementById("mySidenav").style.width = "17%";
    document.getElementById("main").style.marginLeft = "17%";
    document.body.style.backgroundColor = "rgba(32,30,30,0,4)";
  },

  handleCloseNav: () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  },

  postRegisterSeller: async (state) => {
    const username = state.sellerUsername
    const password = state.sellerPassword
    const email = state.sellerEmail
    const brand_name = state.sellerBrandName
    const registerData = {
      username,
      password,
      email,
      brand_name
    };

    console.log('registerData', registerData);
    const req = {
      method: 'post',
      url: `${apiPath}/seller/register`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
      data: registerData
    };
    console.log('request', req);
    await axios(req)
      .then(response => {

        console.log('masuk axios registerSeller', response.data);
        store.setState({
          newSellerData: response.data.Detail
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
        if (error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username or password'
          })
        }
      });
  },

  deleteSeller: async (state, idSeller) => {
    const deleteData = {
      id: idSeller
    };

    console.log('deleteData', deleteData);
    const req = {
      method: 'delete',
      url: `${apiPath}/admin/seller`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
      data: deleteData
    };
    console.log('request', req);
    await axios(req)
      .then(response => {

        console.log('masuk axios deleteSeller', response.data);
        store.setState({
          deleteSellerStatus: response.data.status
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
      });
  },

  getAllSeller: async (state) => {
    const req = {
      method: 'get',
      url: `${apiPath}/admin/seller`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
    };
    console.log('request', req);
    await axios(req)
      .then(response => {

        console.log('masuk axios get all Seller', response.data);
        store.setState({
          listAllSeller: response.data
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
      });
  },

  postRegisterAdmin: async (state) => {
    const username = state.adminUsername
    const password = state.adminPassword
    const registerData = {
      username,
      password
    }
    const req = {
      method: 'post',
      url: `${apiPath}/admin/register`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
      data: registerData
    };
    console.log('request', req);
    await axios(req)
      .then(response => {

        console.log('masuk axios deleteSeller', response.data);
        store.setState({
          newAdminData: response.data,
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
      });
  },

  getAllAdmin: async (state) => {
    const req = {
      method: 'get',
      url: `${apiPath}/admin`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
    };
    console.log('request', req);
    const self = store;
    await axios(req)
      .then(response => {

        console.log('masuk axios getAdmin', response.data);
        self.setState({
          listAllAdmin: response.data
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
      });
  },

  deleteAdmin: async (state, usernameAdmin) => {
    const deleteData = {
      username: usernameAdmin
    }
    const req = {
      method: 'delete',
      url: `${apiPath}/admin`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
      data: deleteData
    };
    console.log('request', req);
    await axios(req)
      .then(response => {

        console.log('masuk axios deleteAdmin', response.data);
        store.setState({
          deleteAdminStatus: response.data.status
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
      });
  },

  getAllCustomer: async (state) => {
    const req = {
      method: 'get',
      url: `${apiPath}/admin/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
    };
    console.log('request', req);
    const self = store;
    await axios(req)
      .then(response => {

        console.log('masuk axios getAdmin', response.data);
        self.setState({
          listAllCustomer: response.data
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
      });
  },
  deleteCustomer: async (state, idCustomer) => {
    const deleteData = {
      id: idCustomer
    };

    console.log('deleteData', deleteData);
    const req = {
      method: 'delete',
      url: `${apiPath}/admin/user`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('internalToken')}`,
        'Content-Type': 'application/json'
      },
      data: deleteData
    };
    console.log('request', req);
    await axios(req)
      .then(response => {

        console.log('masuk axios deleteCustomer', response.data);
        store.setState({
          deleteCustomerStatus: response.data.status
        });
      })
      .catch(error => {
        console.log('error response', error.response);
        console.log('status', error.response.status);
      });
  },
  // end here

  // useful function
  setInput: (state, event) => {
    console.log('setInput Store', event.target.name, event.target.value);
    store.setState({
      [event.target.name]: event.target.value
    });
  },
  setChange: (state, key, value) => {
    store.setState({
      [key]: value
    });
  },
  setManyChanges: (state, dict) => {
    store.setState(dict);
  }
});