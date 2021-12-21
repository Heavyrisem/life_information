import axios, { Axios, AxiosInstance } from "axios";
import { resolve } from "path/posix";
import { CovidAPI_Request, CovidAPI_Response, CovidData, CovidSidoData } from "../../../shared/CovidAPI";

export class CovidAPI {
    instance: AxiosInstance;
    cacheData: {                   // For Caching
        // timestamp: Date
        lastWeek: CovidData[]
    }

    constructor(KEY: string) {
        this.cacheData = {
            lastWeek: []
        }
        const params: CovidAPI_Request = {
            serviceKey: KEY
        }

        this.instance = axios.create({
            baseURL: "http://openapi.data.go.kr/openapi/service/rest/Covid19",
            params,
            paramsSerializer: (params) => Object.keys(params).map(KEY => `${KEY}=${params[KEY]}`).join("&")
        });
    }

    async Day(start: Date, end?: Date): Promise<CovidData[]> {
        const params: CovidAPI_Request = {
            startCreateDt: this.yyyyMMDD(start)
        }
        // console.log(params);
        if (end) params.endCreateDt = this.yyyyMMDD(end);
        else params.endCreateDt = this.yyyyMMDD(start);

        const Response = await this.instance.get<CovidAPI_Response<CovidData | CovidData[]>>("/getCovid19InfStateJson", { params });

        if (Response.data.response.header.resultCode != '00') throw Response.data.response.header.resultMsg;
        if (!Response.data.response.body.items) throw "조회된 데이터가 없습니다.";

        if (!Array.isArray(Response.data.response.body.items.item)) {
            if (Response.data.response.body.items.item.updateDt === "null") Response.data.response.body.items.item.updateDt = null;

            return [Response.data.response.body.items.item];
        } else return Response.data.response.body.items.item.map(V => {
            if (V.updateDt === "null") V.updateDt = null;
            return V;
        });
    }

    async Sido(start: Date, end?: Date): Promise<CovidSidoData[]> {
        const params: CovidAPI_Request = {
            startCreateDt: this.yyyyMMDD(start)
        }
        // console.log(params);
        if (end) params.endCreateDt = this.yyyyMMDD(end);
        else params.endCreateDt = this.yyyyMMDD(start);

        const Response = await this.instance.get<CovidAPI_Response<CovidSidoData[]>>("/getCovid19SidoInfStateJson", { params });

        if (Response.data.response.header.resultCode != '00') throw Response.data.response.header.resultMsg;
        if (!Response.data.response.body.items) throw "조회된 데이터가 없습니다.";

        return Response.data.response.body.items.item.map(V => {
            if (V.updateDt === "null") V.updateDt = null;
            return V;
        });
    }

    // async LastWeek() {
    //     const Today = new Date();
    //     const Last7day = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);

    //     if (this.cacheData.lastWeek) {
    //         for (let i = 0; i < this.cacheData.lastWeek.length; i++) {
    //             const Data = this.cacheData.lastWeek[i];

    //             if (new Date(new Date(Data.createDt).getTime() + 1000 * 60 * 60 * 24 * 7) < Today) {
    //                 this.cacheData.lastWeek.splice(i, 1);
    //                 const Response = await this.Day(Today, Last7day);


    //             }
    //         }
    //     }
        // for (let i = 0; i < 7; i ++) {
            // const Data = this.cacheData.last7week[i];

            // if (!Data || new Date(Data.response.body.items.item.createDt) < Today) {
            //     this.cacheData.last7week.splice(i, 1);
            //     const Response = await this.Day(new Date(Date.now() - 1000 * 60 * 60 * 24 * (7-i)));
            //     console.log(Response.data.response)
            //     if (Response.data.response.header.resultCode == "00") this.cacheData.last7week.push(Response.data);
            //     else throw Response.data.response.header.resultMsg;
            // }
        // }
        // this.cacheData.last7week.map(D => (D.response.body.items)&& console.log(D.response.body.items.item.createDt));
        // this.cacheData.last7week.sort((a, b) => new Date(a.response.body.items.item.createDt).getTime() - new Date(b.response.body.items.item.createDt).getTime());
        // return this.cacheData.last7week;
    // }

    yyyyMMDD(Day: Date) {
        return `${Day.getFullYear()}${this.leftPad(Day.getMonth()+1)}${this.leftPad(Day.getDate())}`;
    }
    leftPad(n: number) {
        return n>=10? n:"0"+n;
    }
}

