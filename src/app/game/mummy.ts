
import {Explosion} from '../game/explosion';

import * as Phaser from 'phaser-ce';

export class Mummy extends Phaser.Sprite {

    public anim: Phaser.Animation;
    private changeDirection: number;

    constructor (game: Phaser.Game) {
        var x = 0;
        var y = (Math.random() * (game.height - (45*game.resolution)));
        super(game, x, y, 'mummy', 5);
 
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this);
        game.add.existing(this);
        this.inputEnabled = true;

        //this.scale.set(4);
        this.smoothed = false;
        this.anim = this.animations.add('walk');
        this.body.velocity.x = ((100 * Math.random() ) + 50) * (Math.random() < 0.5 ? -1 : 1);
        if (this.body.velocity.x < 0) {
            this.position.x = game.width;
            this.scale.setTo(-1, 1);
        } else {
            this.position.x = 0;
        }
        this.scale.setTo(this.game.resolution * this.scale.x,this.game.resolution * this.scale.y);
        this.anim.play(10, true);

        this.events.onInputDown.add(this.hitMummy, this);
        this.asignChangeDirection();
    }

    hitMummy() {
        this.body.velocity.x = 0;
        var explosion = new Explosion(this.game,this.x,this.y);
        this.destroy();
    }

    asignChangeDirection() {
        this.changeDirection = (Math.random() * this.game.width) + 50;
    }
    
    update() {
        if(this.changeDirection > 0)
            this.changeDirection--;
        else {
            this.asignChangeDirection();            
            this.body.velocity.x *= -1;
            this.scale.setTo(this.scale.x * -1, this.scale.y); 
        }

        if (this.body.velocity.x > 0 && this.position.x > this.game.width) {
            this.position.x = 0
            this.position.y = (Math.random() * (this.game.height - this.height / 2)) + this.height / 2;
        } else if (this.body.velocity.x < 0 && this.position.x < 0) {
            this.position.x = this.game.width;
            this.position.y = (Math.random() * (this.game.height - this.height / 2)) + this.height / 2;
        }
            
    }

}