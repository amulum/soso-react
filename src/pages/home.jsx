import React from 'react';
import Header from '../components/header'; 
import BannerCarousel from '../components/bannerCarousel'
import ListProduct from '../components/listProduct'
import { withRouter, Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../store/store";
import '../style/bootstrap.min.css'
import '../style/home.css'

const urlHeadLine = "https://api.edamam.com/search?to=21&app_id=7173ea48&app_key=609f58237cd3b846b334f7b7e3f681b2&q="

class Home extends React.Component {
    state = {
        isSearch: false
    }
    handleSearch = async () =>{
        await this.props.setChange('isLoading', true)
        const keyword = await this.props.search
        console.log(keyword)
        console.log(this.props)
        await this.setState({'isSearch':true})
        await this.props.handleGetApi(urlHeadLine+keyword)
        this.props.history.replace({pathname: '/search', search: '?q='+keyword})
        const data = await this.props.data
        const dict = {
            isLoading: false,
            listRecipe: data.hits
        }
        await this.props.setManyChanges(dict)
        console.log(this.props.listRecipe)
    }

    handleTestApi = async () => {
        await store.setState({selectedProduct : 2})
        await this.props.getAllProduct()
        await this.props.getPopularProduct()
        await this.props.getSpesificProduct()
        await this.props.getMyBag()

        console.log('getAllProduct', this.props.listAllProduct)
        console.log('getPopularProduct', this.props.listPopularProduct)
        console.log('selected product', this.props.selectedProduct)
        console.log('detail spesific', this.props.listSpesificProduct)
        console.log('myBagData', this.props.myBagData)
    }

    componentDidMount = () => {
        // this.props.getPopularProduct();
        this.props.getAllProduct();
    };

    render () {
        return (
            <React.Fragment>
                <Header/>
                <div className="container-fluid">
                    <BannerCarousel />
                    <div className="row justify-content-center">
                        <div className="wrapper-product">
                            <div className="label-product">
                                <button onClick={this.handleTestApi}>test api</button>
                            </div>
                            <div className="list-product">
                                <ListProduct />
                            </div>
                        </div>
                    </div>
                    {this.props.isLoading?
                    <div className="loading-box mini" style={{display:this.state.isSearch? 'flex':'none'}}>
                        <i className="material-icons">cached</i>
                    </div>
                    :
                    <div className="row search-result">
                        {/* {recipeToShow} */}
                    </div>
                    }

                </div>
            </React.Fragment>

        )
    }
}
export default connect('listAllProduct, listPopularProduct, selectedProduct, listSpesificProduct, myBagData',actions)(withRouter(Home));
