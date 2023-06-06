import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let MainAttack = new Schema(
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

MainAttack.set("collection", "main_attack");

export default mongoose.model("MainAttack", MainAttack);