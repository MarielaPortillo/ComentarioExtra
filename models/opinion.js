import  Mongoose  from "mongoose";


const opinionSchema=Mongoose.Schema({

    comentario: {type:String, require:true},
    nc: {type:Number, require:true},


})

export default Mongoose.model('opinion',opinionSchema)