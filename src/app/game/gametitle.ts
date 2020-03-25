import * as Phaser from 'phaser-ce';
import { FirebaseService } from '../services/firebase.service';

export class GameTitle extends Phaser.State {
    
    title : Phaser.Text;
    startLabel : Phaser.Text;
    private firebaseService: FirebaseService;
    private playerName: string = 'Player 1';

    init(fs: FirebaseService, pn: string) {
        this.firebaseService = fs;
        this.playerName = pn;
    }

    create() {
        this.game.stage.backgroundColor = '#000000';
        var style = {
            font: 'bold 34pt Arial',
            fill: '#FFFFFF',
            align: 'center',
            wordWrap: true, 
            wordWrapWidth: this.game.width / 4 * 3
        }
        var message = "Mummies hunter " + this.playerName;
        this.title = this.add.text(this.game.world.centerX, this.game.world.centerY / 2, message, style);
        this.title.anchor.set(0.5);

        message = "click here to start game!";
        style.font = '26pt Arial';
        this.startLabel = this.add.text(this.game.world.centerX, this.game.world.centerY + this.title.height * 1.5, message, style);
        this.startLabel.anchor.set(0.5);
        this.startLabel.inputEnabled = true;
        this.startLabel.events.onInputDown.add(this.startGame, this);
    }

    startGame() {
        this.game.state.start('Main', true, false, true, this.firebaseService, this.playerName);
    }

}