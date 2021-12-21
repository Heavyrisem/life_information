/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';

import { CovidData, CovidSidoData } from '../../../shared/CovidAPI';

interface TodayCovidContext {
	TodayCovidData?: CovidData;
	setTodayCovidData: (data: CovidData) => void;
}
export const TodayCovidContext = React.createContext<TodayCovidContext>({
	TodayCovidData: undefined,
	setTodayCovidData: () => ({}),
});
export function TodayCovidProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [TodayCovidData, setCovidData] = useState<CovidData>();

	function setTodayCovidData(data: CovidData) {
		const FixedData: CovidData = { ...data, createDt: new Date(data.createDt) };
		if (data.updateDt) FixedData.updateDt = new Date(data.updateDt);

		setCovidData(FixedData);
	}

	return (
		<TodayCovidContext.Provider value={{ TodayCovidData, setTodayCovidData }}>
			{children}
		</TodayCovidContext.Provider>
	);
}

interface LastWeekCovidContext {
	LastWeekCovidData: CovidData[];
	setLastWeekCovidData: (data: CovidData[]) => void;
}
export const LastWeekCovidContext = React.createContext<LastWeekCovidContext>({
	LastWeekCovidData: [],
	setLastWeekCovidData: () => ({}),
});
export function LastWeekCovidProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [LastWeekCovidData, setCovidData] = useState<CovidData[]>([]);

	function setLastWeekCovidData(data: CovidData[]) {
		const FixedData: CovidData[] = [];

		for (let i = 0; i < data.length; i += 1) {
			const Data = data[i];
			Data.createDt = new Date(Data.createDt);
			if (Data.updateDt) Data.updateDt = new Date(Data.updateDt);
			FixedData.push(Data);
		}

		FixedData.sort((a, b) => (a.createDt as Date).getTime() - (b.createDt as Date).getTime());

		setCovidData(FixedData);
	}

	return (
		<LastWeekCovidContext.Provider value={{ LastWeekCovidData, setLastWeekCovidData }}>
			{children}
		</LastWeekCovidContext.Provider>
	);
}

interface SidoCovidContext {
	SidoCovidData: CovidSidoData[];
	setSidoCovidData: (data: CovidSidoData[]) => void;
}
export const SidoCovidContext = React.createContext<SidoCovidContext>({
	SidoCovidData: [],
	setSidoCovidData: () => ({}),
});
export function SidoCovidProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
	const [SidoCovidData, setCovidData] = useState<CovidSidoData[]>([]);

	function setSidoCovidData(data: CovidSidoData[]) {
		const FixedData: CovidSidoData[] = [];

		for (let i = 0; i < data.length; i += 1) {
			const Data = data[i];
			Data.createDt = new Date(Data.createDt);
			if (Data.updateDt) Data.updateDt = new Date(Data.updateDt);
			FixedData.push(Data);
		}

		setCovidData(FixedData);
	}

	return (
		<SidoCovidContext.Provider value={{ SidoCovidData, setSidoCovidData }}>{children}</SidoCovidContext.Provider>
	);
}
