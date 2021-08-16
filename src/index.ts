import  {Server}  from "./server";



let server = new Server().app;
let PORT = 5000;

server.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`)
})