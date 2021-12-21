import React, { useContext } from 'react';

import { UserDataContext } from '../../context/UserContext';
import Login from './Login';
import Profile from './Profile';

export default function Account() {
	const { UserData } = useContext(UserDataContext);

	if (UserData) return <Profile />;
	return <Login />;
}
