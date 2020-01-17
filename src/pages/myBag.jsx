import React, { Component } from 'react';
import Header from '../components/header';
import CardBag from '../components/cardBag';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class MyBag extends React.Component {
	state = {
		details: [],
	};

	componentDidMount = async () => {
		await this.props.getMyBag();
		await this.setState({ details: this.props.dataMyBag.details });
		console.log('bagdata mybag render', this.props.dataMyBag.details);
		console.warn('aku di didmount');
		console.log('this state', this.state.details);
	};

	postNew = async (id, calcMode) => {
		await this.props.postMyBag(id, calcMode);
		console.log('this.props.dataMyBag.details;', this.props.dataMyBag.details);
		if (typeof this.props.dataMyBag.details !== 'undefined') {
			this.setState({ details: this.props.dataMyBag.details });
		}
	};
	handleContShopping = () => {
		this.props.history.push('/');
	};

	handleCheckout = () => {
		// go to page checkout jadi review order disana
		// pilih addressnya
		// nampilin radio button pembayarannya mau method apa
	};
	render() {
		if (this.props.dataMyBag.status === 'Bag was there but no details') {
			alert('MyBag Empty, Get some product first :(');
			this.props.history.push('/');
		}
		// console.log('bagdata mybag render', this.props.dataMyBag.details);
		console.log('this props', this.props);

		// looping component my bag yg akan ditampilkan
		// awal nyantumin amount aja trus next bisa + - amount
		const allBag = this.state.details.map((item, key) => {
			console.log('item bag', item);
			return (
				// <div></div>
				<CardBag
					key={key}
					image_path={item.image_path}
					name={item.name}
					sub_name={item.sub_name}
					price={item.price}
					sell_price={item.sell_price}
					qty_item={item.qty_item}
					id={item.id}
					onClick={this.postNew}
				/>
			);
		});
		return (
			<React.Fragment>
				<Header />
				<div class='container'>
					<div class='row d-flex justify-content-center'>
						<div class='col-sm-12 col-md-10 col-md-offset-1'>
							<table class='table table-hover'>
								<thead>
									<tr>
										<th>Product</th>
										<th>Quantity</th>
										<th class='text-center'>Price</th>
										<th class='text-center'>Total</th>
										<th> </th>
									</tr>
								</thead>
								<tbody>
									{/* loop component */}
									{allBag}
									{/* calculate section */}
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<h5>Total Item(s)</h5>
										</td>
										<td class='text-right'>
											<h5>
												<strong>{this.props.dataMyBag.total_item}</strong>
											</h5>
										</td>
									</tr>
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<h5>Subtotal</h5>
										</td>
										<td class='text-right'>
											<h5>
												<strong>IDR{this.props.dataMyBag.sub_total}</strong>
											</h5>
										</td>
									</tr>
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<h5>Estimated shipping</h5>
										</td>
										<td class='text-right'>
											<h5>
												<strong>0</strong>
											</h5>
										</td>
									</tr>
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<h3>Total</h3>
										</td>
										<td class='text-right'>
											<h3>
												<strong>IDR{this.props.dataMyBag.sub_total + 0}</strong>
											</h3>
										</td>
									</tr>
									<tr>
										<td>   </td>
										<td>   </td>
										<td>   </td>
										<td>
											<button
												type='button'
												class='btn btn-outline-dark'
												onClick={this.handleContShopping}>
												<span class='glyphicon glyphicon-shopping-cart'></span>
												Continue Shopping
											</button>
										</td>
										<td>
											<button
												type='button'
												class='btn btn-dark'
												onClick={this.handleCheckout}>
												Checkout <span class='glyphicon glyphicon-play'></span>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
export default connect(
	'listAllProduct, dataMyBag, detailsMyBag',
	actions,
)(withRouter(MyBag));
