import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PointsTournament = new Schema(
    {
        idTour:{
            type: Number
        },

        idPokemon:{
            type: Number
        },

        points:{
            type: Number
        }

       
    }
);

PointsTournament.set("collection", "points_tournament");

export default mongoose.model("PointsTournament", PointsTournament);