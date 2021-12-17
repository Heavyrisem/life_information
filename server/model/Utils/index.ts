import crypto from "crypto";


export default {
    SHA256: (str: string): string => crypto.createHash('sha256').update(str).digest('hex')
}