import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PokemonDetails = new Schema(
    {
        id:{
            type: Number
        },

        idPokemon:{
            type: Number
        },

        idType:{
            type: Number
        },

        damagePercentage:{
            type: Number
        }
    }
);

PokemonDetails.set("collection", "pokemon_details");

export default mongoose.model("PokemonDetails", PokemonDetails);