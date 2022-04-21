
import jwt from "jsonwebtoken";
import{JWTSECRET} from '../config/index.js'

class jwtservice{
    static sign(payload ,expiry="60s",secret=JWTSECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry})
    }
    static verify(token ,secret=JWTSECRET){
        return jwt.verify(token,secret)
    }
    }

    export default jwtservice