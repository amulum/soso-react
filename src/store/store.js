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
    detailsMyBag: []
};

export const store = createStore(initialState);

export const actions = store => ({
    // start here
    handleStateLogin: async (state, event) => {
        const username = state.username
        const password = state.password
        const loginData = {
            username: username,
            password: password
        };

        console.warn("loginData", loginData)
        const req = {
            method: "post",
            url: "http://localhost:2604/user/login",
            headers: {
                "Content-Type": "application/json"
            },
            data: loginData
        };
        console.warn("request", req)
        const self = store;
        await axios(req)
            .then(function (response) {
                console.log(response.data);
                localStorage.setItem('isLogin', true)
                localStorage.setItem('isRegister', true)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', state.username)
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    handleLogoutState: (state, event) => {
        // clear all localstorage
        localStorage.removeItem('isLogin')
        localStorage.removeItem('token')
        localStorage.removeItem('isRegister')
        localStorage.removeItem('username')
    },

    handleStateRegister: async (state, event) => {
        const username = state.username
        const password = state.password
        const email = state.email
        const first_name = state.first_name
        const last_name = state.last_name
        const mydata = {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name
        };

        console.warn("cek mydata", mydata)
        const req = {
            method: "post",
            url: "http://localhost:2604/user/register",
            headers: {
                "Content-Type": "application/json"
            },
            data: mydata
        };
        console.log('request register', req)
        const self = store;
        await axios(req)
            .then(function (response) {
                console.log('response', response)
                localStorage.setItem('isRegister', true)
                localStorage.setItem('username', response.data.username)
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    getUserProfile: async (state, event) => {
        const req = {
            method: "get",
            url: "http://localhost:2604/user/me",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        };
        console.warn("cek req", req)
        const self = store;
        await axios(req)
            .then(function (response) {
                self.setState({
                    listUserProfile: response.data,
                    isLoading: false
                });
                console.log(response.data);
                localStorage.setItem({
                    listUserProfile: response.data
                })
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log(error)
            })
    },

    getPopularProduct: async (state, event) => {
        const req = {
            method: "get",
            url: "http://localhost:2604/user/product/popular",
        };

        const self = store;
        await axios(req)
            .then(function (response) {
                self.setState({
                    listPopularProduct: response.data,
                    isLoading: false
                });
                console.log('output popular product', response.data);
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log(error)
            })
    },

    getAllProduct: async (state, event) => {
        const req = {
            method: "post",
            url: "http://localhost:2604/user/product",
        };

        const self = store;
        await axios(req)
            .then(function (response) {
                self.setState({
                    listAllProduct: response.data.result,
                    isLoading: false
                });
                console.log('output axios all product', response.data);
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log(error)
            })
    },

    getProductDetail: async (state, event) => {
        const selectedName = state.selectedProduct
        const mydata = {
            name: selectedName
        }
        console.log('mydata product detail', mydata)
        const req = {
            method: "post",
            url: "http://localhost:2604/user/product",
            headers: {
                "Content-Type": "application/json"
            },
            data: mydata
        };
        console.log('request product detail', req)
        const self = store;
        await axios(req)
            .then(function (response) {
                self.setState({
                    listSelectProduct: response.data.result,
                    isLoading: false
                });
                console.log('output axios product detail', response.data);
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log('error product detail', error)
            })
    },

    getSearchProduct: async (state, event) => {
        // binding this
        const keyword = state.keyword
        const searchData = {
            brand_name: keyword
        };
        const req = {
            method: "get",
            url: "http://localhost:2604/user/product",
            headers: {
                "Content-Type": "application/json"
            },
            data: searchData
        };
        console.log('request search', req)
        const self = store;
        await axios(req)
            .then(function (response) {
                self.setState({
                    listAllProduct: response.data,
                    isLoading: false
                });
                console.log('output axios search', response.data);
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log(error)
            })
    },

    postProductToBag: async (state, event) => {
        const productID = state.productToBag
        const amountToBag = state.amountToBag
        const mydata = {
            product_id: productID,
            amount: amountToBag
        }
        console.log('mydata postProduct', mydata)
        const req = {
            method: "post",
            url: "http://localhost:2604/user/mybag",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            data: mydata
        };
        console.log('request post product', req)
        const self = store;
        await axios(req)
            .then(function (response) {
                self.setState({
                    dataPostBag: response.data,
                    isLoading: false
                });
                console.log('output axios post product', response.data);
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log('error post product', error)
            })
    },
    getMyBag: async (state, event) => {
        const req = {
            method: "get",
            url: "http://localhost:2604/user/mybag",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        };
        console.log('request get my bag', req)
        const self = store;
        const res = await axios(req)
            .then(function (response) {
                self.setState({
                    dataMyBag: response.data,
                    isLoading: false,
                });
                console.log('output axios get my bag', response.data);
                return response
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log('error get my bag', error)
            })
    },
    postMyBag: async (state, id, calcMode) => {
        const myData = {
            product_id: id,
            amount: calcMode
        }
        const req = {
            method: "post",
            url: "http://localhost:2604/user/mybag",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            },
            data: myData
        };
        console.log('request post my bag', req)
        const self = store;
        const res = await axios(req)
            .then(function (response) {
                self.setState({
                    dataMyBag: response.data,
                    isLoading: false,
                });
                console.log('output axios post my bag', response.data);
                return response
            })
            .catch(function (error) {
                self.setState({
                    isLoading: false
                });
                console.log('error post my bag', error)
            })
    },
    // end here

    // useful function
    setInput: (state, event) => {
        console.log(event.target.name, event.target.value)
        store.setState({
            [event.target.name]: event.target.value
        })
    },
    setChange: (state, key, value) => {
        store.setState({
            [key]: value
        });
    },
    setManyChanges: (state, dict) => {
        store.setState(dict)
    },
})