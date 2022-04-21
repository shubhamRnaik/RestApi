import Joi from "joi";
import { User,RefreshToken} from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import jwtservice from '../../services/jwtservice.js'
import bcrypt from 'bcrypt'
import{ REFRESHSECRET } from '../../config/index.js'


const loginController={
    async login(req,res,next){

        //validation

         const loginSchema=Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
         });

         const{error} = loginSchema.validate(req.body) 

         if (error){

             return next(error)
        }
        // check if mail is same as saved in db
        try{
            const user = await User.findOne({email : req.body.email})
            if(!user){
                return next(CustomErrorHandler.wrongCredential())
            }
            //compare
            // console.log(user, req.body.password);
            const match = await bcrypt.compare(req.body.password,user.password)
            if(!match){
                return next(CustomErrorHandler.wrongCredential())
            }

            // / if match generate the token 

            const access_token = jwtservice.sign({_id:user._id,role:user.role})
           const  refresh_token = jwtservice.sign({_id:user._id,role:user.role},'1y',REFRESHSECRET)

                         // white list in database that is store secret key in database 

                         await RefreshToken.create({token:refresh_token})


            res.json({access_token,refresh_token })
        }
        catch(error){
            return next(error)
        }
     },

     // delete the  refresh tokemafter validation 


     async logout(req,res,next){
         // validation 
         const refreshSchema = Joi.object({
            refresh_token:Joi.string().required()
       });

       const {error} = refreshSchema.validate(req.body)
       
       if(error){
           return next(error)
       }

        try {

            await RefreshToken.deleteOne({token: req.body.refresh_token})
            

            
        } catch (error) {
            return next( new error ('something went wrong ' + error.message))
            
        }

        res.json({message:" status 1"})
     }

}
export default loginController;