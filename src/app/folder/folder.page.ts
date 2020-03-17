import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mummy } from '../game/mummy';

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
    if (this.folder == "Game")
      this.game = new Phaser.Game({
        width: window.innerWidth, 
        height: window.innerHeight, 
        renderer: Phaser.CANVAS, 
        parent: 'phaser-example', 
        state: { preload: this.preload, 
          create: this.create, 
          update: this.update },
        transparent: false,
        antialias: false,
        physicsConfig: Phaser.Physics.ARCADE
        });

  }

  preload() {
    this.game.load.image('lazur', 'assets/thorn_lazur.png');
    this.game.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', 37, 45, 18);
  }

  create() {

    this.back = this.game.add.image(0, -400, 'lazur');
    this.back.scale.set(2);
    this.back.smoothed = false;

    this.mummies = this.game.add.group();
    for (var i = 0; i < 5; i++) {
      var mummy = new Mummy(this.game, 200, 360);
      this.mummies.add(mummy);
    }

  }

  animationStarted() {

  }

  animationLooped(sprite, animation) {

      

  }

  animationStopped() {

    this.game.add.text(32, 64+32, 'Animation stopped', { fill: 'white' });

  }

  update() {

      // if (this.mummy.anim.isPlaying)
      // {
      //   this.back.x -= 1;
      // }

  }

}
