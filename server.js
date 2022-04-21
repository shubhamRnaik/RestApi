import express from "express";
const app = express();
import {APP_PORT,DB_URL} from "./config/index.js"
import errorHandler from "./middleware/errorHandler.js";
import router from './routes/index.js'
import mongoose from 'mongoose'
import auth from "./middleware/auth.js";
import path from 'path'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'))

db.once('open',()=>{  
    console.log("db is connected");
})


global.appRoot=path.resolve(__dirname)


// app.use(BodyParser.urlencoded({ extended: false }))
// app.use(BodyParser.json())

app.use(express.json());
app.use(express.urlencoded({extended:false}))
// this so image or multi part data would work in express 

// always define app.use (router ) at bottom 
app.use(router);
// always define error handler at bottom 
app.use(errorHandler)
app.use("/uploads",express.static('/uploads'))

app.listen(APP_PORT,(req,res)=>{
    console.log(`i m listening at port ${APP_PORT}`)
    
})