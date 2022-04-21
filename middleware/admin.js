import {User} from '../models/index.js'
import CustomErrorHandler from '../services/CustomErrorHandler.js'

const admin = async(req,res,next)=>{
try {
    
    const user = await  User.findOne({_id:req.user._id})
    if (user.role === 'admin') {
        next()// next( ) empty means go to next middleware not error 
        
    } else {
        return next(CustomErrorHandler.UnAuthorized(message = "issue near admin role allocation "))
        
    }
} catch (error) {
    return next(CustomErrorHandler.serverError())
    
}



}



export default admin;