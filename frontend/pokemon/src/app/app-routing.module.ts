import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AddFastAttackComponent } from './add-fast-attack/add-fast-attack.component';
import { AddMainAttackComponent } from './add-main-attack/add-main-attack.component';
import { AddPokemonComponent } from  './add-pokemon/add-pokemon.component';
import { ConnectFastAttackComponent } from './connect-fast-attack/connect-fast-attack.component';
import { ConnectMainAttackComponent } from './connect-main-attack/connect-main-attack.component';
import { ConnectAttackComponent } from './connect-attack/connect-attack.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonEvolutionComponent } from './pokemon-evolution/pokemon-evolution.component';
import { AllPokemonComponent } from './all-pokemon/all-pokemon.component';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { TournamentGroupsComponent } from './tournament-groups/tournament-groups.component';
import { TournamentSecondGroupsComponent } from './tournament-second-groups/tournament-second-groups.component';
import { TournamentFirstRoundComponent } from './tournament-first-round/tournament-first-round.component';
import { TournamentSecondRoundComponent } from './tournament-second-round/tournament-second-round.component';
import { TournamentThirdRoundComponent } from './tournament-third-round/tournament-third-round.component';
import { TournamentQuarterfinalsComponent } from './tournament-quarterfinals/tournament-quarterfinals.component';
import { TournamentSemifinalsComponent } from './tournament-semifinals/tournament-semifinals.component';
import { TournamentFinalsComponent } from './tournament-finals/tournament-finals.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { ThirdPlaceComponent } from './third-place/third-place.component';
import { TablePointsComponent } from './table-points/table-points.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent},
  {path: '', component: AdminComponent},
  {path: 'add_pokemon', component: AddPokemonComponent},
  {path: 'add_fast_attack', component: AddFastAttackComponent},
  {path: 'add_main_attack', component: AddMainAttackComponent},
  {path: 'connect_fast_attack', component: ConnectFastAttackComponent},
  {path: 'connect_main_attack', component: ConnectMainAttackComponent},
  {path: 'connect_attack', component: ConnectAttackComponent},
  {path: 'pokemon_details', component: PokemonDetailsComponent},
  {path: 'pokemon_evolution', component: PokemonEvolutionComponent},
  {path: 'all_pokemon', component: AllPokemonComponent},
  {path: 'pokemon_profile/:id', component: PokemonProfileComponent},
  {path: 'tournaments', component: TournamentsComponent},
  {path: 'tournament_groups/:id', component: TournamentGroupsComponent},
  {path: 'tournament_second_groups/:id', component: TournamentSecondGroupsComponent},
  {path: 'tournament_first_round/:id', component: TournamentFirstRoundComponent},
  {path: 'tournament_second_round/:id', component: TournamentSecondRoundComponent},
  {path: 'tournament_third_round/:id', component: TournamentThirdRoundComponent},
  {path: 'tournament_quarterfinals/:id', component: TournamentQuarterfinalsComponent},
  {path: 'tournament_semifinals/:id', component: TournamentSemifinalsComponent},
  {path: 'tournament_finals/:id', component: TournamentFinalsComponent},
  {path: 'group_details/:id', component: GroupDetailsComponent},
  {path: 'third_place/:id', component: ThirdPlaceComponent},
  {path: 'table_points', component: TablePointsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
