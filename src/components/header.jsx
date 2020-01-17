import React from 'react';
import '../style/bootstrap.min.css';
import '../style/header.css';
import logo from '../images/logo192.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions, store } from '../store/store';

class Header extends React.Component {
	handleLogout = () => {
		this.props.handleLogoutState();
		this.props.history.push('/');
		alert('Thanks for visiting our site, See you next time !');
	};

	handleCategory = (category) => {
		this.forceUpdate();
		this.props.history.push('/category/' + category);
	};

	handleSearch = async () => {
		await this.props.setChange('isLoading', true);
		await this.props.getSearchProduct();
		this.props.history.replace({
			pathname: '/search',
			search: '?q=' + this.props.keyword,
		});
	};

	handleGetBag = async () => {
		this.props.getMyBag();
	};

	render() {
		return (
			<nav class='navbar navbar-expand-lg navbar-light bg-light navbar-sticky'>
				<Link
					className='navbar-brand ml-5'
					to='/'
					onClick={() => store.setState({ listRecipe: [] })}>
					<img src={logo} alt='logo-web' style={{ height: '40px' }} />
					<span className='logo-name'>OSO</span>
				</Link>
				<button
					class='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span class='navbar-toggler-icon'></span>
				</button>

				<div class='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul class='navbar-nav mr-auto'>
						<li class='nav-item active'>
							<Link to='' className='nav-link heading2'>
								Home
							</Link>
						</li>
						<li class='nav-item'>
							<Link to='/department ' className='nav-link heading2'>
								Department
							</Link>
						</li>
						<li class='nav-item'>
							<Link to='/category ' className='nav-link heading2'>
								Category
							</Link>
						</li>
					</ul>
					<form
						class='form-inline my-2 my-lg-0'
						onSubmit={(e) => e.preventDefault()}>
						<input
							name='keyword'
							class='form-control mr-sm-2 heading2'
							type='search'
							placeholder='Search'
							aria-label='Search'
							onChange={(e) => this.props.setInput(e)}
						/>
						<button
							class='btn btn-outline-dark my-2 my-sm-0 heading2'
							type='submit'
							onClick={() => this.handleSearch()}>
							Search
						</button>
					</form>
					<ul className='navbar-nav ml-auto mt-lg-0'>
						{localStorage.getItem('isLogin') ? (
							<li className='nav-item'>
								<Link className='nav-link heading2' to='/mybag'>
									MyBag
								</Link>
							</li>
						) : null}
						{localStorage.getItem('isLogin') ? (
							<li className='nav-item'>
								<Link className='nav-link heading2' onClick={this.handleLogout}>
									Logout
								</Link>
							</li>
						) : (
							<li className='nav-item'>
								<Link className='nav-link heading2' to='/login'>
									Login
								</Link>
							</li>
						)}
						{localStorage.getItem('isRegister') ? (
							<li className='nav-item mr-0'>
								<Link className='nav-link heading2' to='/profile'>
									Hi {localStorage.getItem('username')}
								</Link>
							</li>
						) : (
							<li className='nav-item mr-0'>
								<Link className='nav-link heading2' to='/register'>
									Register
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

export default connect(
	'isLogin,isRegister, image, username, keyword',
	actions,
)(withRouter(Header));
