import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Match = new Schema(
    {
        id:{
            type: Number
        },

        idPokemon1:{
            type: Number
        },

        idPokemon2:{
            type: Number
        },
        
        idGroup:{
            type: Number
        },
        
        hp_left1:{
            type: Number
        },

        hp_left2:{
            type: Number
        },

        idFastAttack1:{
            type: Number
        },

        idFastAttack2:{
            type: Number
        },

        idMainAttack1:{
            type: Number
        },

        idMainAttack2:{
            type: Number
        },

        type:{
            type: String
        },

        result:{
            type: Number
        },
        
        idTour:{
            type: Number
        }
    }
);

Match.set("collection", "match");

export default mongoose.model("Match", Match);