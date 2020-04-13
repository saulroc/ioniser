import * as Phaser from 'phaser-ce';
import { Mummy } from '../game/mummy';
import { PrisonerOfWar } from '../game/prisonerOfWar';
import { FirebaseService } from '../services/firebase.service';

export class Main extends Phaser.State {
    
    back : Phaser.Image;
    mummies : Phaser.Group;
    POWS: Phaser.Group;
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
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.back = this.game.add.image(0, 0, 'background');
        this.back.scale.setTo(this.game.width/this.back.width * this.game.resolution,this.game.height/this.back.height * this.game.resolution);        
        //this.back.smoothed = false;
        this.level++;
        this.numberMummies = (this.level * 2) + 3;
        this.timeGameMiliseconds = 50 + this.level * 10;

        var style = {
            font: 'bold 16pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }

        var message = "Level " + this.level.toString().padStart(3,"0") + " " + this.score.toString().padStart(3, "0") + " mummies hunted";
        this.scoreText = this.add.text(this.game.world.centerX, this.game.height / 12, message, style);
        this.scoreText.anchor.set(0.5);

        this.mummies = this.game.add.physicsGroup();
        for (var i = 0; i < this.numberMummies; i++) {
          var mummy = new Mummy(this.game);
          mummy.events.onDestroy.add(this.updateScore, this);
          this.mummies.add(mummy);          
        }
        this.POWS = this.game.add.physicsGroup();
        for (var i = 0; i <= Math.floor(this.level / 5); i++) {
            var pow = new PrisonerOfWar(this.game);
            //pow.events.onDestroy.add(this.gameOver, this);
            this.POWS.add(pow);          
        }  

        message = Math.floor(this.timeGameMiliseconds/600).toString().padStart(2,"0") 
        message += ":" + Math.floor(this.timeGameMiliseconds % 600 / 10).toString().padStart(2,"0");
        message += "." + ((this.timeGameMiliseconds % 600) % 10).toString()
        this.timeGameText = this.add.text(this.game.world.centerX, this.game.height / 12 + this.scoreText.height, message, style);
        this.timeGameText.anchor.set(0.5);

        this.timeGameTimer = this.time.events.add(100, this.updateTimer,this);
        this.timeGameTimer.loop = true;
        this.timeGameTimer.timer.start()

        if (! this.musicSound) {
            this.musicSound = this.game.sound.add('music_loop', 1, true, false);
        }
        if (! this.musicSound.isPlaying)
            this.musicSound.play('',0, 1);
        this.musicSound.volume = 1;
        
        this.mummies.enableBody = true;
        this.mummies.physicsBodyType = Phaser.Physics.ARCADE;
    }

    POWHunted (mummy, pow) {
        // console.log("POW hunted!", pow.getBounds(), mummy.getBounds());
        pow.destroy();
        this.gameOver();
    }

    updateScore() {
        if(this.timeGameTimer.timer.running) {
            this.score++;
            var message = "Level " + this.level.toString().padStart(3,"0") + " - " + this.score.toString().padStart(3, "0") + " mummies hunted";
            this.scoreText.text = message;
        }        
    }

    gameOver() {
        this.timeGameTimer.timer.stop();
        //TODO: stop mummies
        this.musicSound.volume = 0.1;
        this.mummies.forEachAlive(function(mummy) { mummy.body.velocity.x = 0; });
        this.POWS.forEachAlive(function(pow) { pow.body.velocity.x = 0; });
        var value = {username: this.playerName, score: this.score};
        this.firebaseService.createScore(value);
        this.game.state.start('GameOver',false, false, 'Game Over!', false);
    }

    updateTimer() {
        this.timeGameMiliseconds-= 1;
        var message = Math.floor(this.timeGameMiliseconds/600).toString().padStart(2,"0") 
        message += ":" + Math.floor(this.timeGameMiliseconds % 600 / 10).toString().padStart(2,"0");
        message += "." + ((this.timeGameMiliseconds % 600) % 10).toString()
        this.timeGameText.text = message;
        if (this.timeGameMiliseconds <= 0) {
            this.gameOver();
        }
    }

    update () {
        
        this.physics.arcade.overlap(this.mummies, this.POWS, this.POWHunted, null, this);

        var alive = this.mummies.getFirstAlive(false);
        var trapped = this.POWS.getFirst("isTrapped", true);
        if (alive == null && trapped == null) {
            this.game.state.start('GameOver', false, false, 'Congratulations!', true);
            this.timeGameTimer.timer.stop();
            this.musicSound.volume = 0.1;

        }
        
    }

    // render() {
    //     this.mummies.forEach(mummy => {
    //         this.game.debug.spriteBounds(mummy);
    //     });

    //     this.POWS.forEach(pow => {
    //         this.game.debug.spriteBounds(pow);
    //     });
        
    // }
}