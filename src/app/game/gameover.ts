import * as Phaser from 'phaser-ce';

export class GameOver extends Phaser.State {
    
    finalMessage: Phaser.Text;
    restartText: Phaser.Text;
    private finalMessageText: string = "Game Over!";

    init() {

    }

    create() {
        var style = {
            font: 'bold 34pt Arial',
            fill: '#FFFFFF',
            align: 'center'
        }        
        this.finalMessage = this.add.text(this.game.world.centerX, this.game.world.centerY, this.finalMessageText, style);
        this.finalMessage.anchor.set(0.5);

        this.restartText = this.add.text(this.game.world.centerX, this.game.world.centerY + this.finalMessage.height * 2, "Click here to restart!", style);
        this.restartText.anchor.set(0.5);
        this.restartText.inputEnabled = true;
        this.restartText.events.onInputDown.add(this.restartGame, this);
    }

    update () {

    }

    restartGame() {
		this.game.state.start("Main");
	}
}