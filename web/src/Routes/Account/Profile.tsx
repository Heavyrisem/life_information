import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { UserSetting_DB } from '../../../../shared/Types';
import API from '../../API';
import {
	ElementTitle,
	Emphasis,
	HorizontalDivider,
	ScrollElement,
	ScrollView,
	VerticalContainer,
	VerticalElement,
} from '../../components/Elements';
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

	return (
		<ScrollView>
			{UserData && (
				<>
					<Emphasis>
						<div>안녕하세요</div>
						<UserName>{UserData.ID}</UserName>
						<LogoutText onClick={LogoutHandler}>로그아웃</LogoutText>
					</Emphasis>

					<ScrollElement>
						<VerticalContainer>
							<ElementTitle>날씨 설정</ElementTitle>
							<HorizontalDivider />

							<SettingField>
								<SettingLabel>지역</SettingLabel>
								<SettingSelect
									onChange={LocationSettingHandler}
									defaultValue={UserData.Setting.Location.name}
								>
									{LocationArray.map(Loc => (
										<option value={Location_T[Loc]} key={Loc}>
											{Location_T[Loc]}
										</option>
									))}
								</SettingSelect>
							</SettingField>
						</VerticalContainer>
					</ScrollElement>
				</>
			)}
		</ScrollView>
	);
}
