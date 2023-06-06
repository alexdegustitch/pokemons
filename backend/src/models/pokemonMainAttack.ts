import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PokemonMainAttack = new Schema(
    {
        id:{
            type: Number
        },

        idPokemon:{
            type: Number
        },

        idAttack:{
            type: Number
        },

        isSameType:{
            type: Number
        }
    }
);

PokemonMainAttack.set("collection", "pokemon_main_attack");

export default mongoose.model("PokemonMainAttack", PokemonMainAttack);