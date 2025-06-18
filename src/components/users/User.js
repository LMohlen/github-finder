import { useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';

const User = ({ getUser, getUserRepos, user, repos, loading }) => {
	const { login } = useParams();

	useEffect(() => {
		getUser(login);
		getUserRepos(login);
	}, [getUser, getUserRepos, login]);

	if (loading) return <Spinner></Spinner>;

	return (
		<Fragment>
			<Link to='/' className='btn btn-light'>
				Back to search
			</Link>
			Hireable:{' '}
			{user.hireable ? (
				<i className='fas fa-check text-success'></i>
			) : (
				<i className='fas fa-times-circle text-danger'></i>
			)}
			<div className='card grid-2'>
				<div className='all-center'>
					<img
						src={user.avatar_url}
						className='round-img'
						alt='avatar'
						style={{ width: '150px' }}
					/>
					<h1>{user.name}</h1>
					<p>Location: {user.location}</p>
				</div>
				<div>
					{user.bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{user.bio}</p>
						</Fragment>
					)}
					<a href={user.html_url} className='btn btn-dark my-1'>
						Visit GitHub Profile
					</a>
					<ul>
						<li>{user.login && <Fragment>Username: {user.login}</Fragment>}</li>
						<li>
							{user.company && <Fragment>Company: {user.company}</Fragment>}
						</li>
						<li>{user.blog && <Fragment>Website: {user.blog}</Fragment>}</li>
					</ul>
				</div>
			</div>
			<div className='card text-center'>
				<div className='badge badge-primary'>Followers: {user.followers}</div>
				<div className='badge badge-success'>Following: {user.following}</div>
				<div className='badge badge-light'>
					Public Repos: {user.public_repos}
				</div>
				<div className='badge badge-dark'>
					Public Gists: {user.public_gists}
				</div>
			</div>
			<Repos repos={repos}></Repos>
		</Fragment>
	);
};

User.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
};

export default User;
