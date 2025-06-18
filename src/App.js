import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GitHubState from './context/github/gitHubState';
import AlertState from './context/alert/alertState';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {
	return (
		<GitHubState>
			<AlertState>
				<Router>
					<div className='App'>
						<Navbar></Navbar>
						<div className='container'>
							<Alert></Alert>
							<Routes>
								<Route
									path='/'
									element={
										<Fragment>
											<Search></Search>
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
			</AlertState>
		</GitHubState>
	);
};

export default App;
