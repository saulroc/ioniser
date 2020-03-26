import * as Phaser from 'phaser-ce';
import { Mummy } from '../game/mummy';
import { FirebaseService } from '../services/firebase.service';

export class Main extends Phaser.State {
    
    back : Phaser.Image;
    mummies : Phaser.Group;
    scoreText : Phaser.Text;
    score: number = 0;
    private numberMummies: number;
    timeGameMiliseconds: number;
    timeGameText: Phaser.Text;
    timeGameTimer: Phaser.TimerEvent;
    level: number = 0;
    private firebaseService: FirebaseService;
    private playerName: string;
    private musicSound: Phaser.Sound;

    init(resetearLevel: boolean, fs: FirebaseService, pn:string) {
        if (resetearLevel) {
            this.level = 0;
            this.score = 0;
        }
        if (fs)
            this.firebaseService = fs;
        if (pn)
            this.playerName = pn;
    }

    create() {
        this.back = this.game.add.image(0, 0, 'lazur');
        this.back.scale.setTo(this.game.width/this.back.width * this.game.resolution,this.game.height/this.back.height * this.game.resolution);        
        //this.back.smoothed = false;
        this.level++;
        this.numberMummies = this.level * 5;
        var style = {
            font: 'bold 16pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        var message = "Level " + this.level.toString().padStart(3,"0") + " " + this.score.toString().padStart(3, "0") + " mummies hunted";
        this.scoreText = this.add.text(this.game.world.centerX, this.game.height / 12, message, style);
        this.scoreText.anchor.set(0.5);

        this.mummies = this.game.add.group();
        for (var i = 0; i < this.numberMummies; i++) {
          var mummy = new Mummy(this.game);
          mummy.events.onDestroy.add(this.updateScore, this);
          this.mummies.add(mummy);          
        }
        
        this.timeGameMiliseconds = this.numberMummies * 10;
        message = Math.floor(this.timeGameMiliseconds/600).toString().padStart(2,"0") 
        message += ":" + Math.floor(this.timeGameMiliseconds % 600 / 10).toString().padStart(2,"0");
        message += "." + ((this.timeGameMiliseconds % 600) % 10).toString()
        this.timeGameText = this.add.text(this.game.width / 12, this.game.height / 12, message, style);
        this.timeGameText.anchor.set(0.5);

        this.timeGameTimer = this.time.events.add(100, this.updateTimer,this);
        this.timeGameTimer.loop = true;
        this.timeGameTimer.timer.start()

        if (! this.musicSound) {
            this.musicSound = this.game.sound.add('music_loop', 1, true, true);
        }
        if (! this.musicSound.isPlaying)
            this.musicSound.play('',0, 1);
        this.musicSound.volume = 1;
        //this.musicSound.
    }

    updateScore() {
        if(this.timeGameTimer.timer.running) {
            this.score++;
            var message = "Level " + this.level.toString().padStart(3,"0") + " - " + this.score.toString().padStart(3, "0") + " mummies hunted";
            this.scoreText.text = message;
        }        
    }

    updateTimer() {
        this.timeGameMiliseconds-= 1;
        var message = Math.floor(this.timeGameMiliseconds/600).toString().padStart(2,"0") 
        message += ":" + Math.floor(this.timeGameMiliseconds % 600 / 10).toString().padStart(2,"0");
        message += "." + ((this.timeGameMiliseconds % 600) % 10).toString()
        this.timeGameText.text = message;
        if (this.timeGameMiliseconds <= 0) {
            this.timeGameTimer.timer.stop();
            //TODO: stop mummies
            this.musicSound.volume = 0.1;
            var value = {username: this.playerName, score: this.score};
            this.firebaseService.createScore(value);
            this.game.state.start('GameOver',false, false, 'Game Over!', false);
        }
    }

    update () {
        var alive = this.mummies.getFirstAlive(false);
        if (alive == null) {
            this.game.state.start('GameOver', false, false, ['Congratulations!'], true);
            this.timeGameTimer.timer.stop();
            this.musicSound.volume = 0.1;

        }
        
    }
}