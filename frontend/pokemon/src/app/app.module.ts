import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PokemonService } from './pokemon.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { AddMainAttackComponent } from './add-main-attack/add-main-attack.component';
import { AdminComponent } from './admin/admin.component';
import { AddFastAttackComponent } from './add-fast-attack/add-fast-attack.component';
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

@NgModule({
  declarations: [
    AppComponent,
    AddPokemonComponent,
    AddMainAttackComponent,
    AdminComponent,
    AddFastAttackComponent,
    ConnectFastAttackComponent,
    ConnectMainAttackComponent,
    ConnectAttackComponent,
    PokemonDetailsComponent,
    PokemonEvolutionComponent,
    AllPokemonComponent,
    PokemonProfileComponent,
    TournamentsComponent,
    TournamentGroupsComponent,
    TournamentSecondGroupsComponent,
    TournamentFirstRoundComponent,
    TournamentSecondRoundComponent,
    TournamentThirdRoundComponent,
    TournamentQuarterfinalsComponent,
    TournamentSemifinalsComponent,
    TournamentFinalsComponent,
    GroupDetailsComponent,
    ThirdPlaceComponent,
    TablePointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
