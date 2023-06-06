import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let MatchGroup = new Schema(
    {
        idMatch: {
            type: Number
        },

        idGroup: {
            type: Number
        }
    }
);

MatchGroup.set("collection", "match_group");

export default mongoose.model("MatchGroup", MatchGroup);