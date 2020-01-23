import React from 'react';
import Header from '../components/header';
import BannerCarousel from '../components/bannerCarousel';
import CardProduct from '../components/cardProduct';
import Footer from '../components/footer';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css';
import '../style/home.css';
import CarouselProduct from '../components/carouselProduct';

const urlHeadLine =
  'https://api.edamam.com/search?to=21&app_id=7173ea48&app_key=609f58237cd3b846b334f7b7e3f681b2&q=';

class Home extends React.Component
{
  state = {
    isSearch: false
  };
  handleSearch = async () =>
  {
    await this.props.setChange('isLoading', true);
    const keyword = await this.props.search;
    console.log(keyword);
    console.log(this.props);
    await this.setState({ isSearch: true });
    await this.props.handleGetApi(urlHeadLine + keyword);
    this.props.history.replace({
      pathname: '/search',
      search: '?q=' + keyword
    });
    const data = await this.props.data;
    const dict = {
      isLoading: false,
      listRecipe: data.hits
    };
    await this.props.setManyChanges(dict);
    console.log(this.props.listRecipe);
  };

  handleTestApi = async () =>
  {
    await store.setState({ selectedProduct: 2 });
    await this.props.getPopularProduct();
    await this.props.getSpesificProduct();
    await this.props.getMyBag();

    console.log('getAllProduct', this.props.listAllProduct);
    console.log('getPopularProduct', this.props.listPopularProduct);
    console.log('selected product', this.props.selectedProduct);
    console.log('detail spesific', this.props.listSpesificProduct);
    console.log('myBagData', this.props.myBagData);
  };

  componentDidMount = async () =>
  {
    // this.props.getPopularProduct();
    await this.props.getAllProduct();
    await this.props.getPopularProduct();
    console.log('all product did mount', this.props.listAllProduct);
  };

  render()
  {
    console.log('all product render', this.props.listAllProduct);
    const allProduct = this.props.listAllProduct.map((item, key) =>
    {
      console.log(item);
      return (
        <div className="col-md-3 col-sm-6 col-xs-12 mt-1 px-0 border-light border rounded">
          <CardProduct
            image_path={item.Details.image_path}
            name={item.Details.name}
            sub_name={item.Details.sub_name}
            discount={item.Details.discount}
            price={item.Details.price}
            sell_price={item.Details.sell_price}
            pathname={item.Details.name}
          />
        </div>
      );
    });

    return (
      <React.Fragment>
        <Header />
        <div className="container-fluid mx-0 px-0">
          <BannerCarousel />
          <div className="row my-2">
            {/* POPULAR PRODUCT */}
            <h3 className="label-product my-2 pt-4">
              <span className="heading1 bg-light px-5">Popular Products</span>
              {/* <button onClick={this.handleTestApi}>test api</button> */}
            </h3>
            <CarouselProduct
              listInputCarousel={this.props.listAllProduct} />
          </div>
          <div className="row justify-content-center bg-white pt-2 p-5">
            <h3 className="label-product pt-4">
              <span className="heading1 bg-white px-5">Products</span>
              {/* <button onClick={this.handleTestApi}>test api</button> */}
            </h3>
            <div className="row d-flex flex-row px-5">
              {allProduct}
            </div>
            <div className="list-product"></div>
            <div className="list-product"></div>
          </div>
          {this.props.isLoading ? (
            <div
              className="loading-box mini"
              style={{ display: this.state.isSearch ? 'flex' : 'none' }}
            >
              <i className="material-icons">cached</i>
            </div>
          ) : (
              <div className="row search-result"></div>
            )}
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}
export default connect(
  'listAllProduct, listPopularProduct, selectedProduct, listSpesificProduct, myBagData',
  actions
)(withRouter(Home));
