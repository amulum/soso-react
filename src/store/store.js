import createStore from 'unistore';
import axios from 'axios';

const initialState = {
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
  radioOption: ''
};

export const store = createStore(initialState);

export const actions = store => ({
  // start here
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
      url: 'https://soso-store.site/user/login',
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
        console.log(error);
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
      url: 'https://soso-store.site/user/register',
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
      url: 'https://soso-store.site/user/me',
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
      url: 'https://soso-store.site/user/product/popular'
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
      url: 'https://soso-store.site/user/product'
    };

    const self = store;
    await axios(req)
      .then(response => {
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
      url: 'https://soso-store.site/user/product',
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
      url: 'https://soso-store.site/user/product',
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
      url: 'https://soso-store.site/user/mybag',
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
      url: 'https://soso-store.site/user/mybag',
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
      url: 'https://soso-store.site/user/mybag',
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
      url: 'https://soso-store.site/user/address',
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
      url: 'https://soso-store.site/user/order',
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
      url: 'https://soso-store.site/user/payment',
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