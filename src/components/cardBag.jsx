import React, { Component } from 'react';
import Header from '../components/header';
import { withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class CardBag extends React.Component {
	render() {
		return (
			// card panjang ada image name qty tombol + minus sub total
			<div className='col-md-4'>
				<img src={this.props.image_path} width='200 vh' />
				<p>brand name : {this.props.name}</p>
				<p>sub_name : {this.props.sub_name}</p>
				<p>price : {this.props.price}</p>
				<p>sell_price : {this.props.sell_price}</p>
				<p>qty : {this.props.qty_item}</p>
				<button
					className='btn btn-dark'
					onClick={() => this.props.onClick(this.props.id, 1)}>
					Tambah 1
				</button>
				<button
					className='btn btn-dark'
					onClick={() => this.props.onClick(this.props.id, -1)}>
					Kurang 1
				</button>
			</div>
		);
	}
}
export default connect(
	'username, password, isLogin, token',
	actions,
)(withRouter(CardBag));
