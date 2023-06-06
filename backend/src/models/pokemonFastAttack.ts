import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PokemonFastAttack = new Schema(
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

PokemonFastAttack.set("collection", "pokemon_fast_attack");

export default mongoose.model("PokemonFastAttack", PokemonFastAttack);