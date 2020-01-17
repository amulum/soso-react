import React from 'react';
import Header from '../components/header';
import BannerCarousel from '../components/bannerCarousel';
import CardProduct from '../components/cardProduct';

import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import '../style/bootstrap.min.css';
import '../style/home.css';
import CardDetails from '../components/cardDetails';

class Product extends React.Component {
	componentDidMount = () => {
		this.props.getProductDetail();
		console.log('product detail', this.props.selectedProduct);
	};
	render() {
		console.log('aall product di product jsx', this.props.listSelectProduct);
		const allProduct = this.props.listSelectProduct.map((item, key) => {
			console.log('item dalem loop', item);
			console.log(item.Details);
			return (
				<CardDetails
					key={key}
					product_id={item.Details.id}
					image_path={item.Details.image_path}
					name={item.Details.name}
					sub_name={item.Details.sub_name}
					discount={item.Details.discount}
					price={item.Details.price}
					sell_price={item.Details.sell_price}
					pathname={item.Details.name}
				/>
			);
		});
		return (
			<React.Fragment>
				<Header />
				<BannerCarousel />
				<div className='row d-flex flex-row'>{allProduct}</div>
			</React.Fragment>
		);
	}
}

export default connect('listSelectProduct', actions)(withRouter(Product));