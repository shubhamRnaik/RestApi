import mangoose from 'mongoose'
const Schema = mangoose.Schema;


const userSchema = new Schema({
    name:{type:String , required:true },
    email:{type:String , required:true ,unique:true},
    password:{type:String , required:true },
    role:{type:String , default:"customer"},
    
},{timestamps: true});



export default mangoose.model("User",userSchema,"users")