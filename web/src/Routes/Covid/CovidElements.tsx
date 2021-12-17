import React, { useContext } from "react";
import { ScrollElement, VerticalContainer, ElementTitle, HorizontalDivider, HorizontalContainer, VerticalElement, LoadingComponent, Subtitle, HorizontalElement } from "../../components/Elements";
import { LinearGraph } from "../../components/LinearGraph";
import { LastWeekCovidContext, TodayCovidContext } from "../../context/CovidContext";
import { GetDate } from "../../Utils/Date";


export function AdditionalData() {
    const { TodayCovidData } = useContext(TodayCovidContext);

    return (
        <ScrollElement>
        <VerticalContainer>

            <ElementTitle>추가 현황</ElementTitle>
            <HorizontalDivider />
            <HorizontalContainer style={{width: '100%'}}>

                <VerticalContainer style={{margin: 'auto', minWidth: 'auto'}}>
                    <Subtitle>사망자</Subtitle>
                    <VerticalElement><LoadingComponent>{TodayCovidData?.deathCnt.toLocaleString()}</LoadingComponent></VerticalElement>
                </VerticalContainer>


                <VerticalContainer style={{margin: 'auto', minWidth: 'auto'}}>
                    <Subtitle>누적 검사 수</Subtitle>
                    <VerticalElement><LoadingComponent>{TodayCovidData?.accExamCnt.toLocaleString()}</LoadingComponent></VerticalElement>
                </VerticalContainer>

            </HorizontalContainer>

        </VerticalContainer>
    </ScrollElement>
    )
}


export function WeeklyCovidTrends() {
    const { LastWeekCovidData } = useContext(LastWeekCovidContext);

    return (
        <ScrollElement>
        {(ref) => (
            <VerticalContainer>
            <ElementTitle>확진자 추세</ElementTitle>
            <HorizontalDivider />


            <LoadingComponent>
            {LastWeekCovidData.length&&
                <LinearGraph parent={ref} Height={100} RealHeightPercent={70} data={{
                    labels: LastWeekCovidData.map(D => D.decideCnt.toString()),
                    data: LastWeekCovidData.map(D => D.decideCnt)
                }} ShowNumber />
            }
            </LoadingComponent>

            <HorizontalContainer>
                {LastWeekCovidData.map((Data, i) => (
                    <HorizontalElement key={i} style={{fontSize: '.8rem'}}>
                        {GetDate(Data.createDt as Date)}
                    </HorizontalElement>
                ))}
            </HorizontalContainer>
            </VerticalContainer>
        )}
    </ScrollElement>
    )
}