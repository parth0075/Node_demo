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
        const error = validationResult(req);
        const name = req.body.name;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const stock = req.body.stock;

        if(!error.isEmpty()){
            const newError = new Error(error.array()[0].msg);
            next(newError);
        }

        const product = new Product({
            name:name,
            imageUrl:imageUrl,
            price:price,
            description:description,
            stock:stock
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
        
        try{
        const productId = req.params.id;
        const updates = req.body;
        const options = {new:true};
        const result = await Product.findByIdAndUpdate(productId,updates,options);
        res.send(result);
        }catch(error){
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


 }