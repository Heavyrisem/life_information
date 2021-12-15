
export function GetHour(Target: Date) {
    // console.log(Target);
    Target = new Date(Target);
    const Now = new Date();
    // const CalculatedDate = new Date(Math.abs(Target.getTime() - Now.getTime()));

    let result = "";
    // console.log(Now.getHours(), CalculatedDate.getHours());
    if (Target.getHours() === Now.getHours() && Target.getDay() === Now.getDay()) result = "지금";
    else result = `${Target.getHours()}시`;

    return result;
}

export const DAY = ["일", "월", "화", "수", "목", "금", "토"];
export function GetDay(Target: Date) {
    const Now = new Date();
    let result = "";

    if (Target.getDay() === Now.getDay() && Target.getDate() === Now.getDate()) result = "오늘";
    else result = DAY[Target.getDay()];

    return result;
}