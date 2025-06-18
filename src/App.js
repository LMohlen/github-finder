import './App.css';
import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GitHubState from './context/gitHub/gitHubState';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {
	const [alert, setAlert] = useState(null);

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
										<Search setAlert={showAlert}></Search>
										<Users></Users>
									</Fragment>
								}
							></Route>
							<Route path='/about' element={<About></About>}></Route>
							<Route path='/user/:login' Component={User}></Route>
						</Routes>
					</div>
				</div>
			</Router>
		</GitHubState>
	);
};

export default App;
