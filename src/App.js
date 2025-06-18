import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GitHubState from './context/github/gitHubState';
import AlertState from './context/alert/alertState';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

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
								<Route path='/' element={<Home></Home>}></Route>
								<Route path='/about' element={<About></About>}></Route>
								<Route path='/user/:login' element={<User></User>}></Route>
								<Route path='*' element={<NotFound></NotFound>}></Route>
							</Routes>
						</div>
					</div>
				</Router>
			</AlertState>
		</GitHubState>
	);
};

export default App;
