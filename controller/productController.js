 import {Product, User} from '../models/index.js'
 import multer from 'multer';
import CustomErrorHandler from '../services/CustomErrorHandler.js';
import  path  from 'path'
import fs from 'fs'
import {productSchema} from '../validators/index.js'
 
//multi part form data to add product image not json as its used to add image data to user 
            // multer library is used to access multi part data
 const storage = multer.diskStorage({
    destination: (req,file,cb)=>cb(null,'./uploads/'),

    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()* 1e9)}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    },

});
const handleMultiPartData = multer({storage,limits:{fileSize:100000 * 5},}).single('image') // 5000000 * 5 = 5mb
 
 const productController = {

        async store(req,res,next){
            
            handleMultiPartData(req,res,async(err)=>{
                if(err){
                    return next (CustomErrorHandler.serverError(err.message))
                }
                console.log(req.file.path);
                const filepath = req.file.path
                //validate 
                
                
               const {error} = productSchema.validate(req.body)
               if(error){
                   //delete the uploaded file  

                   // rootfolder / uploads/ so make a global variable in server file 
                   fs.unlink(`${appRoot}/${filepath }`,(err)=>{
                       if(err){

                           return next (CustomErrorHandler.serverError(err.message))
                       }
                   })

                   return next (error)
                
            }

            const{name,price,size}=req.body;
            let document;

            try {
                document= await Product.create({
                    name,
                    price,
                    size,
                    image:filepath
                })
                
            } catch (error) {
                return next(error)
                
            }
           
            res.status(201).json(document)
        })


    },
    
    update(req, res, next) {
        handleMultiPartData(req, res, async (err) => {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
            let filePath;
            if (req.file) {
                filePath = req.file.path;
            }

            // validation
            const { error } = productSchema.validate(req.body);
            if (error) {
                // Delete the uploaded file
                if (req.file) {
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            return next(
                                CustomErrorHandler.serverError(err.message)
                            );
                        }
                    });
                }

                return next(error);
                // rootfolder/uploads/filename.png
            }

            const { name, price, size } = req.body;
            let document;
            try {
                document = await Product.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        name,
                        price,
                        size,
                        ...(req.file && { image: filePath }),
                    },
                    { new: true }
                );
            } catch (err) {
                return next(err);
            }
            res.status(201).json(document);
        });
    },

    async destroy(req,res,next){
        const document = await Product.findOneAndDelete({_id:req.params.id});

        if(!document){
            return next(CustomErrorHandler.serverError("no file found to delete"))
        }

        const imagePath = document.image;
        fs.unlink(`${appRoot}/${imagePath}`,(err)=>{
            if(err){
                return next(CustomErrorHandler.serverError('image file not found'))
            }

            return res.json(document)
        }
        
        )
    },
        
    
        async Index(req,res,next){
            let documents;
            // use pagination library of mongoose for more data to find 
              try {
                  documents = await Product.find().select("-updatedAt -__v").sort({_id:-1})
              } catch (error) {
                  return next(CustomErrorHandler.serverError('issue while fetching all products'))
                  
              }
             return res.json(documents)
          },
        async show(req,res,next){
            let document;
            try {
                document = await Product.findOne({_id:req.params.id}).select('-updatedAt -__v')
                
            } catch (error) {
                return next(CustomErrorHandler.serverError('the required file not found'))
                
            }
            return res.json(document)
        }
}
// ,
// async getProducts(req, res, next)=>{
//     let documents;
//     try {
//         documents = await Product.find({
//             _id: { $in: req.body.ids },
//         }).select('-updatedAt -__v');
//     } catch (err) {
//         return next(CustomErrorHandler.serverError());
//     }
//     return res.json(documents);
// },
// };

 


    

    




            

           









        
        







 

 export default productController;