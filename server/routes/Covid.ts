import { Request, Response, Router } from "express";
import { ERROR_T, recent_Request, recent_Response, today_Response } from "../../shared/Network";
import Global from "../Global";

const router = Router();

router.post("/today", async (req, res: Response<today_Response>) => {

    try {
        if (Global.CovidAPI) {
            const Result = await Global.CovidAPI.Day(new Date());
            
            return res.send({
                status: true,
                result: Result
            })
        } else throw ERROR_T.INVAILD_PARAMS;

    } catch (err) {
        console.log(err);
        return res.send({
            status: false,
            msg: err+""
        })
    }

})

router.post("/recent", async (req: Request<any,any,recent_Request>, res: Response<recent_Response>) => {
    const { start } = req.body;

    try {
        if (start && Global.CovidAPI) {
            const Result = await Global.CovidAPI.Day(new Date(start), new Date());
            
            return res.send({
                status: true,
                result: Result
            })
        } else throw ERROR_T.INVAILD_PARAMS;

    } catch (err) {
        console.log(err);
        return res.send({
            status: false,
            msg: err+""
        })
    }

})

export default router;