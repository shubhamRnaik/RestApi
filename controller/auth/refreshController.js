import Joi from "joi";
import { RefreshToken ,User } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import jwtservice from "../../services/jwtservice.js";
import {REFRESHSECRET} from '../../config/index.js'

const refreshController = {
    async refresh(req,res,next){
        //validation
        const refreshSchema = Joi.object({
            refresh_token:Joi.string().required()
       });

       const {error} = refreshSchema.validate(req.body)
       

       if(error){
            return next(error)
            // throw error
                 } 

                 // check if the refresh token is in database to send new token 
                 let refreshToken;

                 try {
                    refreshToken =  await RefreshToken.findOne({token:req.body.refresh_token})

                    if(!refreshToken){
                        return next(CustomErrorHandler.UnAuthorized("Invalid refresh Token"))
                    }

                    // console.log(refreshToken); 
                    let user_id;
                    try {
                        const {_id} =  await jwtservice.verify(refreshToken.token,REFRESHSECRET)
                        user_id=_id;


                    } catch (err) {
                        return next(CustomErrorHandler.UnAuthorized("invalid refresh token "))
                    }
                        // check if user is present of that id

                        const user = await User.findOne({_id:user_id})
                        if(!user){
                            return next(CustomErrorHandler.UnAuthorized("user not found"))
                        }


                    // generate new token now 

                   
                         // create a token so we use jsonwebtoken 
                         const access_token = jwtservice.sign({_id:user._id,role:user.role})
                         const refresh_token = jwtservice.sign({_id:user._id,role:user.role},'1y',REFRESHSECRET)

                         // white list in database that is store secret key in database 

                         await RefreshToken.create({token:refresh_token})
                         res.json({access_token,refresh_token})

                 } catch (err) {
                     return next(new Error('something is wrong ' + err.message))
                     
                 }
    }
}

export default refreshController;