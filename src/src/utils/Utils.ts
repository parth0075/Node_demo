import * as Multer from 'multer';
import * as Bcrypt from "bcrypt";

const storageOptions = Multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + file.mimetype);
    }
});


export class Utils{

    public MAX_TOKEN_TIME = 60000;

    public multer = Multer({storage:storageOptions})

    static generateVerificationToken(size:Number=5){
        let digits = '0123456789';
        let otp = '';
        for(let i=0; i<size;i++){
            otp += digits[Math.floor(Math.random()* 10 )]
        }
        return parseInt(otp);
    }



    static encryptedPassword(password:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            Bcrypt.hash(password,10,((err,hash)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(hash);
                }
            }))
        })
    }


    static async comparePassword(password:{plainPassword:string,encryptedPassword:string}):Promise<any>{
     return new Promise ((resolve,reject)=> {
         Bcrypt.compare(password.plainPassword,password.encryptedPassword,((err,isValid)=>{
             if(err){
                 reject (err)
             }else if(!isValid){
                 reject (new Error('User and password does not match'));
             }else{
                 resolve(true);
             }
         })
     )   
    })
  }


}