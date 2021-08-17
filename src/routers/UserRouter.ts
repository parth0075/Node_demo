import { Router } from 'express';
import {  ProductController } from '../controllers/ProductController';
import { ProductValidator } from '../validators/ProductValidator';
import { UserValidator } from '../validators/UserValidator';
import  {UserController}  from '../controllers/UserController';
import { GlobalMiddleWare } from '../middlewares/GlobalMiddleWare';

 class UserRouter{

    public router: Router;

    constructor(){
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get('/send/verification/email',GlobalMiddleWare.authenticate,UserController.resendVerificationToken);
        this.router.get('/login',UserValidator.login(),GlobalMiddleWare.checkError,UserController.login);
        this.router.get('/reset/password',UserValidator.resetPassword,GlobalMiddleWare.checkError,UserController.resetPassword)
        
    }

    postRoutes(){
        this.router.post('/signup',UserValidator.signUp(),GlobalMiddleWare.checkError,UserController.signup)
    }

    patchRoutes(){
        this.router.patch('/verify',UserValidator.verifyUser(),GlobalMiddleWare.checkError,GlobalMiddleWare.authenticate,UserController.verify)
        this.router.patch('/update/password',UserValidator.updatePassword(),GlobalMiddleWare.checkError,GlobalMiddleWare.authenticate,UserController.updatePassword)
   
    }

    deleteRoutes(){
  
    }



}

export default new UserRouter().router;