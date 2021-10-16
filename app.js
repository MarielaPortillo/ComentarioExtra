
import  Express  from "express";
import Morgan from "morgan";
import Rutasopinion from "./routes/opinion.routes.js";
//mport RutasUsuario from   "./routes/usuario.routes.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {createValoracion} from "./libs/configInit.js";


createValoracion();


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de comentarios",
        version: "1.0.0",
        description:
          "Esta es una API para poder encontrar informacion de los comentarios",
      },
      servers: [
        {
          url: "http://localhost:4000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };




const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended:true})); 
app.use(Morgan('dev'))
app.use(Rutasopinion)
//app.use(RutasUsuario)
app.set(process.env.PORT )

//GET con  
app.get("/",(req,res)=>{
    res.send("hola mongo");
})



const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



export default app
