import React from 'react';
import Header from '../components/header';
import BannerCarousel from '../components/bannerCarousel';
import CardProduct from '../components/cardProduct';
import Footer from '../components/footer';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css';

class Grouping extends React.Component
{
  state = {
    departmentID: '',
    categoryID: ''
  }
  componentDidMount = async () =>
  {
    await this.props.getAllProduct()
    const selectedDepartment = await this.props.match.params.departmentID
    console.log('department', selectedDepartment)
    const selectedCategory = await this.props.match.params.categoryID
    console.log('category di grouping', selectedCategory)
    if (selectedDepartment !== undefined)
    {
      await this.setState({ departmentID: selectedDepartment })
    }

    if (selectedCategory !== undefined)
    {
      await this.setState({ categoryID: selectedCategory })
    }
  }
  render()
  {
    let filteredProduct
    if (this.state.departmentID !== undefined && this.state.departmentID !== '')
    {
      console.log('lst all product render department', this.props.listAllProduct)
      console.log('masuk if departmenet')
      filteredProduct = this.props.listAllProduct.filter(item =>
      {
        if (parseInt(item.Details.department_id) === parseInt(this.state.departmentID))
        {
          console.log('item if department', item)
          return item
        }
        else
        {
          return null
        }
      })
    } else if (this.state.categoryID !== undefined || this.state.categoryID !== '')
    {
      filteredProduct = this.props.listAllProduct.filter(item =>
      {
        if (parseInt(item.Details.category_id) === parseInt(this.state.categoryID))
        {
          console.log('item filter', item)
          return item
        }
        else
        {
          return null
        }
      })
    } else
    {
      console.log('masuk else')
      //     filteredProduct = this.props.listSelectProduct
    }
    console.log('filter product', filteredProduct)
    const allProduct = filteredProduct.map((item, key) =>
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
        <BannerCarousel />
        <div className="row justify-content-center bg-white pt-2 p-5">
          <h3 className="label-product pt-4">
            <span className="heading1 bg-white px-5">Products</span>
          </h3>
          <div className="row d-flex flex-row px-5">
            {allProduct}
          </div>
        </div>
        <Footer />
      </React.Fragment>

    )
  }
}


export default connect(
  'listAllProduct, selectedCategory',
  actions
)(withRouter(Grouping));