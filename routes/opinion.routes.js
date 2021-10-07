import Router from "express"
import opinionController from "../controllers/opinionController.js"
const ruta = Router();




/**
 * @swagger
 * tags:
 *  name: Opinion
 *  description: Opinion en comentarios
 */



/**
 * @swagger
 * /listadoOpinion:
 *  get:
 *      summary: Obtener Opiniones
 *      tags: [Opiniones]
 *      description: Obteniendo todos
 *      produces: 
 *          - application/json
 *      responses:
 *          200:
 *              description: Todos las Opiniones
 *              schema:
 *              type: json
 * 
 */

//listar todos
ruta.get("/listadoOpinion",opinionController.listado)



/**
   * @swagger
   * /uno/{id}:
   *  get:
   *      summary: Obtener una opinion
   *      tags: [Opiniones]
   *      description: Obteniendo Uno
   *      produces: 
   *             - application/json
   *      parameters:
   *             - in: path
   *               name: id
   *               description: Id de la opinion
   *      responses:
   *          200:
   *              description: Una opinion
   *              schema:
   *              type: json
   * 
   */

//listaruno
ruta.get("/uno/:id",opinionController.uno)




/**
 * @swagger
 * /registrar:
 *  post:
 *      summary: Creando opinion
 *      tags: [Opiniones]
 *      description: Creando nueva opinion
 *      requestBody:
 * 
 *          content:
 *              application/json:
 *                  
   * 
   */

ruta.post("/registrar",opinionController.registrar)

//delete
ruta.delete("/eliminarOpinion/:id",opinionController.eliminar)

//editar
ruta.put("/editarOpinion/:id",opinionController.actualizar)
export default ruta 