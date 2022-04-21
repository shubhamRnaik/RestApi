import express from 'express'
import {registerController,loginController,userController,refreshController,productController} from '../controller/index.js'
import  auth from '../middleware/auth.js'
import  admin from '../middleware/admin.js'

const router = express.Router();


router.post('/register',registerController.register)
router.post('/login',loginController.login)
router.get('/me',auth,userController.use)
router.post('/refresh',refreshController.refresh)
router.post('/logout',auth,loginController.logout)

// for products
router.post('/product',[auth,admin],productController.store)
router.put('/product/:id',[auth,admin],productController.update)
router.delete('/product/:id',[auth,admin],productController.destroy)
router.get('/product',productController.Index)
router.get('/product/:id',productController.show)

export default router;