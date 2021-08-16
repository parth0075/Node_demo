import { DevelopmentEnvironment } from "./dev.env";
import { ProductionEnvironment } from "./prod.env";

export interface Environment{
    db_url:string;
}


export function getEnvironmentVariables(){
if (process.env.NODE_ENV === 'production') {
    return ProductionEnvironment;
}else{
    return DevelopmentEnvironment
}
}
