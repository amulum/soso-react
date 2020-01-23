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
  componentDidMount = () =>
  {
    const selectedDepartment = this.props.match.params.departmentID
    const selectedCategory = this.props.match.params.categoryID
    if (selectedDepartment !== undefined)
    {
      this.setState({ departmentID: selectedDepartment })
    }

    if (selectedCategory !== undefined)
    {
      this.setState({ categoryID: selectedCategory })
    }
    console.log('department', this.state.departmentID)
    console.log('category', this.state.categoryID)
    console.log('params', this.props.match.params.departmentID)
  }
  render()
  {
    let filteredProduct
    if (this.state.departmentID !== undefined)
    {
      console.log('masuk if department')
      filteredProduct = this.props.listSelectProduct.filter(item =>
      {
        if (item.Details.department_id === this.state.departmentID)
        {
          return item
        }
      })
    } else if (this.state.categoryID !== undefined)
    {
      console.log('masuk if department')
      filteredProduct = this.props.listSelectProduct.filter(item =>
      {
        if (item.Details.category_id === this.state.departmentID)
        {
          return item
        }
      })
    } else
    {
      console.log('masuk else')
      filteredProduct = this.props.listSelectProduct
    }
    return (
      <div></div>
    )
  }
}


export default connect(
  'listAllProduct',
  actions
)(withRouter(Grouping));