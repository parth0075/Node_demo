import { Router } from 'express';
import {  ProductController } from '../controllers/ProductController';
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
        this.router.get('/getAllproducts',ProductController.getAllProducts)
        this.router.get('/get-product/:productId',ProductController.getProductById);
        
    }

    postRoutes(){
        this.router.post('/add-product',ProductValidator.postAddProduct(),ProductController.postAddProduct);
    }

    patchRoutes(){
      this.router.patch('/edit-product/:id',ProductController.postEditProduct);
    }

    deleteRoutes(){
        this.router.delete('/delete-product/:id',ProductController.postDeleteProduct);
    }



}

export default new ProductRouter().router;