import { Request, Response, Router } from "express";
import { ERROR_T, recent_Request, recent_Response, sido_Request, sido_Response, today_Response } from "../../shared/Network";
import Global from "../Global";
import Utils from "../model/Utils";

const router = Router();

router.post("/today", async (req, res: Response<today_Response>) => {

    try {
        if (Global.CovidAPI) {
            const Result = await (await Global.CovidAPI.Day(new Date())).shift();
            
            return res.send({
                status: true,
                result: Result
            })
        } else throw ERROR_T.INVAILD_PARAMS;

    } catch (err) {
        console.log(err);
        return res.send(Utils.ErrorResponse(err));
    }

})

router.post("/recent", async (req: Request<any,any,recent_Request>, res: Response<recent_Response>) => {
    const { start } = req.body;

    try {
        if (start && Global.CovidAPI) {
            const Result = await Global.CovidAPI.Day(new Date(start), new Date());

            Result.sort((a, b) => new Date(b.createDt).getTime() - new Date(a.createDt).getTime());

            for (let i = 1; i < Result.length; i++) {
                if (Result[i-1] && Result[i]) {
                    Result[i-1].decideCnt = Math.abs(Result[i-1].decideCnt - Result[i].decideCnt);
                }
            }
            Result.pop();
            // console.log(Result);
            return res.send({
                status: true,
                result: Result
            })
        } else throw ERROR_T.INVAILD_PARAMS;

    } catch (err) {
        console.log(err);
        return res.send(Utils.ErrorResponse(err));
    }

})

router.post("/sido", async (req: Request<any,any,sido_Request>, res: Response<sido_Response>) => {
    const { start } = req.body;

    try {
        if (start && Global.CovidAPI) {
            let Result = await Global.CovidAPI.Sido(new Date(start));

            Result.sort((a, b) => b.defCnt - a.defCnt);
            if (Result[0].gubun == "합계") Result.shift();

            // console.log(Result);

            return res.send({
                status: true,
                result: Result.splice(0, 5)
            });
        } else throw ERROR_T.INVAILD_PARAMS;
    } catch (err) {
        console.log(err);
        return res.send(Utils.ErrorResponse(err));
    }

})

export default router;