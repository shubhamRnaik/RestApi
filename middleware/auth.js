import user from "../models/user.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import jwtservice from "../services/jwtservice.js";

const auth = async  (req,res,next)=>{
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader){
        return next(CustomErrorHandler.UnAuthorized())
    }

    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
        const {_id , role} = await jwtservice.verify(token)

        const user={
            _id,
            role
        }

        req.user = user
        next()
        // req.user= {};
        // req.user.id = _id;
        // req.user.role = role;
        
    } catch (err) {
       return  next(CustomErrorHandler.UnAuthorized)
        
    }
}

export default auth;
