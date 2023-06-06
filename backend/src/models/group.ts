import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Group = new Schema(
    {
        id:{
            type: Number
        },

        name:{
            type: String
        },

        idTour:{
            type: Number
        },

        type:{
            type: Number
        },

        isOver:{
            type: Number 
        }
    }
);

Group.set("collection", "group");

export default mongoose.model("Group", Group);