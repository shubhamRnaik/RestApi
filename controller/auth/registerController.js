import Joi from "joi";
import {User,RefreshToken} from '../../models/index.js'
import bcrypt from "bcrypt"
import jwtservice from '../../services/jwtservice.js'
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import {REFRESHSECRET} from '../../config/index.js'

const registerController={
     async register(req,res,next){
          // [validation]

          const validationSchema = Joi.object({
               name:Joi.string().min(3).max(7).required(),
               email:Joi.string().email().required(),
               password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
               password_repeat:Joi.ref('password')

               // (new RegExp('^[a-zA-Z0-9]{3,30}$')
          

          });

          const {error} = validationSchema.validate(req.body)
          

          if(error){
               return next(error)
               // throw error
                    } 

                    // end of validation  now check if user id is already registered  using email 

                     try{

                         const exist = await User.exists({email:req.body.email})
                         if(exist){
                              return next(CustomErrorHandler.alreadyExist('this email is already Taken '))
                         }
                     }


                     catch(err){
                          return next(err)

                     }
                     const {name,password,email} = req.body
                     //hash password 

                    const hashed_password = await  bcrypt.hash(password,10);

                    //prepare model 
                    
                    const user= new User({
                         name,
                         email,
                         password:hashed_password
                    })

                    // add in data base
                         let access_token;
                         let refresh_token;

                    try{
                         const result = await user.save();
                         // create a token so we use jsonwebtoken 
                         access_token = jwtservice.sign({_id:result._id,role:result.role})
                         refresh_token = jwtservice.sign({_id:result._id,role:result.role},'1y',REFRESHSECRET)

                         // white list in database that is store secret key in database 

                         await RefreshToken.create({token:refresh_token})

                    }catch(err){
                         return next(err)

                    }
                    // console.log(access_token);
               res.json({access_token,refresh_token})
  }
}


export default registerController; 