import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameOver } from '../game/gameover';
import { PreLoad } from '../game/preload';
import { GameTitle } from '../game/gametitle';
import { Main } from '../game/main';


//import Phaser from '../../assets/phaser.js';
import "../../../node_modules/phaser-ce/build/custom/pixi";
import "../../../node_modules/phaser-ce/build/custom/p2";
import * as Phaser from 'phaser-ce';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  public game: Phaser.Game;
  back: Phaser.Image;
  private mummies: Phaser.Group;
  anim: Phaser.Animation;
  loopText: Phaser.Text;
  //that: any;

  constructor(private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {    
    //this.that = Object.create(this.constructor.prototype);
    
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // if (this.folder == "Game") {
    //   if(this.game) {
    //     this.game.paused = false;
    //   } else {
    //     this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: this.preload, create: this.create, update: this.update })
    //     console.log("Creando juego");
    //   }
    // } else if (this.game != null) {
    //   this.game.paused = true;
    // }
    if (this.folder == "Game") {
      this.game = new Phaser.Game({
        width: window.innerWidth, 
        height: window.innerHeight, 
        renderer: Phaser.CANVAS, 
        parent: 'phaser-example', 
        /*state: { preload: this.preload, 
          create: this.create, 
          update: this.update },*/
        transparent: false,
        antialias: false,
        resolution: window.devicePixelRatio,
        physicsConfig: Phaser.Physics.ARCADE
        });

        this.game.state.add('GameOver', GameOver, false);
        this.game.state.add('Main', Main, false);
        this.game.state.add('GameTitle', GameTitle, false);
        this.game.state.add('Preload', PreLoad, false);

        this.game.state.start('Preload');
    }      

  }

  preload() {
    this.game.load.image('lazur', 'assets/thorn_lazur.png');
    this.game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
  }

  create() {

    // this.back = this.game.add.image(0, -400, 'lazur');
    // this.back.scale.set(2);
    // this.back.smoothed = false;

    // this.mummies = this.game.add.group();
    // for (var i = 0; i < 5; i++) {
    //   var mummy = new Mummy(this.game, 200, 360);
    //   this.mummies.add(mummy);
    // }

  }

  update() {

  }

}
