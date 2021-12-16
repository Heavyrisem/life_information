import { CovidAPI } from "../model/CovidAPI";

const API = new CovidAPI("qZROU8a65Qg61gcpCNbiF8qSlva%2BjIT%2BunGeegk5cAlERCnjPYcMosujUQ49F7ZWt2TfOJdgy8Lowjinys6%2BeQ%3D%3D");

// API.Day(new Date('2021-12-14'), new Date()).then(V => {
    // console.log(V.request);
    // console.log(V);
    // V.map(Day => {
    //     console.log(Day.response.body.items.item);
    // })
// });


(async() => {
    console.log(await API.Day(new Date('2021-12-9'), new Date()));
})()