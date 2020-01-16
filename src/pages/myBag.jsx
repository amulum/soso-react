import React, { Component } from 'react';
import Header from '../components/header';
import CardBag from '../components/cardBag';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
import axios from 'axios';

class MyBag extends React.Component {
	state = {
		details: [],
	};

	componentDidMount = async () => {
		await this.props.getMyBag();
		console.log('bagdata mybag render', this.props.dataMyBag.details);
		console.warn('aku di didmount');
		this.setState({ details: this.props.dataMyBag.details });
		console.log('this state', this.state.details);
	};

	postNew = async (id, calcMode) => {
		await this.props.postMyBag(id, calcMode);
		const newAr = this.props.dataMyBag.details;
		console.log('aaaaa', this.newAr);
		console.log('this.props.dataMyBag.details;', this.props.dataMyBag.details);
		if (typeof this.props.dataMyBag.details !== 'undefined') {
			this.setState({ details: this.props.dataMyBag.details });
		}
	};
	render() {
		console.warn('aku di render');

		// console.log('bagdata mybag render', this.props.dataMyBag.details);
		console.log('this props', this.props);

		// looping component my bag yg akan ditampilkan
		// awal nyantumin amount aja trus next bisa + - amount
		let allBag;
		// if (this.state.details !== undefined) {
		allBag = this.state.details.map((item, key) => {
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
		// } else {
		// 	return (
		// 		<Link to='/'>
		// 			<button>Belanja dulu</button>
		// 		</Link>
		// 	);
		// }
		return (
			<React.Fragment>
				<Header />
				<div>
					<div>data my bag</div>
					<div>total item : {this.props.dataMyBag.total_item}</div>
					<div>sub total :{this.props.dataMyBag.sub_total}</div>
					bag details : cooming soon
					<div className='container-fluid'>
						<div className='row'>{allBag}</div>
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
