import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pokemons', { useNewUrlParser: true })

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongo open');

})

const router = express.Router();

import Pokemon from './models/pokemon';
import Type from './models/type';
import FastAttack from './models/fastAttack';
import MainAttack from './models/mainAttack';
import PokemonFastAttack from './models/pokemonFastAttack';
import PokemonMainAttack from './models/pokemonMainAttack';
import PokemonDetails from './models/pokemonDetails';
import PokemonEvolution from './models/pokemonEvolution';
import Points from './models/points';
import Tournament from './models/tournament';
import Group from './models/group';
import Match from './models/match';
import MatchGroup from './models/matchGroup';
import PokemonGroup from './models/pokemonGroup';
import PointsTournament from './models/pointsTournament';


router.route('/getTypes').get(
    (req, res) => {
        //console.log('df');
        Type.find({}).sort({ id: -1 }).exec(function (err, types) {
            if (err)
                console.log(err);
            else
                res.json(types);
        })
    }
)

router.route('/findTypeById').post(
    (req, res) => {

        let id = req.body.id;

        Type.findOne({ 'id': id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)

router.route('/getOnlyTypes').get(
    (req, res) => {
        //console.log('da');
        Type.find({ 'id': { $gt: 0 } }).sort({ id: 1 }).exec(function (err, types) {
            if (err)
                console.log(err);
            else
                res.json(types);
        })
    }
)

router.route('/getTypesAsc').get(
    (req, res) => {
        Type.find({}).sort({ id: 1 }).exec(function (err, types) {
            if (err)
                console.log(err);
            else
                res.json(types);
        })
    }
)

router.route('/addPokemon').post(
    (req, res) => {
        let id = req.body.id;
        let name = req.body.name;
        let health = req.body.health;
        let type1 = req.body.type1;
        let type2 = req.body.type2;
        let about = req.body.about;

        let pokemon = new Pokemon({ id: id, name: name, health: health, type1: type1, type2: type2, about: about });

        pokemon.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })

    }
)

router.route('/findPokemonById').post(
    (req, res) => {
        let id = req.body.id;

        Pokemon.findOne({ 'id': id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)

router.route('/findAllPokemonByType').post(
    (req, res) => {
        let idType = req.body.idType;

        Pokemon.find({ $or: [{ 'type1': idType }, { 'type2': idType }] }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)


router.route('/findFastAttackById').post(
    (req, res) => {
        let id = req.body.id;

        FastAttack.findOne({ 'id': id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)

router.route('/findMainAttackById').post(
    (req, res) => {
        let id = req.body.id;

        MainAttack.findOne({ 'id': id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)


router.route('/addFastAttack').post(
    (req, res) => {

        let id = req.body.id;
        let name = req.body.name;
        let energy = req.body.energy;
        let type = req.body.type;
        let damage = req.body.damage;
        let duration = req.body.duration;

        let attack = new FastAttack({ id: id, name: name, damage: damage, type: type, energy: energy, duration: duration });

        attack.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })

    }
)

router.route('/getFastAttackMaxId').get(
    (req, res) => {
        FastAttack.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/findFastAttackByName').post(
    (req, res) => {
        let name = req.body.name;

        FastAttack.findOne({ 'name': name }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)

router.route('/addMainAttack').post(
    (req, res) => {

        let id = req.body.id;
        let name = req.body.name;
        let energy = req.body.energy;
        let type = req.body.type;
        let damage = req.body.damage;
        let duration = req.body.duration;

        let attack = new MainAttack({ id: id, name: name, damage: damage, type: type, energy: energy, duration: duration });

        attack.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })

    }
)

router.route('/getMainAttackMaxId').get(
    (req, res) => {
        MainAttack.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/findMainAttackByName').post(
    (req, res) => {
        let name = req.body.name;

        MainAttack.findOne({ 'name': name }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)

router.route('/getPokemon').get(
    (req, res) => {
        Pokemon.find({}).sort({ id: 1 }).exec(function (err, types) {
            if (err)
                console.log(err);
            else
                res.json(types);
        })
    }
)



router.route('/getFastAttacks').get(
    (req, res) => {
        FastAttack.find({}).sort({ id: 1 }).exec(function (err, types) {
            if (err)
                console.log(err);
            else
                res.json(types);
        })
    }
)

router.route('/getMainAttacks').get(
    (req, res) => {
        MainAttack.find({}).sort({ id: 1 }).exec(function (err, types) {
            if (err)
                console.log(err);
            else
                res.json(types);
        })
    }
)

router.route('/getMainAttackMaxId').get(
    (req, res) => {
        MainAttack.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/getPokemonMainAttackMaxId').get(
    (req, res) => {
        PokemonMainAttack.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/getPokemonFastAttackMaxId').get(
    (req, res) => {
        PokemonFastAttack.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/findPokemonFastAttack').post(

    (req, res) => {
        let idPokemon = req.body.idPokemon;
        let idAttack = req.body.idAttack;

        PokemonFastAttack.findOne({ 'idPokemon': idPokemon, 'idAttack': idAttack }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }

)



router.route('/findPokemonMainAttack').post(
    (req, res) => {
        let idPokemon = req.body.idPokemon;
        let idAttack = req.body.idAttack;

        PokemonMainAttack.findOne({ 'idPokemon': idPokemon, 'idAttack': idAttack }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }

)

router.route('/addPokemonMainAttack').post(

    (req, res) => {
        let id = req.body.id;
        let idPokemon = req.body.idPokemon;
        let idAttack = req.body.idAttack;
        let isSameType = req.body.isSameType;


        let attack = new PokemonMainAttack({ id: id, idPokemon: idPokemon, idAttack: idAttack, isSameType: isSameType });

        attack.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })

    }

)


router.route('/addPokemonFastAttack').post(

    (req, res) => {
        let id = req.body.id;
        let idPokemon = req.body.idPokemon;
        let idAttack = req.body.idAttack;
        let isSameType = req.body.isSameType;


        let attack = new PokemonFastAttack({ id: id, idPokemon: idPokemon, idAttack: idAttack, isSameType: isSameType });

        attack.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })

    }

)

router.route('/findPokemonDetailsById').post(
    (req, res) => {
        let idPokemon = req.body.idPokemon;

        PokemonDetails.findOne({ 'idPokemon': idPokemon }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)

router.route('/findPokemonDetailsByPokemonAndType').post(
    (req, res) => {
        let idPokemon = req.body.idPokemon;
        let idType = req.body.idType;

        PokemonDetails.findOne({ 'idPokemon': idPokemon, 'idType': idType }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        }
        )
    }
)

router.route('/addPokemonDetails').post(
    (req, res) => {
        let id = req.body.id;
        let idPokemon = req.body.idPokemon;
        let idType = req.body.idType;
        let damagePercentage = req.body.damagePercentage;


        let detail = new PokemonDetails({ id: id, idPokemon: idPokemon, idType: idType, damagePercentage: damagePercentage });

        detail.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })

    }
)

router.route('/getPokemonDetailsMaxId').get(
    (req, res) => {
        PokemonDetails.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/updatePokemonDetails').post(
    (req, res) => {
        let id = req.body.id;
        let damagePercentage = req.body.damagePercentage;

        PokemonDetails.collection.update({ 'id': id }, { $set: { 'damagePercentage': damagePercentage } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        })
    }
)

router.route('/getPokemonEvolutionMaxId').get(
    (req, res) => {
        PokemonEvolution.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/addPokemonEvolution').post(
    (req, res) => {
        let id = req.body.id;
        let idPokemon = req.body.idPokemon;
        let idPokemon1 = req.body.idPokemon1;
        let idPokemon2 = req.body.idPokemon2;


        let evolution = new PokemonEvolution({ id: id, idPokemon: idPokemon, idPokemon1: idPokemon1, idPokemon2: idPokemon2 });

        evolution.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })

    }
)

router.route('/getFastAttacksForPokemon').post(
    (req, res) => {
        let id = req.body.id;

        PokemonFastAttack.find({ "idPokemon": id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })
    }
)

router.route('/getMainAttacksForPokemon').post(
    (req, res) => {
        let id = req.body.id;

        PokemonMainAttack.find({ "idPokemon": id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })
    }
)

router.route('/getPokemonEvolutionFirstPokemon').post(
    (req, res) => {
        let id = req.body.id;

        PokemonEvolution.find({ 'idPokemon': id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })
    }
)

router.route('/getPokemonEvolutionSecondPokemon').post(
    (req, res) => {
        let id = req.body.id;

        PokemonEvolution.find({ 'idPokemon1': id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })
    }
)

router.route('/getPokemonEvolutionThirdPokemon').post(
    (req, res) => {
        let id = req.body.id;

        PokemonEvolution.find({ 'idPokemon2': id }, (err, user) => {
            if (err)
                console.log(err);
            else
                res.json(user);
        })
    }
)

router.route('/getTournamentMaxId').get(
    (req, res) => {
        Tournament.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/getGroupMaxId').get(
    (req, res) => {
        Group.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/getMatchMaxId').get(
    (req, res) => {
        Match.find({}).sort({ 'id': -1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/deleteFromPoints').delete(
    (req, res) => {

        Points.remove({}).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)


router.route('/addToPoints').post(
    (req, res) => {
        let idPokemon = req.body.idPokemon;
        let namePokemon = req.body.namePokemon;
        
        let points = new Points({ idPokemon: idPokemon, namePokemon: namePokemon, points: 0, last_points: 0 });

        points.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })
    }
)

router.route('/getAllPoints').get(
    (req, res) => {
        Points.find({}).sort({ points: -1 }).exec(function (err, types) {
            if (err)
                console.log(err);
            else
                res.json(types);
        })
    }
)

router.route('/updatePointsLastPoints').post(
    (req, res) => {
        let idPokemon = req.body.idPokemon;
        let last_points = req.body.last_points;

        Points.collection.update({ 'idPokemon': idPokemon }, { $set: { 'last_points': last_points } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)

router.route('/updatePoints').post(
    (req, res) => {
        let idPokemon = req.body.idPokemon;
        let points = req.body.points;

        Points.collection.update({ 'idPokemon': idPokemon }, { $set: { 'points': points } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)

router.route('/findPointsForPokemon').post(
    (req, res) => {

        let idPokemon = req.body.idPokemon;

        Points.find({ 'idPokemon': idPokemon }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)


router.route('/addNewTournament').post(
    (req, res) => {
        let id = req.body.id;
        let name = req.body.name;

        let tour = new Tournament({ id: id, name: name, winner: 0, second: 0, semifinalist1: 0, semifinalist2: 0, nameWinner: "", nameSecond: "", nameSemifinalist1: "", nameSemifinalist2:""});

        tour.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })
    }
)

router.route('/tournament_add_4_place').post(
    (req, res) => {
        let idTour = Number(req.body.idTour);
        let semifinalist2 = Number(req.body.semifinalist2);
        let nameSemifinalist2 = String(req.body.nameSemifinalist2);

        Tournament.collection.update({ 'id': idTour }, { $set: { 'semifinalist2': semifinalist2, 'nameSemifinalist2': nameSemifinalist2} }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)

router.route('/tournament_add_3_place').post(
    (req, res) => {
        let idTour = Number(req.body.idTour);
        let semifinalist1 = Number(req.body.semifinalist1);
        let nameSemifinalist1 = String(req.body.nameSemifinalist1);

        Tournament.collection.update({ 'id': idTour }, { $set: { 'semifinalist1': semifinalist1, 'nameSemifinalist1': nameSemifinalist1} }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)
router.route('/tournament_add_2_place').post(
    (req, res) => {
        let idTour = Number(req.body.idTour);
        let second = Number(req.body.second);
        let nameSecond = String(req.body.nameSecond);

        Tournament.collection.update({ 'id': idTour }, { $set: { 'second': second, 'nameSecond': nameSecond} }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)
router.route('/tournament_add_1_place').post(
    (req, res) => {
        let idTour = Number(req.body.idTour);
        let winner = Number(req.body.winner);
        let nameWinner = String(req.body.nameWinner);

        Tournament.collection.update({ 'id': idTour }, { $set: { 'winner': winner, 'nameWinner': nameWinner} }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)
router.route('/addNewGroup').post(
    (req, res) => {
        let id = req.body.id;
        let name = req.body.name;
        let idTour = req.body.idTour;
        let type = req.body.type;

        let group = new Group({ id: id, name: name, idTour: idTour, type: type, isOver: 0 });

        group.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })
    }
)

router.route('/addPokemonToGroup').post(
    (req, res) => {
        let idGroup = req.body.idGroup;
        let idPokemon = req.body.idPokemon;
        let namePokemon = req.body.namePokemon;

        let pok_group = new PokemonGroup({ idGroup: idGroup, idPokemon: idPokemon, namePokemon: namePokemon, points: 0, hp_left: 0, place: 0 });

        pok_group.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })
    }
)

router.route('/addNewMatch').post(
    (req, res) => {
        let id = req.body.id;
        let idGroup = req.body.idGroup;
        let idPokemon1 = req.body.idPokemon1;
        let idPokemon2 = req.body.idPokemon2;
        let type = req.body.type;
        let idTour = req.body.idTour;

        let match = new Match({ id: id, idGroup: idGroup, idPokemon1: idPokemon1, idPokemon2: idPokemon2, hp_left1: 0, hp_left2: 0, idFastAttack1: 0, idFastAttack2: 0, idMainAttack1: 0, idMainAttack2: 0, type: type, result: 3, idTour: idTour });

        match.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })
    }
)


router.route('/addNewMatchGroup').post(
    (req, res) => {
        let idMatch = req.body.idMatch;
        let idGroup = req.body.idGroup;

        let match_group = new MatchGroup({ idMatch: idMatch, idGroup: idGroup });

        match_group.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })
    }
)

router.route("/findTournamentById").post(
    (req, res) => {
        let id = req.body.id;
        Tournament.find({ 'id': id }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/findGroupsForTournament").post(
    (req, res) => {
        let idTour = req.body.idTour;
        let type = req.body.type;

        Group.find({ 'idTour': idTour, 'type': type }).sort({ 'id': 1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/findPokemonForGroup").post(
    (req, res) => {
        let idGroup = req.body.idGroup;
        PokemonGroup.find({ 'idGroup': idGroup }).sort({ 'points': -1, 'hp_left': -1, 'idPokemon': 1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/findMatchesForGroup").post(
    (req, res) => {
        let idGroup = req.body.idGroup;
        Match.find({ 'idGroup': idGroup }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/updateMatch").post(
    (req, res) => {
        let id = req.body.id;
        let hp_left1 = req.body.hp_left1;
        let hp_left2 = req.body.hp_left2;

        let idFastAttack1 = req.body.idFastAttack1;
        let idFastAttack2 = req.body.idFastAttack2;
        let idMainAttack1 = req.body.idMainAttack1;
        let idMainAttack2 = req.body.idMainAttack2;

        let result = req.body.result;

        Match.collection.update({ 'id': id }, { $set: { 'hp_left1': hp_left1, 'hp_left2': hp_left2, 'result': result, 'idFastAttack1': idFastAttack1, 'idFastAttack2': idFastAttack2, 'idMainAttack1': idMainAttack1, 'idMainAttack2': idMainAttack2 } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)

router.route("/findPokemonGroup").post(
    (req, res) => {
        let idGroup = req.body.idGroup;
        let idPokemon = req.body.idPokemon;
        PokemonGroup.findOne({ 'idGroup': idGroup, 'idPokemon': idPokemon }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/updatePokemonGroup").post(
    (req, res) => {
        let idGroup = req.body.idGroup;
        let idPokemon = req.body.idPokemon;
        let hp_left = req.body.hp_left;
        let points = req.body.points;

        PokemonGroup.collection.update({ 'idGroup': idGroup, 'idPokemon': idPokemon }, { $set: { 'hp_left': hp_left, 'points': points } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)

//kreni odavde
router.route("/setGroupOver").post(
    (req, res) => {
        let id = req.body.id;

        Group.collection.update({ 'id': id }, { $set: { 'isOver': 1 } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)

router.route("/setPlaceForPokemonGroup").post(
    (req, res) => {
        let idGroup = req.body.idGroup;
        let idPokemon = req.body.idPokemon;
        let place = req.body.place;

        PokemonGroup.collection.update({ 'idGroup': idGroup, 'idPokemon': idPokemon }, { $set: { 'place': place } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)

router.route("/findGroup").post(
    (req, res) => {
        let id = req.body.id;

        Group.findOne({ 'id': id }).sort({ 'id': 1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/findOverGroupsForTournament").post(
    (req, res) => {
        let idTour = req.body.idTour;
        let type = req.body.type;

        Group.find({ 'idTour': idTour, 'type': type, 'isOver': 1 }).sort({ 'id': 1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/findPokemonWhoPassedForGroup").post(
    (req, res) => {
        let idGroup = req.body.idGroup;

        PokemonGroup.find({ 'idGroup': idGroup, 'place': { $lt: 5 } }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/findPokemonWhoDidntPassedForGroup").post(
    (req, res) => {
        let idGroup = req.body.idGroup;

        PokemonGroup.find({ 'idGroup': idGroup, 'place': { $gt: 4 } }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/findMatchesByType").post(
    (req, res) => {
        let idTour = req.body.idTour;
        let type = req.body.type;

        Match.find({ 'idTour': idTour, 'type': type }).sort({ 'id': 1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route("/addPointsTournament").post(
    (req, res) => {
        let idTour = req.body.idTour;
        let idPokemon = req.body.idPokemon;

        let points_t = new PointsTournament({ idTour: idTour, idPokemon: idPokemon, points: 0 });

        points_t.save().then(ok => {
            res.status(200).json({ 'ok': 'yes' });
        }).catch(err => {
            res.status(400).json({ 'ok': 'no' });
        })
    }
)

router.route('/findPointsTournament').post(
    (req, res) => {
        let idTour = req.body.idTour;
        let idPokemon = req.body.idPokemon;

        PointsTournament.find({ 'idTour': idTour, 'idPokemon': idPokemon}).sort({ 'id': 1 }).exec((err, doc) => {
            if (err) console.log(err);
            else res.json(doc);
        });
    }
)

router.route('/updatePointsTournament').post(
    (req, res) => {
        let idTour = Number(req.body.idTour);
        let idPokemon = Number(req.body.idPokemon);
        let points = Number(req.body.points);
       
        PointsTournament.collection.update({ 'idTour': idTour, 'idPokemon': idPokemon }, { $set: { 'points': points } }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'ok': 'no' });
            }
            else {
                res.status(200).json({ 'ok': 'yes' });
            }
        });
    }
)
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));