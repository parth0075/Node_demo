import User from "../Models/UserModel";
import { NodeMailer } from "../utils/NodeMailer";
import { Utils } from "../utils/Utils";
import * as Bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'

export class UserController {

//   static async signup(req, res, next) {
//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;
//     const verificationToken = Utils.generateVerificationToken();
//     try {
//         const hash = await Utils.encryptedPassword(password);
//         const data = {
//             email: email,
//             password: hash,
//             username: username,
//             verification_token: verificationToken,
//             verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
//             created_at: new Date(),
//             updated_at: new Date()
//         };
//         let user = await new User(data).save();
//         res.send(user);
//         await NodeMailer.sendEMail({
//             to: [email], subject: 'Email Verification',
//             html: `<h1>${verificationToken}</h1>`
//         })
//     } catch (e) {
//         next(e);
//     }
// }
  static async signup(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const verificationToken = Utils.generateVerificationToken();

    try {
      await Bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          next(err);
          return;
        }
        const data = {
          username: username,
          email: email,
          password: hash,
          cart:{items:[]},
          verification_token: verificationToken,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        };

        let user = await new User(data).save();
        res.send(user);
        await NodeMailer.sendEMail({
          to: ["parth.b@peerbits.com"],
          subject: "email verification",
          html: `<h1>${verificationToken}</h1>`,
        });
      });
    } catch (e) {
      next(e);
    }
  }

  static async verify(req, res, next) {
    const verificationToken = req.body.verification_token;
    const email = req.body.email;
    try {
        const user = await User.findOneAndUpdate({
            email: email, verification_token: verificationToken,
            verification_token_time: {$gt: Date.now()}
        }, {verified: true, updated_at: new Date()}, {new: true});
        if (user) {
            res.send(user);
        } else {
            throw new Error('Verification Token Is Expired.Please Request For a new One');
        }
    } catch (e) {
        next(e);
    }
}

  static async resendVerificationToken(req, res, next) {
    const email = req.user.email;
    const verificationToken = Utils.generateVerificationToken();

    try {
      const user: any = await User.findOneAndUpdate(
        { email: email },
        {
          verification_token: verificationToken,
          verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        }
      );

      if (user) {
        const mailer = await NodeMailer.sendEMail({
          to: [email],
          subject: "email verification",
          html: `<h1>${verificationToken}</h1>`,
        });
        res.json({
          success: true,
        });
      } else {
        throw new Error("user does not exist");
      }
    } catch (e) {
      next(e);
    }
  }

  static async login(req,res,next){
     const email = req.query.email;
    const password = req.query.password;
    const user = req.user;
    try{
        await Utils.comparePassword({
            plainPassword:password,
            encryptedPassword:user.password
        });

        const token = jwt.sign({email:user.email,user_id:user._id},'secret',{expiresIn:'120d'});
        const data = {
            user:user,
            token:token
        }
        res.json(data);
    }catch(e){

    }

}


static async updatePassword(req, res, next){
      const userId = req.user.user_id;
      const password = req.body.password;
      const newPassword = req.body.new_password;

      try{
         const user:any =  await User.findOne({_id:userId})
               await Utils.comparePassword({plainPassword:password,encryptedPassword:user.password});    
              const encryptedPassword = await Utils.encryptedPassword(newPassword);
              const newUser = await User.findOneAndUpdate({_id:userId},{password:encryptedPassword},{new:true})
              res.send(newUser);
        }
      catch(err){
          next(err);
      }

}

    static async resetPassword(req,res,next){
        
        const email= req.query.email;
        const resetVerificationToken = Utils.generateVerificationToken();
        try{

            const user: any = await User.findOneAndUpdate(
                { email: email },
                {
                  
                  reset_password_token:resetVerificationToken,
                  reset_verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
                  updated_at: new Date()
                },
                {
                  new:true
                });

                res.send(user);

                     await NodeMailer.sendEMail({
                      to: [email],
                      subject: "Reset Password",
                      html: `<h1>${resetVerificationToken}</h1>`,
                    });
                    res.json({
                      success:true,
                    });
        }catch(e){
            next(e);
        }

    }



    static verifyResetToken(req,res,next){
      res.json({
        success:true,
        completed:'Reset_Password token verified'
        })
    }

      static async patchResetPasswordToken(req,res, next){
        const user = req.user;
        const newPassword = req.body.new_password;
        try {
            const encryptedPassword = await Utils.encryptedPassword(newPassword);
            const updatedUser = await User.findOneAndUpdate({_id: user._id}, {
                updated_at: new Date(),
                password: encryptedPassword
            }, {new: true});
            res.send(updatedUser);
        } catch (err) {
            next(err);
        }
    }



}
