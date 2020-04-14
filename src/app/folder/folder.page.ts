import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameOver } from '../game/gameover';
import { PreLoad } from '../game/preload';
import { GameTitle } from '../game/gametitle';
import { Main } from '../game/main';


import "../../../node_modules/phaser-ce/build/custom/pixi";
import "../../../node_modules/phaser-ce/build/custom/p2";
import * as Phaser from 'phaser-ce';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public playerName: string;
  public game: Phaser.Game;
  public firebaseService: FirebaseService;

  constructor(
    private activatedRoute: ActivatedRoute,
    public af: AngularFirestore
    ) { 
            
      this.firebaseService = new FirebaseService(af);      
  }

  ngOnInit() {    
    
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.playerName = this.activatedRoute.snapshot.paramMap.get('username');
    
    switch (this.folder) {
      case "Game":
        this.game = new Phaser.Game({
          width: window.innerWidth, 
          height: window.innerHeight, 
          renderer: Phaser.CANVAS, 
          parent: 'phaser-example',         
          transparent: false,
          antialias: false,
          //resolution: window.devicePixelRatio,
          physicsConfig: Phaser.Physics.ARCADE          
          });
          this.game.state.add('GameOver', GameOver, false);
          this.game.state.add('Main', Main, false);
          this.game.state.add('GameTitle', GameTitle, false);
          this.game.state.add('Preload', PreLoad, false);
          this.game.state.start('Preload',false,false,this.firebaseService, this.playerName);
        break;      

    }     

  }

}
