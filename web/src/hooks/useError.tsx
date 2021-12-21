/* eslint-disable no-alert */
import { useContext } from 'react';

import { UserDataContext } from '../context/UserContext';
import { ERROR_T } from '../Types/GlobalTypes';

export default function useError() {
	const { setUserData } = useContext(UserDataContext);

	function ErrorHandler(err: string) {
		switch (err) {
			case ERROR_T.AUTH_EXPIRED:
			case ERROR_T.AUTH_FAILD:
				setUserData(undefined);
				alert(err);
				break;
			default:
				alert(err);
		}
	}

	return ErrorHandler;
}
