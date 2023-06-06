import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ThrowStmt, identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  get_all_types() {
    return this.http.get(`${this.uri}/getTypes`);
  }

  find_type_by_id(id: Number) {
    const data = {
      id: id
    };
    //alert(id);
    return this.http.post(`${this.uri}/findTypeById`, data);
  }

  get_only_types() {
    return this.http.get(`${this.uri}/getOnlyTypes`);
  }


  get_all_types_asc() {
    return this.http.get(`${this.uri}/getTypesAsc`);
  }

  add_pokemon(id: Number, name: String, type1: Number, type2: Number, health: Number, about: String) {
    const data = {
      id: id,
      name: name,
      type1: type1,
      type2: type2,
      health: health,
      about: about
    };

    return this.http.post(`${this.uri}/addPokemon`, data);
  }

  find_pokemon_by_id(id: Number) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/findPokemonById`, data);
  }

  find_all_pokemon_by_type(idType: Number) {
    const data = {
      idType: idType
    }

    return this.http.post(`${this.uri}/findAllPokemonByType`, data);
  }

  add_fast_attack(id: Number, name: String, type: Number, damage: Number, energy: Number, duration: Number) {
    const data = {
      id: id,
      name: name,
      type: type,
      damage: damage,
      energy: energy,
      duration: duration
    };

    return this.http.post(`${this.uri}/addFastAttack`, data);
  }

  find_fast_attack_by_name(name: String) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/findFastAttackByName`, data);
  }

  get_fast_attack_max_id() {
    return this.http.get(`${this.uri}/getFastAttackMaxId`);
  }

  add_main_attack(id: Number, name: String, type: Number, damage: Number, energy: Number, duration: Number) {
    const data = {
      id: id,
      name: name,
      type: type,
      damage: damage,
      energy: energy,
      duration: duration
    };

    return this.http.post(`${this.uri}/addMainAttack`, data);
  }

  find_main_attack_by_name(name: String) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/findMainAttackByName`, data);
  }

  get_main_attack_max_id() {
    return this.http.get(`${this.uri}/getMainAttackMaxId`);
  }

  get_all_pokemon() {
    return this.http.get(`${this.uri}/getPokemon`);
  }

  get_all_fast_attacks() {
    return this.http.get(`${this.uri}/getFastAttacks`);
  }

  get_all_main_attacks() {
    return this.http.get(`${this.uri}/getMainAttacks`);
  }

  find_pokemon_fast_attack(idPokemon: Number, idAttack: Number) {

    const data = {
      idPokemon: idPokemon,
      idAttack: idAttack
    }

    return this.http.post(`${this.uri}/findPokemonFastAttack`, data);
  }

  find_pokemon_main_attack(idPokemon: Number, idAttack: Number) {

    const data = {
      idPokemon: idPokemon,
      idAttack: idAttack
    }

    return this.http.post(`${this.uri}/findPokemonMainAttack`, data);

  }


  find_main_attack_by_id(id: Number) {

    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/findMainAttackById`, data);

  }

  find_fast_attack_by_id(id: Number) {

    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/findFastAttackById`, data);

  }


  get_pokemon_fast_attack_max_id() {

    return this.http.get(`${this.uri}/getPokemonFastAttackMaxId`);
  }

  get_pokemon_main_attack_max_id() {
    return this.http.get(`${this.uri}/getPokemonMainAttackMaxId`);
  }

  add_pokemon_main_attack(id: Number, idPokemon: Number, idAttack: Number, sameType: Number) {
    const data = {
      id: id,
      idPokemon: idPokemon,
      idAttack: idAttack,
      isSameType: sameType
    }


    return this.http.post(`${this.uri}/addPokemonMainAttack`, data);
  }

  add_pokemon_fast_attack(id: Number, idPokemon: Number, idAttack: Number, sameType: Number) {

    const data = {
      id: id,
      idPokemon: idPokemon,
      idAttack: idAttack,
      isSameType: sameType
    }


    return this.http.post(`${this.uri}/addPokemonFastAttack`, data);
  }

  find_pokemon_details_by_id(idPokemon: Number) {

    const data = {
      idPokemon: idPokemon
    }

    return this.http.post(`${this.uri}/findPokemonDetailsById`, data);
  }

  find_pokemon_details_by_pokemon_and_type(idPokemon: Number, idType: Number) {

    const data = {
      idPokemon: idPokemon,
      idType: idType
    }

    return this.http.post(`${this.uri}/findPokemonDetailsByPokemonAndType`, data);
  }

  add_pokemon_details(id: Number, idPokemon: Number, idType: Number, dealPercentage: Number) {

    const data = {
      id: id,
      idPokemon: idPokemon,
      idType: idType,
      damagePercentage: dealPercentage
    }

    return this.http.post(`${this.uri}/addPokemonDetails`, data);
  }

  update_pokemon_details(id: Number, dealPercentage: Number) {

    const data = {
      id: id,
      damagePercentage: dealPercentage
    }

    return this.http.post(`${this.uri}/updatePokemonDetails`, data);
  }

  get_pokemon_details_max_id() {

    return this.http.get(`${this.uri}/getPokemonDetailsMaxId`);
  }

  get_pokemon_evolution_max_id() {
    return this.http.get(`${this.uri}/getPokemonEvolutionMaxId`);
  }

  add_pokemon_evolution(id: Number, idPokemon: Number, idPokemon1: Number, idPokemon2: Number) {
    const data = {
      id: id,
      idPokemon: idPokemon,
      idPokemon1: idPokemon1,
      idPokemon2: idPokemon2
    }

    return this.http.post(`${this.uri}/addPokemonEvolution`, data);
  }

  find_fast_attack_for_pokemon(id: Number) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/getFastAttacksForPokemon`, data);
  }

  find_main_attack_for_pokemon(id: Number) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/getMainAttacksForPokemon`, data);
  }

  find_pokemon_evolution_first_pokemon(id: Number) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/getPokemonEvolutionFirstPokemon`, data);
  }

  find_pokemon_evolution_second_pokemon(id: Number) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/getPokemonEvolutionSecondPokemon`, data);
  }

  find_pokemon_evolution_third_pokemon(id: Number) {
    const data = {
      id: id
    }

    return this.http.post(`${this.uri}/getPokemonEvolutionThirdPokemon`, data);
  }

  get_tournament_max_id() {
    return this.http.get(`${this.uri}/getTournamentMaxId`);
  }

  get_group_max_id() {
    return this.http.get(`${this.uri}/getGroupMaxId`);
  }

  get_match_max_id() {
    return this.http.get(`${this.uri}/getMatchMaxId`);
  }

  delete_from_points() {
    //alert("AAAAAAAAAAAA");
    return this.http.delete(`${this.uri}/deleteFromPoints`);
  }

  add_to_points(id: Number, name: String) {
    const data = {
      idPokemon: id,
      namePokemon: name
    }
    return this.http.post(`${this.uri}/addToPoints`, data);
  }

  get_all_points(){
    return this.http.get(`${this.uri}/getAllPoints`);
  }

  add_new_tournament(id: Number, name: String) {
    const data = {
      id: id,
      name: name
    }
    return this.http.post(`${this.uri}/addNewTournament`, data);
  }
  add_new_group(id: Number, name: String, idTour: Number, type: Number) {
    const data = {
      id: id,
      name: name,
      idTour: idTour,
      type: type
    }
    return this.http.post(`${this.uri}/addNewGroup`, data);
  }

  add_pokemon_to_group(idGroup: Number, idPokemon: Number, namePokemon: String) {
    const data = {
      idGroup: idGroup,
      idPokemon: idPokemon,
      namePokemon: namePokemon
    }
    return this.http.post(`${this.uri}/addPokemonToGroup`, data);

  }

  add_new_match(id: Number, idGroup: Number, idTour: Number, idPokemon1: Number, idPokemon2: Number, type: String) {
    const data = {
      id: id,
      idGroup: idGroup,
      idPokemon1: idPokemon1,
      idPokemon2: idPokemon2,
      type: type,
      idTour: idTour
    }
    return this.http.post(`${this.uri}/addNewMatch`, data);
  }

  add_new_match_group(idMatch: Number, idGroup: Number) {
    const data = {
      idMatch: idMatch,
      idGroup: idGroup
    }
    return this.http.post(`${this.uri}/addNewMatchGroup`, data);
  }

  find_tournament_by_id(id: Number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/findTournamentById`, data);
  }

  find_groups_for_tournament(idTour: Number, type: Number) {
    const data = {
      idTour: idTour,
      type: type
    }
    return this.http.post(`${this.uri}/findGroupsForTournament`, data);
  }

  find_pokemon_for_group(idGroup: Number) {
    const data = {
      idGroup: idGroup
    }

    return this.http.post(`${this.uri}/findPokemonForGroup`, data);
  }

  find_matches_for_group(idGroup: Number) {
    const data = {
      idGroup: idGroup
    }

    return this.http.post(`${this.uri}/findMatchesForGroup`, data);
  }

  update_match(id: Number, hp_left1: Number, hp_left2: Number, res: Number, idFastAttack1: Number, idFastAttack2: Number, idMainAttack1: Number, idMainAttack2: Number) {
    const data = {
      id: id,
      hp_left1: hp_left1,
      hp_left2: hp_left2,
      result: res,
      idFastAttack1: idFastAttack1,
      idFastAttack2: idFastAttack2,
      idMainAttack1: idMainAttack1,
      idMainAttack2: idMainAttack2
    }
    return this.http.post(`${this.uri}/updateMatch`, data);
  }

  find_pokemon_group(idPokemon: Number, idGroup: Number) {
    const data = {
      idPokemon: idPokemon,
      idGroup: idGroup
    }
    return this.http.post(`${this.uri}/findPokemonGroup`, data);
  }

  update_pokemon_group(idPokemon: Number, idGroup: Number, points: Number, hp_left: Number) {
    const data = {
      idPokemon: idPokemon,
      idGroup: idGroup,
      points: points,
      hp_left: hp_left
    }
    return this.http.post(`${this.uri}/updatePokemonGroup`, data);
  }

  set_group_over(id: Number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/setGroupOver`, data);
  }

  set_place_for_pokemon_group(idGroup: Number, idPokemon: Number, place: Number) {
    const data = {
      idGroup: idGroup,
      idPokemon: idPokemon,
      place: place
    }
    return this.http.post(`${this.uri}/setPlaceForPokemonGroup`, data);

  }

  find_group(id: Number) {
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/findGroup`, data);
  }

  find_over_groups_for_tournament(idTour: Number, type: Number) {
    const data = {
      idTour: idTour,
      type: type
    }
    return this.http.post(`${this.uri}/findOverGroupsForTournament`, data);
  }

  find_pokemon_who_passed_for_group(idGroup: Number) {
    const data = {
      idGroup: idGroup
    }
    return this.http.post(`${this.uri}/findPokemonWhoPassedForGroup`, data);
  }

  find_pokemon_who_didnt_passed_for_group(idGroup: Number) {
    const data = {
      idGroup: idGroup
    }
    return this.http.post(`${this.uri}/findPokemonWhoDidntPassedForGroup`, data);
  }

  update_points_last_points(idPokemon: Number, last_points: Number){
    const data = {
      idPokemon: idPokemon,
      last_points: last_points
    }

    return this.http.post(`${this.uri}/updatePointsLastPoints`, data);
  }

  update_points(idPokemon: Number, points: Number){
    const data = {
      idPokemon: idPokemon,
      points: points
    }

    return this.http.post(`${this.uri}/updatePoints`, data);
  }

  update_points_tournament(idTour: Number, idPokemon: Number, points: Number){
    const data = {
      idTour: idTour,
      idPokemon: idPokemon,
      points: points
    }

    return this.http.post(`${this.uri}/updatePointsTournament`, data);
  }

  add_points_tournament(idTour: Number, idPokemon: Number){
    const data = {
      idTour: idTour,
      idPokemon: idPokemon
    }

    return this.http.post(`${this.uri}/addPointsTournament`, data);
  }

  tournament_add_4_place(idTour: Number, semifinalis2: Number, nameSemifinalist2: String){
    const data={
      idTour: idTour,
      semifinalist2: semifinalis2,
      nameSemifinalist2: nameSemifinalist2
    }

    return this.http.post(`${this.uri}/tournament_add_4_place`, data);
  }

  tournament_add_3_place(idTour: Number, semifinalis1: Number, nameSemifinalist1: String){
    const data={
      idTour: idTour,
      semifinalist1: semifinalis1,
      nameSemifinalist1: nameSemifinalist1
    }

    return this.http.post(`${this.uri}/tournament_add_3_place`, data);
  }
  tournament_add_2_place(idTour: Number, second: Number, nameSecond: String){
    const data={
      idTour: idTour,
      second: second,
      nameSecond: nameSecond
    }

    return this.http.post(`${this.uri}/tournament_add_2_place`, data);
  }
  tournament_add_1_place(idTour: Number, winner: Number, nameWinner: String){
    const data={
      idTour: idTour,
      winner: winner,
      nameWinner: nameWinner
    }

    return this.http.post(`${this.uri}/tournament_add_1_place`, data);
  }
  find_points_tournament(idTour: Number, idPokemon: Number){
    const data = {
      idTour: idTour,
      idPokemon: idPokemon
    }

    return this.http.post(`${this.uri}/findPointsTournament`, data);
  }
  
  find_points_for_pokemon(idPokemon: Number){
    const data = {
      idPokemon: idPokemon
    }

    return this.http.post(`${this.uri}/findPointsForPokemon`, data);
  }

  find_matches_by_type(idTour: Number, type: String){

    const data = {
      idTour: idTour,
      type: type
    }
    return this.http.post(`${this.uri}/findMatchesByType`, data);
  }
}
