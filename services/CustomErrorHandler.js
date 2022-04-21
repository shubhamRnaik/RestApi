class CustomErrorHandler extends Error{
    constructor(status,msg){
        super()
this.status = status;
this.message = msg;
    }

    static alreadyExist(message){
        return new CustomErrorHandler(409,message);

    }
    static wrongCredential(message='username or password is incorrect'){
        return new CustomErrorHandler(401,message);

    }
    static UnAuthorized(message='Unauthorized access'){
        return new CustomErrorHandler(401,message);

    }
    static UserNotFound(message='User not found'){
        return new CustomErrorHandler(404,message);

    }
    static serverError(message='internal server Error'){
        return new CustomErrorHandler(500,message);

    }
}

export default CustomErrorHandler;

