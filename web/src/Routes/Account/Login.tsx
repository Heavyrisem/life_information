import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import API from '../../API';
import { UserDataContext } from '../../context/UserContext';
import useError from '../../hooks/useError';

const LoginView = styled.div`
	width: 100%;
	height: 100%;

	padding: 10rem 3.5rem;

	box-sizing: border-box;
`;

const Title = styled.div`
	font-size: 3rem;
	text-align: center;
`;

const InputForm = styled.form`
	margin-top: 5rem;
`;

const InputField = styled.input`
	width: 100%;
	margin: 0.5rem 0;
	padding: 1rem 1.5rem;
	box-sizing: border-box;

	font-size: 0.8rem;

	border-radius: 10rem;
	border: none;
`;

const SubmitButton = styled.button`
	width: 100%;
	margin: 0.5rem 0;
	padding: 0.8rem 1.5rem;
	box-sizing: border-box;

	font-size: 1.1rem;
	text-align: center;

	border-radius: 10rem;
	border: none;
`;

const RegisterText = styled.span`
	color: rgba(200, 200, 200, 0.5);
`;

const ButtonContainer = styled.div`
	margin-top: 5rem;
`;

export default function Login() {
	const ErrorHandler = useError();
	const { setUserData } = useContext(UserDataContext);
	const IDref = useRef<HTMLInputElement>(null);
	const PWref = useRef<HTMLInputElement>(null);

	function ClickHandler(e: React.MouseEvent, Action: 'LOGIN' | 'REGISTER') {
		e.preventDefault();

		if (IDref.current && PWref.current) {
			const [ID, PW] = [IDref.current.value, PWref.current.value];

			if (!(ID && PW)) return ErrorHandler('필수 입력값이 비었습니다.');

			if (Action === 'LOGIN') {
				API.account
					.login(ID, PW)
					.then(res => setUserData(res.status && res.result))
					.catch(ErrorHandler);
			} else if (Action === 'REGISTER') {
				API.account
					.register(ID, PW)
					.then(res => setUserData(res.status && res.result))
					.catch(ErrorHandler);
			}
		}
	}

	return (
		<LoginView>
			<Title>Login</Title>

			<InputForm>
				<InputField type="text" placeholder="아이디" ref={IDref} />
				<InputField type="password" placeholder="비밀번호" ref={PWref} />

				<ButtonContainer>
					<SubmitButton onClick={e => ClickHandler(e, 'LOGIN')}>로그인</SubmitButton>
					<RegisterText onClick={e => ClickHandler(e, 'REGISTER')}>회원가입</RegisterText>
				</ButtonContainer>
			</InputForm>
		</LoginView>
	);
}
