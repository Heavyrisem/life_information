import React, { useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';

import { UserSetting_DB } from '../../../../shared/Types';
import API from '../../API';
import {
	ElementTitle,
	Emphasis,
	HorizontalDivider,
	ScrollElement,
	ScrollContainer,
	VerticalContainer,
	VerticalElement,
} from '../../components/ScrollElements';
import { UserDataContext } from '../../context/UserContext';
import useError from '../../hooks/useError';
import { LocationArray, Location_T } from '../../Types/WeatherType';

const UserName = styled.div`
	font-size: 3rem;
	margin: 0.5rem 0;
`;
const LogoutText = styled.div`
	color: rgba(200, 200, 200, 0.5);
`;

const SettingField = styled(VerticalElement)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
	box-sizing: border-box;
`;

const SettingLabel = styled.div`
	font-weight: bold;
`;

const SettingSelect = styled.select`
	text-align: right;
	background: none;
	border: none;
	color: white;
`;

export default function Profile() {
	const ErrorHandler = useError();
	const { UserData, setUserData } = useContext(UserDataContext);

	const LogoutHandler = useCallback(() => {
		API.account
			.logout()
			.then(res => res.status && setUserData(undefined))
			.catch(ErrorHandler);
	}, [ErrorHandler, setUserData]);

	const LocationSettingHandler = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			if (!UserData) return;
			const setting: UserSetting_DB = {
				...UserData.Setting,
				Location: {
					...UserData.Setting.Location,
					name: e.target.value as Location_T,
				},
			};

			API.account
				.updateSetting(UserData.ID, setting)
				.then(res => res.status && setUserData({ ...UserData, Setting: setting }))
				.catch(ErrorHandler);
		},
		[ErrorHandler, UserData, setUserData]
	);

	const LocationSelectList = useMemo(
		() =>
			LocationArray.map(Loc => (
				<option value={Location_T[Loc]} key={Loc}>
					{Location_T[Loc]}
				</option>
			)),
		[]
	);

	return (
		<ScrollContainer>
			{UserData && (
				<>
					<Emphasis>
						<div>???????????????</div>
						<UserName>{UserData.ID}</UserName>
						<LogoutText onClick={LogoutHandler}>????????????</LogoutText>
					</Emphasis>

					<ScrollElement>
						<VerticalContainer>
							<ElementTitle>?????? ??????</ElementTitle>
							<HorizontalDivider />

							<SettingField>
								<SettingLabel>??????</SettingLabel>
								<SettingSelect
									onChange={LocationSettingHandler}
									defaultValue={UserData.Setting.Location.name}
								>
									{LocationSelectList}
								</SettingSelect>
							</SettingField>
						</VerticalContainer>
					</ScrollElement>
				</>
			)}
		</ScrollContainer>
	);
}
