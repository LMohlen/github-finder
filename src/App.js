import './App.css';
import { Component, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};

	// Search GitHub Users
	searchUsers = async (text) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ users: res.data.items, loading: false });
	};

	// Get single GitHub user
	getUser = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ user: res.data, loading: false });
	};

	// Get user Repos
	getUserRepos = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=create:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ repos: res.data, loading: false });
	};

	// Clear Users
	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	// Set Alert
	setAlert = (message, type) => {
		this.setState({ alert: { message: message, type: type } });
		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	render() {
		const { user, repos, users, loading } = this.state;
		return (
			<Router>
				<div className='App'>
					<Navbar></Navbar>
					<div className='container'>
						<Alert alert={this.state.alert}></Alert>
						<Routes>
							<Route
								exact
								path='/'
								element={
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										></Search>
										<Users loading={loading} users={users}></Users>
									</Fragment>
								}
							></Route>
							<Route exact path='/about' Component={About}></Route>
							<Route
								exact
								path='/user/:login'
								element={
									<User
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									></User>
								}
							></Route>
						</Routes>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
