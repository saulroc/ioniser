import * as Phaser from 'phaser-ce';

export class Explosion extends Phaser.Sprite {

    public anim: Phaser.Animation;

    constructor (game: Phaser.Game, x:number, y:number) {
        super(game, x, y, 'explosion', 2);
 
        this.anchor.setTo(0.5, 0.5);        
        game.add.existing(this);
        
        this.smoothed = false;
        this.anim = this.animations.add('explosion');        
        this.scale.setTo(this.game.resolution * this.scale.x,this.game.resolution * this.scale.y);
        this.anim.play(10,false,true);
        
    }  

}