import {body,query} from 'express-validator';
import { nextTick } from 'process';
import User from '../Models/UserModel';

export class UserValidator{


 static signUp(){
    return [body('email','Email is Required').isEmail()
    .custom((email,{req})=>{
        return User.findOne({email:email})
        .then(user => {
            if (user) {
                throw new Error('User Already Exist')
            }else{
                return true;
            }
        })
        .catch(err => {
            throw new Error(err);
        })
    }),
    body('password','Password is Required').isAlphanumeric().isLength({min:8, max:20}).withMessage('Password can be 8-20 char..'),
    body('username','Username is Required').isString()]
 }


   static verifyUser() {
    return [body('verification_token', 'Verification Token is Required').isNumeric()]
   }

   static resendVerificationEmail(){
       return [query('email','Email is required').isEmail()]
   }


   static login(){
        return [query('email','Email is Required').isEmail()
        .custom((email,{req})=>{
         return  User.findOne({email:email}).then(user =>{
                if(user){
                    req.user = user;
                    return true;    
                }else{
                    throw new Error('User does not exist')
                }
            });
        }),query('password','Password is Required').isAlphanumeric()]
    }


    static updatePassword(){
        return [body('password','password is required').isAlphanumeric(),
                body('confirm_password','Confirm_Password is required').isAlphanumeric(),
                body('new_password','new_password is required').isAlphanumeric()
                .custom((newPassword,{req})=>{
                    if(newPassword === req.body.confirm_password){
                        return true
                    }else{
                        req.errorStatus=422;
                        //unmatch entity;
                        throw new Error('New_Password and Confirm_Password not match')
                    }
                })]
    }


    static resetPassword(){
        return [body('email','Email is Required').isEmail().custom((email,{req})=>{
              User.find({email:email})
              .then(user => {
                  if(user){
                      return true;
                  }else{
                    throw new Error('User Email Does Not Exist');
                  } 
              })
        })]
    }
}