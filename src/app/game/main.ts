import * as Phaser from 'phaser-ce';
import { Mummy } from '../game/mummy';

export class Main extends Phaser.State {
    
    back : Phaser.Image;
    mummies : Phaser.Group;
    scoreText : Phaser.Text;
    score: number;
    private numberMummies: number = 10;
    timeGameMiliseconds: number;
    timeGameText: Phaser.Text;
    timeGameTimer: Phaser.TimerEvent;

    create() {
        this.back = this.game.add.image(0, -400, 'lazur');
        this.back.scale.set(2);
        this.back.smoothed = false;
    
        var style = {
            font: 'bold 28pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }
        this.score = 0;
        var message = this.score.toString().padStart(5,"0");
        this.scoreText = this.add.text(this.game.world.centerX, this.game.height / 12, message, style);
        this.scoreText.anchor.set(0.5);

        this.mummies = this.game.add.group();
        for (var i = 0; i < this.numberMummies; i++) {
          var mummy = new Mummy(this.game);
          this.mummies.add(mummy);
        }
        
        this.timeGameMiliseconds = 0;
        message = Math.floor(this.timeGameMiliseconds/600).toString().padStart(2,"0") 
        message += ":" + Math.floor(this.timeGameMiliseconds % 600 / 10).toString().padStart(2,"0");
        message += "." + ((this.timeGameMiliseconds % 600) % 10).toString()
        this.timeGameText = this.add.text(this.game.width / 12, this.game.height / 12, message, style);
        this.timeGameText.anchor.set(0.5);

        this.timeGameTimer = this.time.events.add(100, this.updateTimer,this);
        this.timeGameTimer.loop = true;
        this.timeGameTimer.timer.start()
    }

    updateTimer() {
        this.timeGameMiliseconds+= 1;
        var message = Math.floor(this.timeGameMiliseconds/600).toString().padStart(2,"0") 
        message += ":" + Math.floor(this.timeGameMiliseconds % 600 / 10).toString().padStart(2,"0");
        message += "." + ((this.timeGameMiliseconds % 600) % 10).toString()
        this.timeGameText.text = message;
    }

    update () {
        var alive = this.mummies.getFirstAlive(false);
        if (alive == null) {
            this.game.state.start('GameOver', false, false, ['Congratulations!']);
            this.timeGameTimer.timer.stop();
        }
        
    }
}