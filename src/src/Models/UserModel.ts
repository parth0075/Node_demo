import * as mongoose from 'mongoose';
import * as model from 'mongoose';
const Schema = mongoose.Schema;
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

    reset_password_token:{
       type:Number
       
    },
    reset_verification_token_time:{
        type:Date
        
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
  },
     productId:[{ 
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
     }],
     

})  

export default mongoose.model('User',userSchema);
