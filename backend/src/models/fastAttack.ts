import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let FastAttack = new Schema(
    {
        id:{
            type: Number
        },

        name:{
            type: String
        },

        damage:{
            type: Number
        },

        type:{
            type: Number
        },

        duration:{
            type: Number
        },

        energy:{
            type: Number
        }
    }
);

FastAttack.set("collection", "fast_attack");

export default mongoose.model("FastAttack", FastAttack);