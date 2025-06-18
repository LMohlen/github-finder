import { useReducer, useCallback } from 'react';
import axios from 'axios';
import GitHubReducer from './gitHubReducer';
import GitHubContext from './gitHubContext';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_USER,
	GET_REPOS,
} from '../types';

let gitHubClientId;
let gitHubClientSecret;

if (process.env.NODE_ENV !== 'production') {
	gitHubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	gitHubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	gitHubClientId = process.env.GITHUB_CLIENT_ID;
	gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitHubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GitHubReducer, initialState);

	// Search User
	const searchUsers = useCallback(async (text) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`
		);
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items,
		});
	}, []);

	// Get single GitHub user
	const getUser = useCallback(async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`
		);

		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	}, []);

	// Get user Repos
	const getUserRepos = useCallback(async (username) => {
		setLoading();

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=create:asc&client_id=${gitHubClientId}&client_secret=${gitHubClientSecret}`
		);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	}, []);

	// Clear Users
	const clearUsers = () => {
		dispatch({ type: CLEAR_USERS });
	};
	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GitHubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
			}}
		>
			{props.children}
		</GitHubContext.Provider>
	);
};

export default GitHubState;
