import {body, param} from 'express-validator';
import Product from '../Models/ProductModel'
import {validationResult} from 'express-validator'

export class ProductValidator{

    static postAddProduct(){
        return [body('name','Product name is required').isString(),
                body('price','price is required').isNumeric(),
                body('description','description is required').isString(),
                body('stock','stock is required').isNumeric(),
                body('category','category is required').isString()
    ]
    }


}