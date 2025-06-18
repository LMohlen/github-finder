import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GitHubContext from '../../context/github/gitHubContext';
import { useContext } from 'react';

const Users = () => {
	const gitHubContext = useContext(GitHubContext);

	const { loading, users } = gitHubContext;

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

export default Users;
