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

class Search extends React.Component
{

  componentDidMount = async () =>
  {
    await this.props.getProductDetail();
  };
  render()
  {
    const selectProduct = this.props.listSelectProduct.map((item, key) =>
    {
      return (
        <div className="col-md-3 col-sm-6 col-xs-12 mt-1 px-0 border-light border rounded">
          <CardProduct
            image_path={item.Details.image_path}
            name={item.Details.name}
            sub_name={item.Details.sub_name}
            discount={item.Details.discount}
            price={item.Details.price}
            sell_price={item.
              Details.sell_price}
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
          <div className="row justify-content-center bg-light pt-2 p-5">
            <h3 className="label-product pt-4">
              <span className="heading1 bg-light px-5">Search Result</span>
              {/* <button onClick={this.handleTestApi}>test api</button> */}
            </h3>
            <div className="row d-flex flex-row px-5">
              {selectProduct}
            </div>
            <div className="list-product"></div>
            <div className="list-product"></div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default connect(
  'listAllProduct, listSelectProduct, selectedProduct, myBagData',
  actions
)(withRouter(Search));
