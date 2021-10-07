import  Mongoose  from "mongoose";


const opinionSchema=Mongoose.Schema({

    comentario: {type:String, require:true},
    valoracion: [{
        ref: "Valoracion",
        type: Mongoose.Schema.Types.ObjectId
      }]
  


})

export default Mongoose.model('opinion',opinionSchema)