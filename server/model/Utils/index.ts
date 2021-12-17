import crypto from "crypto";
import { error_Response } from "../../../shared/Network";


export default {
    SHA256: (str: string): string => crypto.createHash('sha256').update(str).digest('hex'),
    ErrorResponse: (err: any): error_Response => ({status: false, msg: err+""})
}