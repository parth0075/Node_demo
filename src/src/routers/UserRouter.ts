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
        this.router.get('/reset/password/token',UserValidator.resetPassword(),GlobalMiddleWare.checkError,UserController.resetPassword)  
        this.router.get('/verify/reset/password-token',UserValidator.verifyResetPasswordToken(),GlobalMiddleWare.checkError,UserController.verifyResetToken)
    }

    postRoutes(){
        this.router.post('/signup',UserValidator.signUp(),GlobalMiddleWare.checkError,UserController.signup)
    }

    patchRoutes(){
        this.router.patch('/verify',UserValidator.verifyUser(),GlobalMiddleWare.checkError,UserController.verify)
        this.router.patch('/update/password',GlobalMiddleWare.authenticate,UserValidator.updatePassword(),GlobalMiddleWare.checkError,UserController.updatePassword)
        this.router.patch('/reset/password',UserValidator.patchResetPassword(),GlobalMiddleWare.checkError,UserController.patchResetPasswordToken)
    }

    deleteRoutes(){
  
    }



}

export default new UserRouter().router;