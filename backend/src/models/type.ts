import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Type = new Schema(
    {
        id:{
            type: Number
        },
        name:{
            type: String
        },
        color:{
            type: String
        }
    }
);

Type.set("collection", "type");

export default mongoose.model("Type", Type);