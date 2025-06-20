import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon = 'fab fa-github', title = 'GitHub Finder' }) => {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className={icon} />
				{title}
			</h1>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
};

export default Navbar;
