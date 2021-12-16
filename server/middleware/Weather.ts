import { Request, Response, NextFunction } from "express";
import { error_Response, ERROR_T, weather_common_Request } from "../../shared/Network";
import { Location_coords } from "../../shared/OpenWeatherAPI";
import { LocationArray, Location_T } from "../../shared/Weather";

export default {
    TransformLocation: (req: Request<any,any,weather_common_Request>, res: Response<error_Response>, next: NextFunction) => {
        const { Location, Position } = req.body;

        if (Location) {
            if (!(Location === Location_T.USERLOCATION || Position)) {

                for (let i = 0; i < LocationArray.length; i++) {
                    const KEY = LocationArray[i];

                    if (Location_T[KEY] === Location) {
                        const Coord = Location_coords[KEY];
                        
                        console.log(Coord);
                        req.body.Position = Coord;
                    }
                }
                
            }

            return next();
        }

        return res.send({ status: false, msg: ERROR_T.INVAILD_PARAMS });
    }
}