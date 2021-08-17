import * as mongoose from 'mongoose';
import * as model from 'mongoose';

const userSchema = new mongoose.Schema({

    username:{
    type:String,
    required:true
    },
 
    email:{
        type:String,
        required:true
    },

    password:{
     type:String,
     required:true
    },

    verified:{
        type:Boolean,
        require:true,
        default:false
    },

    verification_token:{
        type:Number,
        required:true,
    },

    verification_token_time:{
        type:Date,
        required:true
    },

   createdAt:{
      type:Date, 
      required:true,
      default:new Date()
   },

  updatedAt:{
      type:String,
      required:true,
      default:new Date()
  }    
})

export default mongoose.model('User',userSchema);
