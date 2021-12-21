import React, { useContext } from 'react';

import LinearGraph from '../../components/LinearGraph';
import {
	ScrollElement,
	VerticalContainer,
	ElementTitle,
	HorizontalDivider,
	HorizontalContainer,
	VerticalElement,
	LoadingComponent,
	Subtitle,
	HorizontalElement,
} from '../../components/ScrollElements';
import { LastWeekCovidContext, SidoCovidContext, TodayCovidContext } from '../../context/CovidContext';
import { GetDate } from '../../Utils/Date';

export function AdditionalData() {
	const { TodayCovidData } = useContext(TodayCovidContext);

	return (
		<ScrollElement>
			<VerticalContainer>
				<ElementTitle>추가 현황</ElementTitle>
				<HorizontalDivider />
				<HorizontalContainer style={{ width: '100%' }}>
					<VerticalContainer style={{ margin: 'auto', minWidth: 'auto' }}>
						<Subtitle>사망자</Subtitle>
						<VerticalElement>
							<LoadingComponent>{TodayCovidData?.deathCnt.toLocaleString()}</LoadingComponent>
						</VerticalElement>
					</VerticalContainer>

					<VerticalContainer style={{ margin: 'auto', minWidth: 'auto' }}>
						<Subtitle>누적 검사 수</Subtitle>
						<VerticalElement>
							<LoadingComponent>{TodayCovidData?.accExamCnt.toLocaleString()}</LoadingComponent>
						</VerticalElement>
					</VerticalContainer>
				</HorizontalContainer>
			</VerticalContainer>
		</ScrollElement>
	);
}

export function WeeklyCovidTrends() {
	const { LastWeekCovidData } = useContext(LastWeekCovidContext);

	return (
		<ScrollElement>
			{ref => (
				<VerticalContainer>
					<ElementTitle>확진자 추세</ElementTitle>
					<HorizontalDivider />

					<LoadingComponent>
						{LastWeekCovidData.length && (
							<LinearGraph
								parent={ref}
								Height={100}
								RealHeightPercent={70}
								data={{
									labels: LastWeekCovidData.map(Data => Data.decideCnt.toString()),
									data: LastWeekCovidData.map(Data => Data.decideCnt),
								}}
								DataUnit="명"
								ShowNumber
							/>
						)}
					</LoadingComponent>

					<HorizontalContainer>
						{LastWeekCovidData.map(CovidData => (
							<HorizontalElement key={CovidData.seq} style={{ fontSize: '.8rem' }}>
								{GetDate(CovidData.createDt as Date)}
							</HorizontalElement>
						))}
					</HorizontalContainer>
				</VerticalContainer>
			)}
		</ScrollElement>
	);
}

export function SidoTopChart() {
	const { SidoCovidData } = useContext(SidoCovidContext);

	const ChartElementStyle: React.CSSProperties = {
		flex: 'none',
		padding: '0 1rem',
	};

	return (
		<ScrollElement>
			<VerticalContainer>
				<ElementTitle>확진자가 가장 많은 시/도</ElementTitle>
				<HorizontalDivider />

				{SidoCovidData.map((CovidData, i) => (
					<>
						<HorizontalContainer key={CovidData.seq} style={{ justifyContent: 'space-between' }}>
							<HorizontalElement style={ChartElementStyle}>{CovidData.gubun}</HorizontalElement>
							<HorizontalElement style={ChartElementStyle}>
								{CovidData.defCnt.toLocaleString()}명
							</HorizontalElement>
						</HorizontalContainer>
						{SidoCovidData[i + 1] && <HorizontalDivider key={`${CovidData.seq}sep`} />}
					</>
				))}
			</VerticalContainer>
		</ScrollElement>
	);
}
