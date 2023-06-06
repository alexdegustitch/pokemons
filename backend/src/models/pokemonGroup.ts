import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PokemonGroup = new Schema(
    {
        idGroup: {
            type: Number
        },

        idPokemon: {
            type: Number
        },

        namePokemon: {
            type: String
        },

        points: {
            type: Number
        },

        hp_left: {
            type: Number
        },

        place: {
            type: Number
        }
    }
);

PokemonGroup.set("collection", "pokemon_group");

export default mongoose.model("PokemonGroup", PokemonGroup);