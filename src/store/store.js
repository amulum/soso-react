import createStore from 'unistore';
import axios from 'axios';

const initialState = { 
                fullname :'',
                username : '',
                password : '',
                email : '',
                token : '',
                isLogin : false,
                profilePicture : '',
                search: '',
                listRecipe: [],
                isLoading: true,
                data: {},
                };

export const store = createStore(initialState);

export const actions = store => ({
    // start here
    handleStateLogin: async (state,event) => {
        const username = state.username
        const password = state.password
        const mydata = {
        username: username,
        password: password
        };

        console.warn("cek mydata", mydata)
        const req = {
            method:"post",
            url: "http://127.0.0.1:2604/users/login",
            headers: {
                "Content-Type": "application/json"
            },
            data: mydata
        };
        const self = store;
        await axios(req)
        .then(function (response) {
            console.log(response.data);
            self.setState({token: response.data.token});
            self.setState({isLogin: true});
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    // end here
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

    handleGetApi: async (state, urlHeadLine) => {
        await axios
        .get(urlHeadLine)
        .then(async (response) => {
            await store.setState({data: response.data})
        })
        .catch((error) => {
            console.warn(error)
        })
    }
})