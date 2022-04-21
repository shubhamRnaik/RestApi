
import mangoose from 'mongoose'
const Schema = mangoose.Schema;



const productSchema = new Schema({
    name:{type:String , required:true },
    price:{type:Number, required:true },
    size:{type:String , required:true },
    image:{type:String , required:true },


},{timestamps: true,id:false});



export default mangoose.model("Product",productSchema,"Products")