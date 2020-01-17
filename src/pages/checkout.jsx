import React, { Component } from 'react';
import Header from '../components/header';
import CardBag from '../components/cardBag';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';
// review order
// nembak api address
// bisa pilih addressnya pake yg mana itu dropdown
// tampilin addressnya juga sama kaya page sebelumnya
// pilih

class Checkout extends React.Component {
	state = {
		details: [],
	};

	componentDidMount = async () => {
		await this.props.getShipAddr();
		await this.setState({ details: this.props.dataMyBag.details });
	};
	render() {
		// component mybag lagi

		// component shipping
		return (
			<React.Fragment>
				<Header />
			</React.Fragment>
		);
	}
}

export default connect(
	'listAllProduct, dataMyBag, detailsMyBag',
	actions,
)(withRouter(MyBag));
