import {User} from '../../models/index.js'
import CustomErrorHandler from "../../services/CustomErrorHandler.js";



const userController = { 
    async use(req,res,next){
        try{
            const user = await  User.findOne({_id: req.user._id}).select('-password -updatedAt -__v ')
            if(!user){
                return next(CustomErrorHandler.UserNotFound())
            }
            res.json(user)
        }
        catch(err){
            return next(err)
        }

    }
}


export default userController;