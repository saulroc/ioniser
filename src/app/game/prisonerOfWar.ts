import * as Phaser from 'phaser-ce';

export class PrisonerOfWar extends Phaser.Sprite {

    public animRunning: Phaser.Animation;
    public animEscape: Phaser.Animation;
    public animFlying: Phaser.Animation;
    private changeDirection: number;
    private isTrapped: boolean;

    constructor (game: Phaser.Game) {
        var x = game.world.randomX;
        var y = game.world.randomY;
        super(game, x, y, 'POW', 0);
 
        this.anchor.setTo(0.5, 0.5);
        game.physics.enable(this);
        game.add.existing(this);
        this.inputEnabled = true;
        this.isTrapped = true;

        //this.scale.set(4);
        this.smoothed = false;
        this.animRunning = this.animations.add('running', [18, 19, 20, 21, 22, 23, 24, 25]);
        this.animEscape = this.animations.add('escape', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.animFlying = this.animations.add('fliying', [10, 11, 12, 13, 14, 15, 16, 17]);
        
        this.scale.setTo(this.game.resolution * this.scale.x * (Math.random() < 0.5 ? -1 : 1),
                this.game.resolution * this.scale.y);
        this.events.onDragStart.add(this.dragStart, this);
        this.events.onDragStop.add(this.dragStop, this);

        this.events.onInputDown.add(this.freeOnTap, this);
    }

    freeOnTap() {
        if (this.isTrapped) {
            this.isTrapped = false;
            this.animEscape.play(5).onComplete.add(this.startMoving, this);
            this.input.enableDrag();
        }
    }

    startMoving() {
        this.body.velocity.x = ((100 * Math.random() ) + 50) * (Math.random() < 0.5 ? -1 : 1);
        if (this.body.velocity.x < 0) {            
            this.scale.setTo(-1 * Math.abs(this.scale.x), this.scale.y);
        } 
        this.asignChangeDirection();
        this.animRunning.play(10, true);
    }

    dragStart() {
        this.animRunning.stop();
        this.body.velocity.x = 0;
        this.animFlying.play(10, true);
    }

    dragStop() {
        this.animFlying.stop();
        this.startMoving();
    }

    asignChangeDirection() {
        this.changeDirection = (Math.random() * this.game.width) - 50;
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