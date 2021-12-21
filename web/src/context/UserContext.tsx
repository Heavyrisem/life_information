/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import { UserData_T, UserLocation as UserLocation_T } from '../../../shared/Types';
import { Location_T } from '../Types/WeatherType';

const initUserLocationData: UserLocation_T = { LocationName: Location_T.SEOUL };
interface UserLocationContext {
	UserLocation: UserLocation_T;
	setUserLocation: React.Dispatch<React.SetStateAction<UserLocation_T>>;
}
export const UserLocationContext = React.createContext<UserLocationContext>({
	UserLocation: initUserLocationData,
	setUserLocation: () => ({}),
});
export function UserLocationProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [UserLocation, setUserLocation] = useState<UserLocation_T>(initUserLocationData);

	return (
		<UserLocationContext.Provider value={{ UserLocation, setUserLocation }}>
			{children}
		</UserLocationContext.Provider>
	);
}

interface UserDataContext {
	UserData?: UserData_T;
	setUserData: (Data: UserData_T | undefined) => void;
}
export const UserDataContext = React.createContext<UserDataContext>({
	UserData: undefined,
	setUserData: () => ({}),
});
export function UserDataProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [cookies, setCookie, removeCookie] = useCookies<'UserData', { UserData?: UserData_T }>(['UserData']);
	const [UserData, setData] = useState<UserData_T | undefined>(cookies.UserData);

	function setUserData(Data?: UserData_T) {
		setData(Data);

		if (Data === undefined) {
			removeCookie('UserData');
		} else setCookie('UserData', Data);
	}

	return <UserDataContext.Provider value={{ UserData, setUserData }}>{children}</UserDataContext.Provider>;
}
