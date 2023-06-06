import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Points = new Schema(
    {
        idPokemon:{
            type: Number
        },

        points:{
            type: Number
        },
        
        last_points:{
            type: Number
        },

        namePokemon:{
            type: String
        }

       
    }
);

Points.set("collection", "points");

export default mongoose.model("Points", Points);