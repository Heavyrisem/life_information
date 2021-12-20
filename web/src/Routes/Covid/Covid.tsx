import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { CovidData } from "../../../../shared/CovidAPI";
import { Emphasis, LoadingComponent, ScrollView } from "../../components/Elements";
import { AdditionalData, WeeklyCovidTrends } from "./CovidElements";

import { LastWeekCovidContext, TodayCovidContext } from "../../context/CovidContext";
import API from "../../API";


const StyledDecideCnt = styled.div`
    font-size: 3rem;
    margin: .5rem 0;
`;

const StyledTime = styled.div`
    font-size: .8rem;
`;


export function Covid() {
    const { TodayCovidData, setTodayCovidData } = useContext(TodayCovidContext);
    const { LastWeekCovidData, setLastWeekCovidData } = useContext(LastWeekCovidContext);

    useEffect(() => {

        if (!TodayCovidData)
            API.covid.today().then(res => res.status&& setTodayCovidData(res.result)).catch(alert);

        if (!LastWeekCovidData.length)
            API.covid.lastWeek().then(res => res.status&& setLastWeekCovidData(res.result)).catch(alert);

    }, []);
    

    return (
        <ScrollView>
            <Emphasis>
                <div>확진자</div>
                <StyledDecideCnt><LoadingComponent>{TodayCovidData&& TodayCovidData.decideCnt.toLocaleString()+"명"}</LoadingComponent></StyledDecideCnt>
                <StyledTime>{TodayCovidData&& new Date(TodayCovidData.updateDt? TodayCovidData.updateDt:TodayCovidData.createDt).toLocaleString()+" 기준"}</StyledTime>
            </Emphasis>

            <AdditionalData />

            <WeeklyCovidTrends />
        </ScrollView>
    )
}