import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PokemonEvolution = new Schema(
    {
        id:{
            type: Number
        },

        idPokemon:{
            type: Number
        },

        idPokemon1:{
            type: Number
        },

        idPokemon2:{
            type: Number
        }
    }
);

PokemonEvolution.set("collection", "pokemon_evolution");

export default mongoose.model("PokemonEvolution", PokemonEvolution);