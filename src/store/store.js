import createStore from 'unistore';
import axios from 'axios';

const initialState = { 
    listUserProfile : [],
    fullname :'',
    username : '',
    password : '',
    email : '',
    isLogin : false,
    isRegister : false,
    isLoading: true,
    token: '',
    selectedProduct : ''
};

export const store = createStore(initialState);

export const actions = store => ({
    // start here
    handleStateLogin: async (state,event) => {
        const username = state.username
        const password = state.password
        const loginData = {
            username: username,
            password: password
        };

        console.warn("loginData", loginData)
        const req = {
            method:"post",
            url: "http://localhost:2604/user/login",
            headers: {
                "Content-Type": "application/json"
            },
            data: loginData
        };
        console.warn("request",req)
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

    handleStateRegister: async (state,event) => {
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
            method:"post",
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

    // get user profile
    getUserProfile: async (state,event) => {
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
            .then(function(response){
                self.setState({ listUserProfile: response.data, isLoading: false});
                console.log(response.data);
                localStorage.setItem({listUserProfile : response.data})
            })
            .catch(function(error){
                self.setState({isLoading: false});
                console.log(error)
            }
        )
    },

    getPopularProduct: async (state,event) => {
        // binding this
        const req = {
            method: "get",    
            url: "http://localhost:2604/user/product/popular",
          };

        const self = store;
        await axios(req)
            .then(function(response){
                self.setState({ listPopularProduct: response.data, isLoading: false});
                console.log('output popular product',response.data);
            })
            .catch(function(error){
                self.setState({isLoading: false});
                console.log(error)
            }
        )
    },

    getAllProduct: async (state,event) => {
        // binding this
        const req = {
            method: "get",    
            url: "http://localhost:2604/user/product",
          };

        const self = store;
        await axios(req)
            .then(function(response){
                self.setState({ listAllProduct: response.data, isLoading: false});
                console.log('output axios all product',response.data);
            })
            .catch(function(error){
                self.setState({isLoading: false});
                console.log(error)
            }
        )
    },
    
    getSpesificProduct: async (state,event) => {
        console.log('masuk spesific')
        const req = {
            method: "get",    
            url: "http://localhost:2604/user/product?id="+state.selectedProduct
        };
        const self = store;
        await axios(req)
            .then(function(response){
                self.setState({ listSpesificProduct: response.data, isLoading: false});
                console.log('output axios spesific data',response.data);
            })
            .catch(function(error){
                self.setState({isLoading: false});
                console.log('masuk error', error)
            }
        )
    },
    getMyBag: async (state,event) => {
        const reqBag = {
            method: "get",
            url: "http://localhost:2604/user/mybag",
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
                }
            };

        console.log('input getmybag',reqBag)
        const self = store;
        await axios(reqBag)
            .then(function(response){
                self.setState({ myBagData: response.data,
                    isLoading: false});
                console.log('response get my bag', response.data);
            })
            .catch(function(error){
                self.setState({isLoading: false});
                console.log(error)
            }
        )
    },
    // end here
    // useful function
    setInput : (state, event) => {
        console.log(event.target.name, event.target.value)
        store.setState({ [event.target.name] : event.target.value })
    }, 
    setChange: (state, key, value) => {
        store.setState({[key]: value});
    },
    setManyChanges: (state, dict) => {
        store.setState(dict)
    },
})