import { Router } from 'express';
import {  ProductController } from '../controllers/ProductController';
import { GlobalMiddleWare } from '../middlewares/GlobalMiddleWare';
import { ProductValidator } from '../validators/ProductValidator';

 class ProductRouter{

    public router: Router;

    constructor(){
        this.router = Router();

        this.getRoutes();
        
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get('/get-all-products',ProductController.getAllProducts)
        this.router.get('/get-product/:productId',ProductController.getProductById);
        this.router.get('/get-products/:userId',ProductController.getProductByUserId)
        
    }

    postRoutes(){
        this.router.post('/add-product',GlobalMiddleWare.authenticate,ProductValidator.postAddProduct(),GlobalMiddleWare.checkError,ProductController.postAddProduct);
    }

     patchRoutes(){
       this.router.patch('/edit-product/:id',GlobalMiddleWare.authenticate,ProductController.postEditProduct);
     }

    deleteRoutes(){
        this.router.delete('/delete-product/:id',GlobalMiddleWare.authenticate,ProductController.postDeleteProduct);
    }



}

export default new ProductRouter().router;