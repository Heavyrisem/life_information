import { CovidSidoData } from "../../shared/CovidAPI";
import { CovidAPI } from "../model/CovidAPI";

const API = new CovidAPI("qZROU8a65Qg61gcpCNbiF8qSlva%2BjIT%2BunGeegk5cAlERCnjPYcMosujUQ49F7ZWt2TfOJdgy8Lowjinys6%2BeQ%3D%3D");

// API.Day(new Date('2021-12-14'), new Date()).then(V => {
    // console.log(V.request);
    // console.log(V);
    // V.map(Day => {
    //     console.log(Day.response.body.items.item);
    // })
// });


function sortbydefCnt(a: CovidSidoData, b: CovidSidoData) {
    return b.defCnt - a.defCnt;
}

(async() => {
    console.log(await (await API.Sido(new Date())).sort(sortbydefCnt).splice(0, 5));
})()