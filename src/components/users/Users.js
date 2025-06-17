import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
	if (loading) {
		return <Spinner></Spinner>;
	} else {
		return (
			<div className='user-style'>
				{users.map((user) => (
					<UserItem key={user.id} user={user}></UserItem>
				))}
			</div>
		);
	}
};

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default Users;
