 import Product from '../Models/ProductModel'
 import {validationResult} from 'express-validator'
 
 export class ProductController{

    static getAllProducts (req,res,next){
        Product.find()
        .then(product =>{
            res.status(200).send(product)
        })
        .catch(err => {
            next(err);
        })
    }

    static getProductById(req,res,next){
        const prodId = req.params.productId;
        Product.findById(prodId)
        .then(product => {
            if (!product) {
                const error = new Error('Username Is Required')
                next(error)
            }else{
                res.status(200).send(product)
            }
        })
        .catch(err => {
            next(err);
        })
    }

    static async postAddProduct (req,res,next){
        const userId = req.user.user_id;
        const name = req.body.name;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const stock = req.body.stock;
        const category = req.body.category;
        const product = new Product({
            user_id:userId,
            name:name,
            imageUrl:imageUrl,
            price:price,
            description:description,
            stock:stock, 
            category:category,
            created_at:new Date(),
            updated_at:new Date()
        });

        product.save()
        .then(product => {
            res.status(200).send(product)
        })
        .catch(err => {
            next(err)
        })
    }


    static async postEditProduct(req,res,next){
   
        console.log('this is called')
        const userId = req.user.user_id;
        console.log(userId);
        const productId = req.params.id;
        const updates = req.body;
        const options = {new:true};
        try{
        const result = await Product.findByIdAndUpdate(productId,updates,options);
        res.send(result);
        }catch(error){
            console.log('catching th error');
            next(error);
        }
     }

    static async postDeleteProduct(req,res,next){ 
        const productId = req.params.id;  
        try{
        
            const result = await Product.findByIdAndDelete(productId);
            res.send(result);
        }catch(error){
            next(error);
        }
     
    }

    static async getProductByUserId(req,res,next){
        const userId= req.params.userId;
      const product=  await Product.findOne({user_id:userId})
        res.send(product);
    }


 }