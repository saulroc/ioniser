
import * as Phaser from 'phaser-ce';

export class Mummy extends Phaser.Sprite {

    public anim: Phaser.Animation;

    constructor (game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'mummy', 5);
 
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this);
        game.add.existing(this);
        this.inputEnabled = true;

        //this.scale.set(4);
        this.smoothed = false;
        this.anim = this.animations.add('walk');
        this.position.y = (Math.random() * game.height);
        this.body.velocity.x = ((100 * Math.random() ) + 50) * (Math.random() < 0.5 ? -1 : 1);
        if (this.body.velocity.x < 0) {
            this.position.x = game.width;
            this.scale.setTo(-1, 1);
        } else {
            this.position.x = 0;
        }

        this.anim.play(10, true);

        this.events.onInputDown.add(this.hitMummy, this);
    }

    hitMummy() {
        this.body.velocity.x = 0;
        this.destroy();
    }

    update() {
        if (this.body.velocity.x > 0 && this.position.x > this.game.width) {
            this.position.x = 0
            this.position.y = (Math.random() * this.game.height);
        } else if (this.body.velocity.x < 0 && this.position.x < 0) {
            this.position.x = this.game.width;
            this.position.y = (Math.random() * this.game.height);
        }
            
    }

}