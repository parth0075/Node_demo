import * as bodyParser  from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import { getEnvironmentVariables } from "./environments/env";
import  ProductRouter  from "./routers/ProductRouter";
import  UserRouter  from "./routers/UserRouter";
export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfiguration();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfiguration() {
    this.setMongodb();
    this.configureBodyParser();
  }

  setMongodb() {
    mongoose
      .connect(getEnvironmentVariables().db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("db is connected");
      });
  }

  configureBodyParser(){
     this.app.use(bodyParser.urlencoded({extended:true})) 
  }

  setRoutes() {
      this.app.use('/api/user',UserRouter);
      this.app.use('/api/user/product',ProductRouter);
  }

  error404Handler() {
    this.app.use((req,res)=>{
        res.status(404).json({
          message:'Not Found',
          status_code:404  
        });
    });
  } 

  handleErrors() {
      this.app.use((error,req,res,next)=>{
          const errorStatus = req.errorStatus || 500;
          res.status(errorStatus).json({
              message:error.message || 'Something went wrong.',
                status_code:errorStatus
            })
      })
  }

}
