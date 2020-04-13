import * as Phaser from 'phaser-ce';

export class PrisonerOfWar extends Phaser.Sprite {

    public animRunning: Phaser.Animation;
    public animEscape: Phaser.Animation;
    public animFlying: Phaser.Animation;
    private changeDirection: number;
    private isTrapped: boolean;

    constructor (game: Phaser.Game) {
        var x = game.world.randomX * 0.85 + game.world.width * 0.07;
        var y = 0;
        
        super(game, x, y, 'POW', 0);
 
        this.anchor.setTo(0.5, 0.5);
        this.position.y = this.asignY();
        game.physics.enable(this);
        game.add.existing(this);
        this.inputEnabled = true;
        this.isTrapped = true;
        this.body.enable = true;

        //this.scale.set(4);
        this.smoothed = false;
        this.animRunning = this.animations.add('running', [18, 19, 20, 21, 22, 23, 24, 25]);
        this.animEscape = this.animations.add('escape', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.animFlying = this.animations.add('flying', [10, 11, 12, 13, 14, 15, 16, 17]);
        this.animEscape.onComplete.add(this.startMoving, this);

        this.scale.setTo(this.game.resolution * this.scale.x * (Math.random() < 0.5 ? -1 : 1),
                this.game.resolution * this.scale.y);
        this.events.onDragStart.add(this.dragStart, this);
        this.events.onDragStop.add(this.dragStop, this);

        this.events.onInputDown.add(this.freeOnTap, this);
    }

    freeOnTap() {
        if (this.isTrapped) {
            this.isTrapped = false;
            this.animEscape.play(6);            
        }
    }

    startMoving() {
        this.input.enableDrag(); 
        if (this.body  ) {
            this.body.velocity.x = ((100 * Math.random() ) + 50) * (Math.random() < 0.5 ? -1 : 1);
            if (this.body.velocity.x > 0) {            
                this.scale.setTo(-1 * Math.abs(this.scale.x), this.scale.y);
            } else {
                this.scale.setTo(Math.abs(this.scale.x), this.scale.y);
            }
            this.asignChangeDirection();
            this.animRunning.play(10, true);
        }             
    }
    asignY() {
        return (this.game.height / 2 + this.game.world.randomY * 0.42 + this.game.world.height * 0.07) - (this.height * this.game.resolution);  
    }

    dragStart() {
        this.animRunning.stop(false, true);
        this.body.velocity.x = 0;
        this.animFlying.play(10, true);
    }

    dragStop() {
        this.animFlying.stop(false, true);
        this.startMoving();
    }

    asignChangeDirection() {
        var distanciaX = this.game.width;
        if (this.body.velocity.x < 0) {            
            distanciaX = this.position.x;
        } else {
            distanciaX = distanciaX - this.position.x;
        }
        this.changeDirection = (Math.random() * distanciaX);
    }
    
    update() {
        if(this.changeDirection > 0)
            this.changeDirection--;
        else {
            this.body.velocity.x *= -1;
            this.scale.setTo(this.scale.x * -1, this.scale.y); 
            this.asignChangeDirection();                        
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