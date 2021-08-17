import { validationResult } from 'express-validator';
import * as jwt from 'jsonwebtoken';



export class GlobalMiddleWare{

    static checkError(req,res,next) {
        const error= validationResult(req);
        if(!error.isEmpty()){
            next(new Error(error.array()[0].msg));
        }
        else{
            next();
        }
    }


    static async authenticate(req,res,next){
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7,authHeader.length) : null;

        try{
            req.errorStatus = 401;
            jwt.verify(token,'secret',((err,decoded)=>{
                if(err){
                    next(err)
                }else if(!decoded){
                    next (new Error('user not authorized'))
                }else{
                    req.user = decoded;
                        next();
                }
            }))
        }catch(e){
            next(e);
        }
    }
 
}