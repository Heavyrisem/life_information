import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CovidData } from "../../../../shared/CovidAPI";
import { ElementTitle, Emphasis, HorizontalContainer, HorizontalDivider, HorizontalElement, LoadingComponent, ScrollElement, ScrollView, VerticalContainer, VerticalElement } from "../../components/Elements";
import { LinearGraph } from "../../components/LinearGraph";
import { AdditionalData, WeeklyCovidTrends } from "./CovidElements";

import { LastWeekCovidContext, TodayCovidContext } from "../../context/CovidContext";
import { GetDate } from "../../Utils/Date";
import API from "../../API";


const StyledDecideCnt = styled.div`
    font-size: 3rem;
    margin: .5rem 0;
`;

const StyledTime = styled.div`
    font-size: .8rem;
`;

const initCovidData: CovidData = {
    accExamCnt: 18381569,
    createDt: new Date('2021-12-16 09:09:11.111'),
    deathCnt: 4518,
    decideCnt: 544117,
    seq: 729,
    stateDt: 20211216,
    stateTime: '00:00',
    updateDt: null
}

const initLastWeekCovidData: CovidData[] = [
{
    accExamCnt: 18381569,
    createDt: new Date('2021-12-17 09:09:11.111'),
    deathCnt: 4518,
    decideCnt: 544117,
    seq: 729,
    stateDt: 20211216,
    stateTime: '00:00',
    updateDt: null
},
  {
    accExamCnt: 18381569,
    createDt: new Date('2021-12-16 09:09:11.111'),
    deathCnt: 4518,
    decideCnt: 544117,
    seq: 729,
    stateDt: 20211216,
    stateTime: '00:00',
    updateDt: null
  },
  {
    accExamCnt: 18298675,
    createDt: new Date('2021-12-15 09:02:08.087'),
    deathCnt: 4456,
    decideCnt: 536495,
    seq: 728,
    stateDt: 20211215,
    stateTime: '00:00',
    updateDt: null
  },
  {
    accExamCnt: 18224740,
    createDt: new Date('2021-12-14 09:05:48.519'),
    deathCnt: 4386,
    decideCnt: 528645,
    seq: 727,
    stateDt: 20211214,
    stateTime: '00:00',
    updateDt: new Date('2021-12-15 09:34:15.942')
  },
  {
    accExamCnt: 18140572,
    createDt: new Date('2021-12-13 09:00:10.891'),
    deathCnt: 4292,
    decideCnt: 523078,
    seq: 726,
    stateDt: 20211213,
    stateTime: '00:00',
    updateDt: new Date('2021-12-15 09:34:27.939')
  },
  {
    accExamCnt: 18084589,
    createDt: new Date('2021-12-12 08:35:19.089'),
    deathCnt: 4252,
    decideCnt: 517261,
    seq: 725,
    stateDt: 20211212,
    stateTime: '00:00',
    updateDt: new Date('2021-12-15 09:34:56.326')
  },
  {
    accExamCnt: 17950721,
    createDt: new Date('2021-12-10 09:04:53.786'),
    deathCnt: 4130,
    decideCnt: 503602,
    seq: 723,
    stateDt: 20211210,
    stateTime: '00:00',
    updateDt: new Date('2021-12-15 09:03:58.221')
  },
  {
    accExamCnt: 17870821,
    createDt: new Date('2021-12-09 09:05:11.285'),
    deathCnt: 4077,
    decideCnt: 496854,
    seq: 722,
    stateDt: 20211209,
    stateTime: '00:00',
    updateDt: new Date('2021-12-15 15:45:08.786')
  }
]

export function Covid() {
    const { TodayCovidData, setTodayCovidData } = useContext(TodayCovidContext);
    const { LastWeekCovidData, setLastWeekCovidData } = useContext(LastWeekCovidContext);

    useEffect(() => {

        if (!TodayCovidData)
            API.covid.today().then(res => {
                if (res.status) setTodayCovidData(res.result);
            }).catch(err => console.log(err));

        if (!LastWeekCovidData.length)
            API.covid.lastWeek().then(res => {
                if (res.status) setLastWeekCovidData(res.result);
            }).catch(err => console.log(err));

        // setTimeout(() => {
        //     setTodayCovidData(initCovidData);
        //     setLastWeekCovidData(initLastWeekCovidData);
        // }, 1000);
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