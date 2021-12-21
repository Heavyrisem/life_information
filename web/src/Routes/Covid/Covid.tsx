import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import API from '../../API';
import { Emphasis, LoadingComponent, ScrollView } from '../../components/Elements';

import { LastWeekCovidContext, SidoCovidContext, TodayCovidContext } from '../../context/CovidContext';
import useError from '../../hooks/useError';
import { AdditionalData, SidoTopChart, WeeklyCovidTrends } from './CovidElements';

const StyledDecideCnt = styled.div`
	font-size: 3rem;
	margin: 0.5rem 0;
`;

const StyledTime = styled.div`
	font-size: 0.8rem;
`;

export default function Covid() {
	const ErrorHandler = useError();
	const { TodayCovidData, setTodayCovidData } = useContext(TodayCovidContext);
	const { LastWeekCovidData, setLastWeekCovidData } = useContext(LastWeekCovidContext);
	const { SidoCovidData, setSidoCovidData } = useContext(SidoCovidContext);

	useEffect(() => {
		if (!TodayCovidData)
			API.covid
				.today()
				.then(res => res.status && setTodayCovidData(res.result))
				.catch(ErrorHandler);

		if (!LastWeekCovidData.length)
			API.covid
				.lastWeek()
				.then(res => res.status && setLastWeekCovidData(res.result))
				.catch(ErrorHandler);

		if (!SidoCovidData.length)
			API.covid
				.sidoTop5()
				.then(res => res.status && setSidoCovidData(res.result))
				.catch(ErrorHandler);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ScrollView>
			<Emphasis>
				<div>확진자</div>
				<StyledDecideCnt>
					<LoadingComponent>
						{TodayCovidData && `${TodayCovidData.decideCnt.toLocaleString()}명`}
					</LoadingComponent>
				</StyledDecideCnt>
				<StyledTime>
					{TodayCovidData &&
						`${new Date(
							TodayCovidData.updateDt ? TodayCovidData.updateDt : TodayCovidData.createDt
						).toLocaleString()} 기준`}
				</StyledTime>
			</Emphasis>

			<AdditionalData />

			<WeeklyCovidTrends />

			<SidoTopChart />
		</ScrollView>
	);
}
