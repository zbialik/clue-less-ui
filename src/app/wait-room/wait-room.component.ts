import { Component, OnInit } from '@angular/core';
// import { Game } from '../player-service/game';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wait-room',
  templateUrl: './wait-room.component.html',
  styleUrls: ['./wait-room.component.css']
})
export class WaitRoomComponent implements OnInit {
  
  charName: any | undefined;
  gameId: any | undefined;
  game: any | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) {} 

  ngOnInit() {
    
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.charName = this.route.snapshot.paramMap.get('charName');

    this.playerService.setPlayerService(this.gameId, this.charName);

    this.playerService.gameData$
    .subscribe((data: any) => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.game = data;

        if (data.active) { // redirect to Game component if game has started
          this.router.navigate([`/game/${this.gameId}/${this.charName}`]);
        }
    });
  }
}