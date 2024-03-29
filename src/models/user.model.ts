// user-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';
import { User_Status } from '../services/user/interface/userInterface';

export default function (app: Application): Model<any> {
  const modelName = 'user';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
  
    email: { 
      type: String,
       unique: true, 
       lowercase: true ,
       required:true
      },
    password: { 
      type: String,
      required:true
     },
     name:{
      type:String,
      required:true
     },
     status:{
      type:Number,
      enum:User_Status,
      default:User_Status.ACTIVE
     },
     profileUrl:{
      type:String,
      // default:null
    },
    coverImgUrl:{
      type:String
    },
     blogCount:{
      type:Number,
      default:0
     }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
