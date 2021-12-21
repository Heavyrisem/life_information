export function GetHour(Target: Date) {
	const Now = new Date();

	let result = '';
	if (Target.getHours() === Now.getHours() && Target.getDay() === Now.getDay()) result = '지금';
	else result = `${Target.getHours()}시`;

	return result;
}

export const DAY = ['일', '월', '화', '수', '목', '금', '토'];
export function GetDay(Target: Date) {
	const Now = new Date();
	let result = '';

	if (Target.getDay() === Now.getDay() && Target.getDate() === Now.getDate()) result = '오늘';
	else result = DAY[Target.getDay()];

	return result;
}

export function GetDate(Target: Date) {
	const Now = new Date();
	let result = '';

	if (Target.getDate() === Now.getDate() && Target.getMonth() === Now.getMonth()) result = '오늘';
	else result = `${Target.getDate()}일`;

	return result;
}
