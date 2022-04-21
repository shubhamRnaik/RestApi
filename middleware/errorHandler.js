
import { ValidationError } from "joi/lib/errors.js";



import {DEBUG_MODE} from '../config/index.js'
import CustomErrorHandler from "../services/CustomErrorHandler.js";
const  errorHandler=(err,req,res,next)=>{
let statuscode = 500;
let data={
    message: "internal server error",

    ...(DEBUG_MODE==='TRUE'&& {orignalError :err.message})
    // takes a condition and runs a object
}
if( err instanceof ValidationError){
    statuscode=400;
    data={
        message:err.message
    }
}

if( err instanceof CustomErrorHandler){
    statuscode = err.status;
    data = {
        message: err.message
    }
}


return res.status(statuscode).json(data)
}


export default errorHandler; 