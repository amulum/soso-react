import React from 'react';
import '../style/bootstrap.min.css';
import '../style/listProduct.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class CardProduct extends React.Component {
	handleProductDetail = () => {
		store.setState({ selectedProduct: this.props.pathname });
		console.log(this.props.selectedProduct);
		this.props.history.push('/product/' + this.props.pathname);
	};
	render() {
		return (
			<div className='col-md-4 my-3'>
				<Link onClick={() => this.handleProductDetail()}>
					<div class='card' style={{ height: '100%' }}>
						<img src={this.props.image_path} class='card-img-top' />
						<div class='card-body'>
							<p class='card-text'>{this.props.name}</p>
							<small>{this.props.sub_name}</small>
						</div>
						<div className='card-footer'>
							<div className='wrap-price justify-content-start d-flex flex-row'>
								<div className='wrap-price-specify d-flex flex-column'>
									{this.props.discount > 0 ? (
										<small style={{ textDecoration: 'line-through' }}>
											{this.props.price}
										</small>
									) : null}
									<span>{this.props.sell_price}</span>
								</div>
								{this.props.discount > 0 ? (
									<span className='d-flex align-items-end ml-2'>
										{this.props.discount}
									</span>
								) : null}
							</div>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default connect(
	'selectedProduct, isLogin,isRegister, image, username',
	actions,
)(withRouter(CardProduct));
