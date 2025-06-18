import { useContext, useState } from 'react';
import GitHubContext from '../../context/github/gitHubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const gitHubContext = useContext(GitHubContext);
	const alertContext = useContext(AlertContext);

	const [text, setText] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			alertContext.setAlert('Please enter something', 'light');
		} else {
			gitHubContext.searchUsers(text);
			setText('');
		}
	};

	const onChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div>
			<form className='form' onSubmit={onSubmit}>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
				/>
				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{gitHubContext.users.length > 0 && (
				<button
					className='btn btn-light btn-block'
					onClick={gitHubContext.clearUsers}
				>
					Clear users
				</button>
			)}
		</div>
	);
};

export default Search;
