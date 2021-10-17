
import  Express  from "express";

import Opinion from './models/opinion.js';
import Morgan from "morgan";
import Rutasopinion from "./routes/opinion.routes.js";
//mport RutasUsuario from   "./routes/usuario.routes.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {createValoracion} from "./libs/configInit.js";
import fetch from 'node-fetch'


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
app.listen(process.env.PORT || 4000)

//GET con  
app.get("/",async(req,res)=>{
    
  await fetch("https://api-comercios.herokuapp.com/puntuacion")
  .then((resp) => {
      return resp.json()
  }).then((res) => {
      console.log(JSON.stringify(res))
      let menor = res.menor;
      let mayor = res.mayor;
      let promedio = res.promedio;
      console.log(menor)
      console.log(mayor)
      console.log(promedio)
      if ((menor < mayor) && (promedio <= mayor) && (promedio >= menor)) {
          new Opinion({
              comentario: "Los productos son buenos, recomiendo el comercio",
              valoracion: mayor
          }).save()
          

      } else {
          if ((menor < mayor) && (promedio >= mayor)) {
              new Opinion({
                  comentario: "Los productos del comercio son buenos",
                  valoracion: promedio
              }).save()
              
          }
          else {
              if ((menor < mayor) && (promedio === menor)) {
                  new Opinion({
                      comentario: "Malisimo, mal servicio no lo recomiendo para nada",
                      valoracion: menor
                  }).save()
                  


              }
          }
      }
  })

  const opinion = await Opinion.find().sort({ $natural:-1 }).limit(1)
  res.send(opinion)
  
  
  //res.send("hola mongo");
}) 



const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



export default app
