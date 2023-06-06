import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Tournament = new Schema(
    {
        id: {
            type: Number
        },

        name: {
            type: String
        },

        winner: {
            type: Number
        },

        second: {
            type: Number
        },

        semifinalist1: {
            type: Number
        },

        semifinalist2: {
            type: Number
        },

        nameWinner:{
            type: String
        },

        nameSecond:{
            type: String
        }, 
        
        nameSemifinalist1:{
            type: String
        },

        nameSemifinalist2:{
            type: String
        }
    }
);

Tournament.set("collection", "tournament");

export default mongoose.model("Tournament", Tournament);