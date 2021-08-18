import * as mongoose from "mongoose";
import { ObjectFlags } from "typescript";

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  
  

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  stock:{
    type:Number,
    required: true,
    default:0
  },
  category:{
    type:String,
    required: true,
  },
  created_at:{
    type:Date, 
    required:true,
    default:new Date()
 },
  updated_at:{
    type:Date,
    required:true,
    default:new Date()
  },
  user_id: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true
  }  


});

export default mongoose.model('Product',productSchema);
