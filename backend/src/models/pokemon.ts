import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Pokemon = new Schema(
    {
        id:{
            type: Number
        },

        name:{
            type: String
        },

        type1:{
            type: Number
        },

        type2:{
            type: Number
        },

        health:{
            type: Number
        },

        about:{
            type: String
        }
    }
);

Pokemon.set("collection", "pokemon");

export default mongoose.model("Pokemon", Pokemon);