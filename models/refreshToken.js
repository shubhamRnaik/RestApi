import mangoose from 'mongoose'
const Schema = mangoose.Schema;


const refreshSchema = new Schema({
   token:{type:String , unique:true },
},{timestamps: false});



export default mangoose.model("RefreshToken",refreshSchema,"refreshTokens")