import './App.css';
import { Fragment, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import GitHubState from './context/gitHub/gitHubState';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setUserRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	// Search GitHub Users
	const searchUsers = useCallback(async (text) => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUsers(res.data.items);
		setLoading(false);
	}, []);

	// Get single GitHub user
	const getUser = useCallback(async (username) => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUser(res.data);
		setLoading(false);
	}, []);

	// Get user Repos
	const getUserRepos = useCallback(async (username) => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=create:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUserRepos(res.data);
		setLoading(false);
	}, []);

	// Clear Users
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	// Set Alert
	const showAlert = (message, type) => {
		setAlert({ message, type });
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<GitHubState>
			<Router>
				<div className='App'>
					<Navbar></Navbar>
					<div className='container'>
						<Alert alert={alert}></Alert>
						<Routes>
							<Route
								path='/'
								element={
									<Fragment>
										<Search
											searchUsers={searchUsers}
											clearUsers={clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={showAlert}
										></Search>
										<Users loading={loading} users={users}></Users>
									</Fragment>
								}
							></Route>
							<Route path='/about' element={<About></About>}></Route>
							<Route
								path='/user/:login'
								element={
									<User
										getUser={getUser}
										getUserRepos={getUserRepos}
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
		</GitHubState>
	);
};

export default App;
