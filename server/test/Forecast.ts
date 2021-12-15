import axios from 'axios';
import { forecast_Request, forecast_Response } from '../../shared/Network';
import { Location_T } from '../../shared/Weather';

const Request: forecast_Request = {
    Location: Location_T.USERLOCATION,
    Position: {
        lat: 37.2329726,
        lon: 127.1859062
    }
}

axios.post<forecast_Response>("http://localhost/weather/forecast", Request).then(R => console.log(R.data)).catch(E => console.log(E));